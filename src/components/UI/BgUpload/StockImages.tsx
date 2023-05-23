import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { backgroundLayerType } from "~/constants/contants"
import { useEffect, useState, useCallback } from "react"
import { getStockImages } from "~/services/stockApi"
import { changeLayerBackgroundImage } from "~/utils/updateLayerBackground"
import LoaderSpinner from "../../../views/Public/images/loader-spinner.svg"
import useAppContext from "~/hooks/useAppContext"

const StockImages = () => {
  const editor = useEditor()
  const activeObject: any = useActiveObject()
  const [selectedImg, setSelectedImg] = useState(-1)
  const { res, setRes } = useAppContext()
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (res.length == 0) {
      setLoader(true)
      console.log("RES BEFORE", res)
      getStockImages().then((res) => {
        setLoader(false)
        setRes(res)
        console.log("RES AFTER", res)
      })
    }
  }, [])

  const [search, setSearch] = useState("")
  const searchImages = () => {
    setLoader(true)
    getStockImages(search).then((res) => {
      setLoader(false)
      setRes(res)
    })
  }

  const setBgImg = useCallback(
    async function (url: string) {
      const previewWithUpdatedBackground: any = await changeLayerBackgroundImage(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        url
      )
      const options = {
        type: "StaticImage",
        src: previewWithUpdatedBackground,
        preview: previewWithUpdatedBackground,
        metadata: {
          generationDate: new Date().getTime(),
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      }
      editor.objects.add(options)
    },
    [editor]
  )

  return (
    <div className={classes.stockImgSection}>
      <div className={classes.inputWrapper}>
        <input className={classes.textInput} onChange={(e) => setSearch(e.target.value)} />
        <button className={clsx(classes.iconWrapper, "flex-center")} onClick={searchImages}>
          <Icons.SearchIcon />
        </button>
      </div>

      {loader ? (
        <img className={classes.stockImagesLoader} src={LoaderSpinner} />
      ) : (
        <div className={classes.sampleImgSection}>
          {res.map((image, index) => {
            return (
              <ImageItem
                key={index}
                idx={image.mongo_id.$oid}
                selectedImage={selectedImg}
                onClick={() => {
                  setBgImg(image.image_url_list[0])
                  setSelectedImg(image.mongo_id.$oid)
                }}
                preview={image.image_url_list[0]}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

const ImageItem = ({
  idx,
  preview,
  onClick,
  selectedImage,
}: {
  idx: number
  preview: any
  onClick?: (option: any) => void
  selectedImage: number
}) => {
  return (
    <div onClick={onClick} className={clsx("pointer p-relative", classes.imageItemSection, "flex-center")}>
      <div className={clsx("p-absolute", classes.imageItem)} />
      <img src={preview} className={classes.imagePreview} />
      {selectedImage === idx && (
        <div className={classes.selectedIcon}>
          <Icons.Selection size={"24"} />
        </div>
      )}
    </div>
  )
}

export default StockImages

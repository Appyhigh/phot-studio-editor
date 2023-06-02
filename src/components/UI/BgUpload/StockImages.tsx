import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { useActiveObject, useEditor, useFrame } from "@layerhub-io/react"
import { backgroundLayerType } from "~/constants/contants"
import { useState, useCallback, useRef, useContext } from "react"
import { getStockImages } from "~/services/stockApi"
import { changeLayerBackgroundImage } from "~/utils/updateLayerBackground"
import LoaderSpinner from "../../../views/Public/images/loader-spinner.svg"
import useAppContext from "~/hooks/useAppContext"
import usePagination from "~/hooks/usePagination"
import { toDataURL } from "~/utils/export"
import { nanoid } from "nanoid"
import MainImageContext from "~/contexts/MainImageContext"
import { AddObjectFunc } from "~/views/DesignEditor/utils/functions/AddObjectFunc"

const StockImages = (props: any) => {
  const editor = useEditor()
  const activeObject: any = useActiveObject()
  const [selectedImg, setSelectedImg] = useState(-1)
  const { setRes } = useAppContext()
  const { search, setSearch } = useAppContext()
  const [page, setPage] = useState(1)
  const { res, more, loading } = usePagination(search, page)
  const frame = useFrame()
  const { mainImgInfo, setMainImgInfo } = useContext(MainImageContext)

  const observer = useRef<any>()

  const lastElementRef = useCallback(
    (element?: any) => {
      if (observer.current) observer.current.disconnect()

      if (!more) return

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && more) setPage((prev) => prev + 1)
      })

      if (element) observer.current.observe(element)
    },
    [more]
  )

  const searchImages = () => {
    getStockImages(search).then((res) => {
      setRes(res)
    })
  }

  const setBgImg = useCallback(
    async function (url: string) {
      const activeMainObject = editor.objects.findById(mainImgInfo.id)[0]

      const previewWithUpdatedBackground: any = await changeLayerBackgroundImage(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        url,
        activeObject?.width * activeObject?.scaleX,
        activeObject?.height * activeObject?.scaleY
      )
      const options = {
        type: "StaticImage",
        src: previewWithUpdatedBackground,
        preview: previewWithUpdatedBackground,
        original: mainImgInfo.original,
        id: nanoid(),
        metadata: {
          generationDate: new Date().getTime(),
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      }
      editor.objects.removeById(mainImgInfo.id)
      editor.objects.add(options).then(() => {
        //@ts-ignore
        setMainImgInfo((prev) => ({ ...prev, ...options }))
        editor.objects.position("top", activeMainObject.top)
        editor.objects.position("left", activeMainObject.left)
      })
    },
    [editor]
  )

  return (
    <div className={classes.stockImgSection}>
      <div className={classes.inputWrapper}>
        <input
          className={classes.textInput}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchImages()
            }
          }}
          defaultValue={search}
        />
        <button className={clsx(classes.iconWrapper, "flex-center")} onClick={searchImages}>
          <Icons.SearchIcon />
        </button>
      </div>
      <div className={classes.sampleImgSection}>
        {res.map((image: any, index: any) => {
          return (
            <div ref={index === res.length - 1 ? lastElementRef : undefined}>
              <ImageItem
                key={index}
                idx={image.mongo_id.$oid}
                selectedImage={selectedImg}
                onClick={() => {
                  {
                    props.imageAs == "foreground"
                      ? AddObjectFunc(image.image_url_list[0], editor, image.width, image.height, frame)
                      : (setBgImg(image.image_url_list[0]), setSelectedImg(image.mongo_id.$oid))
                  }
                }}
                preview={image.image_url_list[0]}
              />
            </div>
          )
        })}
      </div>
      {loading && <img className={classes.stockImagesLoader} src={LoaderSpinner} />}
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

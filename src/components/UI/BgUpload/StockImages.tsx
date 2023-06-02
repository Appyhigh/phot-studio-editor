import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { useActiveObject, useEditor, useFrame } from "@layerhub-io/react"
import { useState, useCallback, useRef, useContext } from "react"
import { getStockImages } from "~/services/stockApi"
import { changeLayerBackgroundImage } from "~/utils/updateLayerBackground"
import LoaderSpinner from "../../../views/Public/images/loader-spinner.svg"
import useAppContext from "~/hooks/useAppContext"
import usePagination from "~/hooks/usePagination"
import MainImageContext from "~/contexts/MainImageContext"
import { AddObjectFunc } from "~/views/DesignEditor/utils/functions/AddObjectFunc"
import { HandleBgChangeOption } from "~/views/DesignEditor/utils/functions/HandleBgChangeFunc"
import Scrollbars from "@layerhub-io/react-custom-scrollbar"
import { toDataURL } from "~/utils/export"

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
      <Scrollbars style={{ height: "300px", marginTop: "10px" }}>
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
                        : (toDataURL(image.image_url_list[0], async function (dataUrl: string) {
                            HandleBgChangeOption(
                              editor,
                              mainImgInfo,
                              setMainImgInfo,
                              dataUrl,
                              changeLayerBackgroundImage
                            )
                          }),
                          setSelectedImg(image.mongo_id.$oid))
                    }
                  }}
                  preview={image.image_url_list[0]}
                />
              </div>
            )
          })}
        </div>
        {loading && <img className={classes.stockImagesLoader} src={LoaderSpinner} />}
      </Scrollbars>
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

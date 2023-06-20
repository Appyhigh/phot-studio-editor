import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { useActiveObject, useEditor, useFrame } from "@layerhub-io/react"
import { useState, useCallback, useRef, useContext, useEffect } from "react"
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
import ImagesContext from "~/contexts/ImagesCountContext"
import ErrorContext from "~/contexts/ErrorContext"

const StockImages = (props: any) => {
  const editor = useEditor()
  const activeObject: any = useActiveObject()
  const [selectedImg, setSelectedImg] = useState(-1)
  const { setRes } = useAppContext()
  const { search, setSearch } = useAppContext()
  const [page, setPage] = useState(1)
  const { setErrorInfo } = useContext(ErrorContext)
  const { res, more, loading } = usePagination("stock", getStockImages, search, page, setErrorInfo)
  const frame = useFrame()
  const { mainImgInfo, setMainImgInfo } = useContext(MainImageContext)
  const [noImages, setNoImages] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hitApi, setHitApi] = useState("")

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

  const { setImagesCt } = useContext(ImagesContext)

  const searchImages = () => {
    setNoImages(false)
    getStockImages(search).then((res) => {
      if (res.length === 0) {
        setNoImages(true)
      }
      setRes(res)
    })

    setNoImages(false)

    getStockImages(search)
      .then((res) => {
        if (res) {
          if (res.length === 0) {
            setNoImages(true)
          }
          setRes(res)
        } else {
          throw new Error(res)
        }
      })
      .catch((err) => {
        // @ts-ignore
        setErrorInfo((prev) => ({
          ...prev,
          showError: true,
          errorMsg: err.message,
          retryFn: () => {
            // @ts-ignore
            setErrorInfo((prev) => ({ ...prev, showError: false }))
            searchImages()
          },
        }))
        setTimeout(() => {
          // @ts-ignore
          setErrorInfo((prev) => ({ ...prev, showError: false }))
        }, 5000)
        console.log(err)
      })
  }

  useEffect(() => {
    if (search.length > 2 && Math.abs(hitApi.length - search.length) === 3) {
      searchImages()
      setHitApi(search)
    } else if (search.length === 0) {
      setHitApi("")
    }
  }, [search])

  return (
    <div className={classes.stockImgSection}>
      <div className={classes.inputWrapper}>
        <input
          className={classes.textInput}
          onChange={(e) => {
            setSearch(e.target.value)
            if (e.target.value === "") {
              getStockImages().then((res) => {
                setRes(res)
              })
            }
          }}
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
      <Scrollbars style={{ height: props?.height ? props.height : "300%", marginTop: "10px" }}>
        <div className={classes.sampleImgSection}>
          {res.map((image: any, index: any) => {
            return (
              <div ref={index === res.length - 1 ? lastElementRef : undefined} key={index}>
                <ImageItem
                  idx={image.mongo_id}
                  selectedImage={selectedImg}
                  onClick={() => {
                    {
                      let latest_ct = 0
                      setImagesCt((prev: any) => {
                        latest_ct = prev + 1
                        return prev + 1
                      })
                      props.imageAs == "foreground"
                        ? AddObjectFunc(
                            image.image_url_list[0],
                            editor,
                            image.width,
                            image.height,
                            frame,
                            (latest_ct = latest_ct)
                          )
                        : (toDataURL(image.image_url_list[0], async function (dataUrl: string) {
                            HandleBgChangeOption(
                              editor,
                              mainImgInfo,
                              setMainImgInfo,
                              dataUrl,
                              changeLayerBackgroundImage,
                              activeObject,
                              null,
                              setIsLoading,
                              true
                            )
                          }),
                          setSelectedImg(image.mongo_id))
                    }
                  }}
                  preview={image.image_url_list[0]}
                  isLoading={isLoading}
                />
              </div>
            )
          })}
        </div>
        {loading && <img className={classes.stockImagesLoader} src={LoaderSpinner} />}
        {noImages && <div className={classes.noImages}>Sorry! No results found :(</div>}
      </Scrollbars>
    </div>
  )
}

const ImageItem = ({
  idx,
  preview,
  onClick,
  selectedImage,
  isLoading,
}: {
  idx: number
  preview: any
  onClick?: (option: any) => void
  selectedImage: number
  isLoading: boolean
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx("pointer p-relative", classes.imageItemSection, "flex-center")}
      style={{ pointerEvents: isLoading ? "none" : "auto" }}
    >
      <div className={clsx("p-absolute", classes.imageItem)} />
      <img src={preview} className={classes.imagePreview} />
      {selectedImage === idx && isLoading && <img className={classes.stockImagesLoading} src={LoaderSpinner} />}
      {selectedImage === idx && (
        <div className={classes.selectedIcon}>
          <Icons.Selection size={"24"} />
        </div>
      )}
    </div>
  )
}

export default StockImages

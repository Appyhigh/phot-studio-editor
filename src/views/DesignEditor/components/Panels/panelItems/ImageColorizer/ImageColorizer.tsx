import { Block } from "baseui/block"
import { IMAGE_COLORIZER } from "~/constants/contants"
import classes from "./style.module.css"
import Uploads from "../UploadDropzone/Uploads"
import Scrollable from "~/components/Scrollable"
import useAppContext from "~/hooks/useAppContext"
import ImageColorizerContext from "~/contexts/ImageColorizerContext"
import clsx from "clsx"
import { useActiveObject, useEditor, useObjects, useFrame } from "@layerhub-io/react"
import { useCallback, useContext, useEffect, useState } from "react"
import { bgSampleImagesApi } from "~/services/bgSampleImagesApi"
import { nanoid } from "nanoid"
import Icons from "~/components/Icons"
import { AddObjectFunc } from "~/views/DesignEditor/utils/functions/AddObjectFunc"
import ImagesContext from "~/contexts/ImagesCountContext"
import UploadPreview from "../UploadPreview/UploadPreview"
import LoaderSpinner from "../../../../../Public/images/loader-spinner.svg"
import BaseButton from "~/components/UI/Button/BaseButton"
import NoneIcon from "~/components/Icons/NoneIcon"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"
import { imgColorizerController } from "~/utils/imgColorizerController"
import { error } from "console"

const ImageColorizer = () => {
  const { activePanel } = useAppContext()
  const editor = useEditor()
  const { setImagesCt } = useContext(ImagesContext)
  const { bgSampleImages, setBgSampleImages } = useAppContext()
  const [imageLoading, setImageLoading] = useState(false)
  const [currentActiveImg, setCurrentActiveImg] = useState(-1)


  // @ts-ignore
  const { ImgColorizerInfo, setImgColorizerInfo, ImgColorizerpanelInfo, setImgColorizerpanelInfo } =
    useContext(ImageColorizerContext)

    const generateImg2Scaler = () => {
        if (getCookie(COOKIE_KEYS.AUTH) == "invalid_cookie_value_detected") {
          setShowLoginPopup(true)
          setAutoCallAPI(true)
        } else {
          setImageLoading(true)
          setLoadingImgCt(3)
          setAutoCallAPI(false)
          setCurrentActiveImg(-1)
          setImgScalerPanelInfo((prev: any) => ({ ...prev, resultSectionVisible: true }))
    
          img2Upscaler(imgScalerInfo.src)
            .then((response) => {
              setImageLoading(false)
              setImgScalerInfo((prev: any) => ({ ...prev, result: [imgScalerInfo.src, response] }))
            })
            .catch((error) => {
              setImageLoading(false)
              setImgScalerPanelInfo((prev: any) => ({ ...prev, resultSectionVisible: false }))
              setErrorInfo((prev: any) => ({
                ...prev,
                showError: true,
                errorMsg: "Some error has occurred",
                retryFn: () => {
                  setErrorInfo((prev: any) => ({ ...prev, showError: false }))
                  generateImg2Scaler()
                },
              }))
              setTimeout(() => {
                setErrorInfo((prev: any) => ({ ...prev, showError: false }))
              }, 5000)
              console.error("Error:", error)
            })
        }
      }
    
  useEffect(() => {
    imgColorizerController().then((response)=>console.log(response)
    ).catch((error)=>{console.log("errer");
    })
  }, [])

  const addObject = useCallback(
    (url: string) => {
      // @ts-ignore
      setImgColorizerpanelInfo((prev) => ({ ...prev, colorizeBtnActive: true }))

      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
          preview: url,
          id: nanoid(),
          original: url,
          metadata: { generationDate: new Date().getTime() },
        }
        setImgColorizerpanelInfo((prev: any) => ({
          ...prev,
          uploadPreview: true,
          tryFilters: false,
          resultOption: false,
          trySampleImg: false,
          uploadSection: false,
        }))
        setImgColorizerInfo((prev: any) => ({ ...prev, ...options }))
      }
    },
    [editor]
  )

  const discardSampleImageHandler = () => {
    setImgColorizerInfo((prev: any) => ({ ...prev, src: "" }))
    setImgColorizerpanelInfo((prev: any) => ({
      ...prev,
      tryFilters: false,
      resultOption: false,
      trySampleImg: true,
      uploadSection: true,
      uploadPreview: false,
    }))
  }

  useEffect(() => {
    const fetchSampleImages = async () => {
      const result = await bgSampleImagesApi()
      setBgSampleImages(result)
    }
    fetchSampleImages()
  }, [])

  const frame = useFrame()
  const addImg = async (imageUrl: string, _idx: number) => {
    setCurrentActiveImg(_idx)
    await getDimensions(imageUrl, (img: any) => {
      let latest_ct = 0
      setImagesCt((prev: any) => {
        latest_ct = prev + 1
        AddObjectFunc(imageUrl, editor, img.width, img.height, frame, (latest_ct = latest_ct))
        return prev + 1
      })
    })
  }

  return (
    <Block className="d-flex flex-1 flex-column">
      {!ImgColorizerpanelInfo.resultOption && (
        <>
          {ImgColorizerInfo.src ? (
            <Block>
              <UploadPreview
                discardHandler={discardSampleImageHandler}
                uploadType={IMAGE_COLORIZER}
                imgSrc={ImgColorizerInfo.src}
              />
            </Block>
          ) : (
            <Uploads
              activePanel={activePanel}
              uploadType={IMAGE_COLORIZER}
              fileInputType={"ImgColorizer"}
              id={"ImgColorizer"}
              mainHeading={"Add Image"}
            />
          )}

          {ImgColorizerpanelInfo.uploadPreview && (
            <div
              style={{
                margin: "26px 20px 20px 20px",
                fontFamily: "rubik",
                fontSize: "12px",
                color: "#000",
                width: "310px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", margin: "0 0px 20px 0" }}>
                <p>Pay 0 Coins to Generate</p>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <p>Wallet: 48 Coins</p>
                  <p>Buy More</p>
                </div>
              </div>
              <BaseButton
                title=" Colorize"
                fontFamily="rubik"
                fontSize="16px"
                handleClick={() => {
                  setImgColorizerInfo((prev: any) => ({ ...prev, src: "" }))
                  setImgColorizerpanelInfo((prev: any) => ({
                    ...prev,
                    tryFilters: false,
                    resultOption: true,
                    trySampleImg: false,
                    uploadSection: false,
                    uploadPreview: false,
                  }))
                }}
              />
            </div>
          )}

          {ImgColorizerpanelInfo.trySampleImg && (
            <>
              <Block className={clsx(classes.tryImgHeading, "d-flex align-items-center justify-content-start mb-3")}>
                Try Sample Images
              </Block>
              <Scrollable>
                <Block className="py-3">
                  <Block className={classes.sampleImgSection}>
                    {bgSampleImages.map((image: any, index) => {
                      return (
                        <ImageItem
                          key={index}
                          onClick={() => {
                            addObject(image.originalImage)
                          }}
                          imageLoading={imageLoading}
                          preview={image.originalImage}
                        />
                      )
                    })}
                  </Block>
                </Block>
              </Scrollable>
            </>
          )}
        </>
      )}
      {ImgColorizerpanelInfo.resultOption && (
        <div className={classes.resultSection}>
          <Block
            onClick={() => {
              setImgColorizerInfo((prev: any) => ({ ...prev, id: "" }))
              setImgColorizerpanelInfo((prev: any) => ({
                ...prev,
                tryFilters: false,
                resultOption: false,
                colorizeBtnActive: false,
                trySampleImg: true,
                uploadSection: true,
                uploadPreview: false,
              }))
            }}
            $style={{ cursor: "pointer", display: "flex" }}
            className={classes.chevronRightIcon}
          >
            <Icons.ChevronRight fill="#000" size={"20"} />
          </Block>
          <div className={classes.resultImages}>
            <div className={clsx("pointer", classes.eachImg)}>
              <img
                src={ImgColorizerInfo.original}
                alt="result-img"
                onClick={() => {
                  addImg(ImgColorizerInfo.original, -1)
                }}
              />

              <div className={classes.resultLabel}> Original</div>
            </div>
            =
            <div className={classes.skeletonBox}>
              {<img className={classes.imagesLoader} src={LoaderSpinner} />}
              <div className={classes.resultLabel}> Original</div>
            </div>
          </div>

          {/* <div className={classes.filtersBox}>
            <p>Filters</p>
            <div className={classes.resultFilters}>
              <div className={clsx("pointer", classes.eachFilter)}>
                <NoneIcon size={100}/>
              </div>
              {Array.from({ length: 8 }, (_, i) =>
              (<div className={clsx("pointer", classes.eachFilter)}>
              <img src={ImgColorizerInfo.original} alt="result-img" style={{marginBottom:"12px"}} />
            </div>))}
            </div>
          </div> */}
        </div>
      )}
    </Block>
  )
}

const ImageItem = ({
  preview,
  onClick,
  imageLoading,
}: {
  preview: any
  onClick?: (option: any) => void
  imageLoading?: boolean
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx("pointer p-relative", classes.imageItemSection)}
      style={{ pointerEvents: imageLoading ? "none" : "auto" }}
    >
      <div className={clsx("p-absolute", classes.imageItem)} />
      <img src={preview} className={classes.imagePreview} />
    </div>
  )
}

export default ImageColorizer

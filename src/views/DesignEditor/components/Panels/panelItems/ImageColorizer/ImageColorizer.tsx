import { Block } from "baseui/block"
import { IMAGE_COLORIZER } from "~/constants/contants"
import classes from "./style.module.css"
import Uploads from "../UploadDropzone/Uploads"
import Scrollable from "~/components/Scrollable"
import useAppContext from "~/hooks/useAppContext"
import ImageColorizerContext from "~/contexts/ImageColorizerContext"
import clsx from "clsx"
import { useEditor, useFrame } from "@layerhub-io/react"
import { useCallback, useContext, useState } from "react"
import { nanoid } from "nanoid"
import Icons from "~/components/Icons"
import { AddObjectFunc } from "~/views/DesignEditor/utils/functions/AddObjectFunc"
import ImagesContext from "~/contexts/ImagesCountContext"
import UploadPreview from "../UploadPreview/UploadPreview"
import LoaderSpinner from "../../../../../Public/images/loader-spinner.svg"
import BaseButton from "~/components/UI/Button/BaseButton"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"
import { imgColorizerController } from "~/utils/imgColorizerController"
import { getCookie } from "~/utils/common"
import { COOKIE_KEYS } from "~/utils/enum"
import ErrorContext from "~/contexts/ErrorContext"
import LoginPopup from "../../../LoginPopup/LoginPopup"
import SampleImagesContext from "~/contexts/SampleImagesContext"
import { UpdateObjectFunc } from "~/views/DesignEditor/utils/functions/UpdateObjectFunc"

const ImageColorizer = () => {
  const { activePanel } = useAppContext()
  const editor = useEditor()
  const { setImagesCt } = useContext(ImagesContext)
  const [imageLoading, setImageLoading] = useState(false)
  const [currentActiveImg, setCurrentActiveImg] = useState(-1)
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [autoCallAPI, setAutoCallAPI] = useState(false)
  const { sampleImages } = useContext(SampleImagesContext)
  const { setErrorInfo } = useContext(ErrorContext)
  const { ImgColorizerInfo, setImgColorizerInfo, ImgColorizerPanelInfo, setImgColorizerPanelInfo } =
    useContext(ImageColorizerContext)

  const generateImgColorizer = () => {
    if (getCookie(COOKIE_KEYS.AUTH) == "invalid_cookie_value_detected") {
      setShowLoginPopup(true)
      setAutoCallAPI(true)
    } else {
      setImageLoading(true)
      setAutoCallAPI(false)
      setCurrentActiveImg(-1)
      setImgColorizerPanelInfo((prev: any) => ({
        ...prev,
        resultOption: true,
        uploadPreview: false,
        tryFilters: false,
        trySampleImg: false,
        uploadSection: false,
      }))

      imgColorizerController(ImgColorizerInfo.src)
        .then((response) => {
          setImageLoading(false)
          setImgColorizerInfo((prev: any) => ({ ...prev, resultImages: [response] }))
          addImg(response, 0)
        })
        .catch((error) => {
          setImageLoading(false)
          setImgColorizerPanelInfo((prev: any) => ({ ...prev, resultOption: false }))
          setErrorInfo((prev: any) => ({
            ...prev,
            showError: true,
            errorMsg: "Some error has occurred",
            retryFn: () => {
              setErrorInfo((prev: any) => ({ ...prev, showError: false }))
              generateImgColorizer()
            },
          }))
          setTimeout(() => {
            setErrorInfo((prev: any) => ({ ...prev, showError: false }))
          }, 5000)
          console.error("Error:", error)
        })
    }
  }

  const addObject = useCallback(
    (url: string) => {
      // @ts-ignore
      setImgColorizerPanelInfo((prev) => ({ ...prev, colorizeBtnActive: true }))

      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
          preview: url,
          id: nanoid(),
          original: url,
          metadata: { generationDate: new Date().getTime() },
        }
        setImgColorizerPanelInfo((prev: any) => ({
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
    setImgColorizerPanelInfo((prev: any) => ({
      ...prev,
      tryFilters: false,
      resultOption: false,
      trySampleImg: true,
      uploadSection: true,
      uploadPreview: false,
    }))
  }

  const frame = useFrame()
  const addImg = async (imageUrl: string, _idx: number) => {
    if (currentActiveImg == -1) {
      await getDimensions(imageUrl, (img: any) => {
        let latest_ct = 0
        setImagesCt((prev: any) => {
          latest_ct = prev + 1
          AddObjectFunc(imageUrl, editor, img.width, img.height, frame, (latest_ct = latest_ct))
          return prev + 1
        })
      })
    } else {
      UpdateObjectFunc(imageUrl, editor, frame)
    }
    setCurrentActiveImg(_idx)
  }

  return (
    <Block className="d-flex flex-1 flex-column">
      {!ImgColorizerPanelInfo.resultOption && (
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

          {ImgColorizerPanelInfo.uploadPreview && (
            <div className={classes.walletContainer}>
              <BaseButton
                width="100%"
                title=" Colorize"
                fontFamily="rubik"
                fontSize="16px"
                handleClick={() => {
                  generateImgColorizer()
                }}
              />
              <LoginPopup
                isOpen={showLoginPopup}
                loginPopupCloseHandler={() => {
                  setShowLoginPopup(false)
                }}
              />
            </div>
          )}

          {ImgColorizerPanelInfo.trySampleImg && (
            <>
              <Block className={clsx(classes.tryImgHeading, "d-flex align-items-center justify-content-start mb-3")}>
                Try Sample Images
              </Block>
              <Scrollable>
                <Block className="py-3 mb-2">
                  <Block className={classes.sampleImgSection}>
                    {sampleImages.imageColorizer &&
                      sampleImages.imageColorizer.map((image: any, index: any) => {
                        return (
                          <ImageItem
                            key={index}
                            onClick={() => {
                              addObject(image.originalImage)
                            }}
                            imageLoading={imageLoading}
                            preview={image.thumbnail}
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
      {ImgColorizerPanelInfo.resultOption && (
        <div className={classes.resultSection}>
          <Block
            onClick={() => {
              setImgColorizerInfo((prev: any) => ({ ...prev, id: "", src: "", resultImages: [] }))
              setImgColorizerPanelInfo((prev: any) => ({
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
            <div className={clsx(classes.eachImg, currentActiveImg === 1 && classes.currentActiveImg)}>
              <img src={ImgColorizerInfo.src} alt="orginal-img" />

              <div className={classes.resultLabel}>{"Original"}</div>
            </div>
            {!imageLoading &&
              ImgColorizerInfo?.resultImages?.map((each, _idx) => {
                return (
                  <div
                    className={clsx("pointer", classes.eachImg, currentActiveImg === _idx && classes.currentActiveImg)}
                    key={_idx}
                  >
                    <img
                      src={each}
                      alt="result-img"
                      onClick={() => {
                        addImg(each, _idx)
                      }}
                    />

                    <div className={classes.resultLabel}>{"Result"}</div>
                  </div>
                )
              })}
            {imageLoading &&
              Array.from(Array(1).keys()).map((each, idx) => (
                <div className={classes.skeletonBox} key={idx}>
                  {<img className={classes.imagesLoader} src={LoaderSpinner} />}{" "}
                </div>
              ))}
          </div>
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

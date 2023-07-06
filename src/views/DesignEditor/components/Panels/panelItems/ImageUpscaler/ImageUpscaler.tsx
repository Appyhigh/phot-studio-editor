import { IMAGE_UPSCALER } from "~/constants/contants"
import Uploads from "../UploadDropzone/Uploads"
import classes from "./style.module.css"
import useAppContext from "~/hooks/useAppContext"
import clsx from "clsx"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import React, { useContext, useEffect, useRef, useState } from "react"
import ImageUpScalerContext from "~/contexts/ImageUpScalerContext"
import { useEditor, useFrame } from "@layerhub-io/react"
import { nanoid } from "nanoid"
import Icons from "~/components/Icons"
import LoaderSpinner from "../../../../../Public/images/loader-spinner.svg"
import ImagesContext from "~/contexts/ImagesCountContext"
import { AddObjectFunc } from "~/views/DesignEditor/utils/functions/AddObjectFunc"
import { img2Upscaler, img4Upscaler, imgBothUpscaler } from "~/utils/imgUpscaler"
import ErrorContext from "~/contexts/ErrorContext"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"
import { getCookie } from "~/utils/common"
import { COOKIE_KEYS } from "~/utils/enum"
import LoginPopup from "../../../LoginPopup/LoginPopup"
import { useAuth } from "~/hooks/useAuth"
import BaseButton from "~/components/UI/Button/BaseButton"
import UploadPreview from "../UploadPreview/UploadPreview"
import SampleImagesContext from "~/contexts/SampleImagesContext"
import { UpdateObjectFunc } from "~/views/DesignEditor/utils/functions/UpdateObjectFunc"

const ImageUpscaler = () => {
  const { activePanel } = useAppContext()
  // @ts-ignore
  const { authState } = useAuth()
  const { user } = authState
  const [imageLoading, setImageLoading] = useState(false)
  const [autoCallAPI, setAutoCallAPI] = useState(false)
  const [loadingImgCt, setLoadingImgCt] = useState(0)
  const editor = useEditor()
  const [currentActiveImg, setCurrentActiveImg] = useState(-1)
  const { setImagesCt } = useContext(ImagesContext)
  const leftPanelRef = useRef()
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const { sampleImages } = useContext(SampleImagesContext)
  const { setErrorInfo } = useContext(ErrorContext)

  useEffect(() => {
    if (user && autoCallAPI) {
      if (imgScalerInfo.scaler === 2) {
        generateImg2Scaler()
      } else generateImgBothScaler()
      setAutoCallAPI(false)
    }
  }, [user, autoCallAPI])

  const { imgScalerPanelInfo, setImgScalerInfo, setImgScalerPanelInfo, imgScalerInfo } =
    useContext(ImageUpScalerContext)

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
          preview: url,
          id: nanoid(),
          original: url,
          url: url,
          metadata: { generationDate: new Date().getTime() },
        }
        setImgScalerPanelInfo((prev: any) => ({
          ...prev,
          trySampleImg: false,
          uploadSection: false,
          uploadPreview: true,
        }))
        setImgScalerInfo((prev: any) => ({ ...prev, src: url, id: options.id, original: url }))
      }
    },
    [editor]
  )

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // @ts-ignore
      if (leftPanelRef?.current && !leftPanelRef?.current?.contains(e.target)) {
        setImgScalerInfo((prev: any) => ({
          ...prev,
          showclearTooltip: false,
        }))
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [imgScalerInfo.showclearTooltip])

  const generateImg2Scaler = () => {
    if (getCookie(COOKIE_KEYS.AUTH) == "invalid_cookie_value_detected") {
      setShowLoginPopup(true)
      setAutoCallAPI(true)
    } else {
      setImageLoading(true)
      setLoadingImgCt(2)
      setAutoCallAPI(false)
      setCurrentActiveImg(-1)
      setImgScalerPanelInfo((prev: any) => ({ ...prev, resultSectionVisible: true }))
      img2Upscaler(imgScalerInfo.src)
        .then((response) => {
          addImg(response, 0)
          setImageLoading(false)
          setImgScalerInfo((prev: any) => ({ ...prev, result: [response] }))
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

  const generateImg4Scaler = () => {
    if (getCookie(COOKIE_KEYS.AUTH) == "invalid_cookie_value_detected") {
      setShowLoginPopup(true)
      setAutoCallAPI(true)
    } else {
      setLoadingImgCt(1)
      setImageLoading(true)
      setAutoCallAPI(false)
      setCurrentActiveImg(-1)
      // @ts-ignore
      setImgScalerPanelInfo((prev) => ({ ...prev, resultSectionVisible: true }))

      img4Upscaler(imgScalerInfo.src)
        .then((response) => {
          addImg(response, 1)
          setImageLoading(false)
          setImgScalerInfo((prev: any) => ({ ...prev, result: [...prev.result, response] }))
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
              generateImg4Scaler()
            },
          }))
          setTimeout(() => {
            setErrorInfo((prev: any) => ({ ...prev, showError: false }))
          }, 5000)
          console.error("Error:", error)
        })
    }
  }

  const generateImgBothScaler = () => {
    if (getCookie(COOKIE_KEYS.AUTH) == "invalid_cookie_value_detected") {
      setShowLoginPopup(true)
      setAutoCallAPI(true)
    } else {
      setLoadingImgCt(2)
      setCurrentActiveImg(-1)
      setAutoCallAPI(false)
      setImageLoading(true)
      // @ts-ignore
      setImgScalerPanelInfo((prev) => ({ ...prev, resultSectionVisible: true }))

      imgBothUpscaler(imgScalerInfo.src)
        .then((response) => {
          addImg(response["4k"].url, 1)
          setImageLoading(false)
          setImgScalerInfo((prev: any) => ({
            ...prev,
            result: [response["2k"].url, response["4k"].url],
          }))
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
              generateImgBothScaler()
            },
          }))
          setTimeout(() => {
            setErrorInfo((prev: any) => ({ ...prev, showError: false }))
          }, 5000)
          console.error("Error:", error)
        })
    }
  }

  const frame = useFrame()

  const addImg = async (imageUrl: string, _idx: number) => {
    if (currentActiveImg == -1) {
      await getDimensions(imageUrl, (img: any) => {
        let latest_ct = 0
        setImagesCt((prev: any) => {
          latest_ct = prev + 1
          AddObjectFunc(
            imageUrl,
            editor,
            img.width,
            img.height,
            frame,
            (latest_ct = latest_ct),
            null,
            null,
            setImgScalerInfo
          )
          return prev + 1
        })
      })
    } else {
      UpdateObjectFunc(imageUrl, editor, frame, imgScalerInfo)
    }
    setCurrentActiveImg(_idx)
  }

  const discardHandler = () => {
    setImgScalerPanelInfo((prev: any) => ({
      ...prev,
      uploadSection: true,
      trySampleImg: true,
      uploadPreview: false,
      resultSectionVisible: false,
    }))
    setImgScalerInfo((prev: any) => ({
      ...prev,
      src: "",
      scaler: 2,
      original: "",
      result: [],
      showClearTooltip: false,
    }))
  }

  return (
    <div className="d-flex flex-1 flex-column">
      {!imgScalerPanelInfo.resultSectionVisible ? (
        <>
          {imgScalerInfo.src ? (
            <Block>
              <UploadPreview
                discardHandler={discardHandler}
                previewHeading={"Image upscaler"}
                uploadType={IMAGE_UPSCALER}
                imgSrc={imgScalerInfo.src}
              />
            </Block>
          ) : (
            <Uploads
              activePanel={activePanel}
              uploadType={IMAGE_UPSCALER}
              fileInputType={"ImgUpscaler"}
              id={"ImgUpscaler"}
              mainHeading={"Add Image"}
            />
          )}
          {imgScalerPanelInfo.uploadPreview && (
            <div>
              <div className={classes.scaleSection}>
                <div className={classes.tryImgHeading}>Scale</div>
                <div className={classes.scaleBox}>
                  <div
                    className={clsx(classes.scaleInput, imgScalerInfo.scaler === 2 && classes.activeScale)}
                    onClick={() => {
                      setCurrentActiveImg(-1)
                      setImgScalerInfo((prev: any) => ({ ...prev, scaler: 2 }))
                    }}
                  >
                    2x
                  </div>
                  <div
                    className={clsx(classes.scaleInput, imgScalerInfo.scaler === 4 && classes.activeScale)}
                    onClick={() => {
                      setCurrentActiveImg(-1)
                      setImgScalerInfo((prev: any) => ({ ...prev, scaler: 4 }))
                    }}
                  >
                    {" "}
                    4x
                  </div>
                </div>
              </div>
              {/* hide for now credits related  */}
              {/* <CreditsSection /> */}

              <BaseButton
                title=" Generate"
                handleClick={() => {
                  if (imgScalerInfo.scaler === 4) {
                    generateImgBothScaler()
                  } else generateImg2Scaler()
                }}
                width="310px"
                margin="0 0 0 20px"
              />
              <LoginPopup
                isOpen={showLoginPopup}
                loginPopupCloseHandler={() => {
                  setShowLoginPopup(false)
                }}
              />
              {/* <p className={classes.freeImgText}>*1/5 free images left</p> */}
            </div>
          )}
          {imgScalerInfo.showclearTooltip && (
            // @ts-ignore
            <div className={classes.clearFieldBtn} ref={leftPanelRef}>
              <div
                className="pointer"
                onClick={() => {
                  setCurrentActiveImg(-1)
                  setImgScalerInfo((prev: any) => ({
                    ...prev,
                    src: "",
                    id: "",
                    original: "",
                    result: [],
                    scale: 2,
                    showclearTooltip: false,
                  }))
                  setImgScalerPanelInfo((prev: any) => ({
                    ...prev,
                    uploadSection: true,
                    trySampleImg: true,
                    uploadPreview: false,
                    resultSectionVisible: false,
                  }))
                }}
              >
                Clear all fields
              </div>{" "}
              <div
                className="pl-2 pointer"
                onClick={() => {
                  setImgScalerInfo((prev: any) => ({
                    ...prev,
                    showclearTooltip: false,
                  }))
                }}
              >
                <Icons.ToolTipCross />
              </div>
            </div>
          )}
          {imgScalerPanelInfo.trySampleImg && (
            <>
              <Block className={clsx(classes.tryImgHeading, "d-flex align-items-center justify-content-start mb-3")}>
                Try Sample Images
              </Block>
              <Scrollable>
                <Block className="py-3 mb-2">
                  <Block className={classes.sampleImgSection}>
                    {sampleImages.imageUpscaler &&
                      sampleImages.imageUpscaler.map((image: any, index: any) => {
                        return (
                          <ImageItem
                            key={index}
                            onClick={() => {
                              addObject(image.originalImage)
                            }}
                            preview={image.thumbnail}
                            imageLoading={imageLoading}
                          />
                        )
                      })}
                  </Block>
                </Block>
              </Scrollable>
            </>
          )}
        </>
      ) : (
        <div className={classes.resultSection}>
          <Block
            onClick={() => {
              setImgScalerPanelInfo((prev: any) => ({ ...prev, resultSectionVisible: false }))
              setImgScalerInfo((prev: any) => ({ ...prev, result: [], showclearTooltip: true }))
            }}
            $style={{ cursor: "pointer", display: "flex" }}
            className={classes.chevronRightIcon}
          >
            <Icons.ChevronRight fill="#000" size={"20"} />
          </Block>

          <div className={classes.resultImages}>
            <div className={clsx(classes.eachImg, currentActiveImg === 2 && classes.currentActiveImg)}>
              <img src={imgScalerInfo.src} alt="result-img" />

              <div className={classes.resultLabel}>{"Original"}</div>
            </div>
            {imgScalerInfo.result.map((each, _idx) => {
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
                  <div className={classes.resultLabel}>{_idx == 0 ? "2x" : "4x"}</div>
                </div>
              )
            })}

            {imageLoading &&
              Array.from(Array(loadingImgCt).keys()).map((each, _idx) => (
                <div className={classes.skeletonBox} key={_idx}>
                  {<img className={classes.imagesLoader} src={LoaderSpinner} />}{" "}
                </div>
              ))}
            {!imageLoading && imgScalerInfo.scaler === 2 && imgScalerInfo.result.length === 1 && (
              <div className={clsx("pointer", classes.eachImg, classes.lockedImg)}>
                <img src={imgScalerInfo.src} alt="result-img" className={classes.blurImg} />

                <div className={clsx(classes.resultLabel)}>{"4x"}</div>
                <div
                  className={classes.lockIcon}
                  onClick={() => {
                    generateImg4Scaler()
                  }}
                >
                  <Icons.ImgLock />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const ImageItem = ({
  preview,
  onClick,
  imageLoading,
}: {
  preview: any
  onClick?: (option: any) => void
  imageLoading: boolean
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

export default ImageUpscaler

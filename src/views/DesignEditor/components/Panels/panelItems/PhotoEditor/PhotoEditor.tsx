import { PHOTO_EDITOR } from "~/constants/contants"
import Uploads from "../UploadDropzone/Uploads"
import classes from "./style.module.css"
import useAppContext from "~/hooks/useAppContext"
import clsx from "clsx"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import React, { useContext, useEffect, useRef, useState } from "react"
import { useEditor, useFrame } from "@layerhub-io/react"
import { nanoid } from "nanoid"
import Icons from "~/components/Icons"
import LoaderSpinner from "../../../../../Public/images/loader-spinner.svg"
import ImagesContext from "~/contexts/ImagesCountContext"
import { AddObjectFunc } from "~/views/DesignEditor/utils/functions/AddObjectFunc"
import ErrorContext from "~/contexts/ErrorContext"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"
import { getCookie } from "~/utils/common"
import { COOKIE_KEYS } from "~/utils/enum"
import LoginPopup from "../../../LoginPopup/LoginPopup"
import { useAuth } from "~/hooks/useAuth"
import BaseButton from "~/components/UI/Button/BaseButton"
import UploadPreview from "../UploadPreview/UploadPreview"
import PhotoEditorContext from "~/contexts/PhotoEditorContext"
import Prompt from "~/components/Prompt/Prompt"
import photoEditorController from "~/utils/photoEditorController"
import { bgSampleImagesApi } from "~/services/bgSampleImagesApi"

const PhotoEditor = () => {
  const { activePanel } = useAppContext()
  // @ts-ignore
  const { authState } = useAuth()
  const { user } = authState
  const { bgSampleImages, setBgSampleImages } = useAppContext()
  const [imageLoading, setImageLoading] = useState(false)
  const [autoCallAPI, setAutoCallAPI] = useState(false)
  const editor = useEditor()
  const frame = useFrame()
  const [currentActiveImg, setCurrentActiveImg] = useState(-1)
  const { setImagesCt } = useContext(ImagesContext)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const { photoEditorInfo, setPhotoEditorInfo, photoEditorPanelInfo, setPhotoEditorPanelInfo } =
    useContext(PhotoEditorContext)

  useEffect(() => {
    const fetchSampleImages = async () => {
      const result = await bgSampleImagesApi()
      setBgSampleImages(result)
    }
    fetchSampleImages()
  }, [])

  useEffect(() => {
    if (user && autoCallAPI) {
      generateImage()
      setAutoCallAPI(false)
    }
  }, [user, autoCallAPI])

  const addObject = (url: string) => {
    setPhotoEditorPanelInfo((prev: any) => ({
      ...prev,
      trySampleImg: false,
      uploadSection: false,
      uploadPreview: true,
    }))
    setPhotoEditorInfo((prev: any) => ({ ...prev, src: url, original: url }))
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (leftPanelRef.current && !leftPanelRef.current.contains(e.target as Node)) {
        setPhotoEditorInfo((prev: any) => ({
          ...prev,
          showclearTooltip: false,
        }))
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [photoEditorInfo.showclearTooltip])

  const { setErrorInfo } = useContext(ErrorContext)

  const generateImage = () => {
    if (getCookie(COOKIE_KEYS.AUTH) == "invalid_cookie_value_detected") {
      setShowLoginPopup(true)
      setAutoCallAPI(true)
    } else {
      setImageLoading(true)
      setAutoCallAPI(false)
      setCurrentActiveImg(-1)
      setPhotoEditorPanelInfo((prev: any) => ({ ...prev, resultSectionVisible: true }))
      photoEditorController(photoEditorInfo.src, photoEditorInfo.prompt)
        .then((response) => {
          setImageLoading(false)
          setPhotoEditorInfo((prev: any) => ({
            ...prev,
            result: [
              ...photoEditorInfo.result,
              ...(photoEditorInfo.result.length === 0 ? [photoEditorInfo.src] : []),
              ...response,
            ],
          }))
        })
        .catch((error) => {
          setImageLoading(false)
          setPhotoEditorPanelInfo((prev: any) => ({ ...prev, resultSectionVisible: false }))
          setErrorInfo((prev: any) => ({
            ...prev,
            showError: true,
            errorMsg: "Some error has occurred",
            retryFn: () => {
              setErrorInfo((prev: any) => ({ ...prev, showError: false }))
              generateImage()
            },
          }))
          setTimeout(() => {
            setErrorInfo((prev: any) => ({ ...prev, showError: false }))
          }, 5000)
          console.error("Error:", error)
        })
    }
  }

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

  const discardHandler = () => {
    setPhotoEditorPanelInfo((prev: any) => ({
      ...prev,
      uploadSection: true,
      trySampleImg: true,
      uploadPreview: false,
      resultSectionVisible: false,
    }))
    setPhotoEditorInfo((prev: any) => ({
      ...prev,
      src: "",
      prompt: "",
      original: "",
      result: [],
      showClearTooltip: false,
    }))
  }

  return (
    <div className="d-flex flex-1 flex-column">
      {!photoEditorPanelInfo.resultSectionVisible ? (
        <>
          {photoEditorInfo.src ? (
            <Block>
              <UploadPreview
                discardHandler={discardHandler}
                previewHeading={"Photo Editor"}
                uploadType={PHOTO_EDITOR}
                imgSrc={photoEditorInfo.src}
              />
            </Block>
          ) : (
            <Uploads
              activePanel={activePanel}
              uploadType={PHOTO_EDITOR}
              fileInputType={"photoEditor"}
              id={"PhotoEditor"}
              mainHeading={"Add Image"}
              imageLoading={imageLoading}
              setImageLoading={setImageLoading}
            />
          )}
          {photoEditorPanelInfo.uploadPreview && (
            <div>
              <div className={classes.inputSection}>
                <Prompt stateInfo={photoEditorInfo} setStateInfo={setPhotoEditorInfo} />
              </div>
              {/* hide for now credits related  */}
              {/* <CreditsSection /> */}
              <BaseButton
                title="Generate"
                width="310px"
                margin="25px 0px 0px 20px"
                disabledBgColor="#92929d"
                fontSize="16px"
                disabled={photoEditorInfo.showclearTooltip || photoEditorInfo.prompt.length == 0 ? true : false}
                handleClick={() => {
                  generateImage()
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
          {photoEditorInfo.showclearTooltip && (
            // @ts-ignore
            <div className={classes.clearFieldBtn} ref={leftPanelRef}>
              <div
                className="pointer"
                onClick={() => {
                  setCurrentActiveImg(-1)
                  setPhotoEditorInfo((prev: any) => ({
                    ...prev,
                    src: "",
                    original: "",
                    prompt: "",
                    result: [],
                    showclearTooltip: false,
                  }))
                  setPhotoEditorPanelInfo((prev: any) => ({
                    ...prev,
                    uploadSection: true,
                    trySampleImg: true,
                    uploadPreview: false,
                    resultSectionVisible: false,
                  }))
                }}
              >
                Clear all fields
              </div>
              <div
                className="pl-2 pointer"
                onClick={() => {
                  setPhotoEditorInfo((prev: any) => ({
                    ...prev,
                    showclearTooltip: false,
                  }))
                }}
              >
                <Icons.ToolTipCross />
              </div>
            </div>
          )}
          {photoEditorPanelInfo.trySampleImg && (
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
              setPhotoEditorPanelInfo((prev: any) => ({ ...prev, resultSectionVisible: false }))
              setPhotoEditorInfo((prev: any) => ({ ...prev, result: [], showclearTooltip: true }))
            }}
            $style={{ cursor: "pointer", display: "flex" }}
            className={classes.chevronRightIcon}
          >
            <Icons.ChevronRight fill="#000" size={"20"} />
          </Block>

          <div className={classes.resultImages}>
            {photoEditorInfo.result.map((each, idx) => {
              return (
                <div
                  className={clsx("pointer", classes.eachImg, currentActiveImg === idx && classes.currentActiveImg)}
                  key={idx}
                >
                  <img
                    src={each}
                    alt="result-img"
                    onClick={() => {
                      addImg(each, idx)
                    }}
                  />
                  <div className={classes.resultLabel}>{idx == 0 ? "Original" : "Result"}</div>
                </div>
              )
            })}
            {imageLoading &&
              Array.from(
                Array(
                  photoEditorInfo.result.length == 0
                    ? photoEditorInfo.images_generation_ct + 1
                    : photoEditorInfo.images_generation_ct
                ).keys()
              ).map((each, idx) => (
                <div className={classes.skeletonBox} key={idx}>
                  {<img className={classes.imagesLoader} src={LoaderSpinner} />}
                </div>
              ))}
          </div>
          <BaseButton
            disabled={imageLoading ? true : false}
            handleClick={() => {
              generateImage()
            }}
            width="319px"
            margin="16px 0 0 20px"
            fontSize="16px"
          >
            Regenerate
          </BaseButton>
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

export default PhotoEditor
import { PHOTO_EDITOR, TOOL_NAMES } from "~/constants/contants"
import Uploads from "../UploadDropzone/Uploads"
import classes from "./style.module.css"
import useAppContext from "~/hooks/useAppContext"
import clsx from "clsx"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { useContext, useEffect, useRef, useState } from "react"
import { useEditor, useFrame } from "@layerhub-io/react"
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
import SampleImagesContext from "~/contexts/SampleImagesContext"
import { getPollingIntervals } from "~/services/pollingIntervals.service"
import { PollingInterval } from "~/contexts/PollingInterval"
import { UpdateObjectFunc } from "~/views/DesignEditor/utils/functions/UpdateObjectFunc"
import FileError from "~/components/UI/Common/FileError/FileError"

const PhotoEditor = () => {
  const { activePanel } = useAppContext()
  // @ts-ignore
  const { authState } = useAuth()
  const { user } = authState
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
  const { sampleImages } = useContext(SampleImagesContext)
  const { pollingIntervalInfo, setPollingIntervalInfo } = useContext(PollingInterval)
  useEffect(() => {
    if (editor.objects.findById(photoEditorInfo.id)[0] === null) {
      setCurrentActiveImg(-1)
    }
  }, [editor.objects.findById(photoEditorInfo.id)[0]])

  useEffect(() => {
    if (user && autoCallAPI) {
      generateImage()
      setAutoCallAPI(false)
    }
  }, [user, autoCallAPI])

  useEffect(() => {
    setPhotoEditorInfo((prev: any) => ({
      ...prev,
      id: "",
      src: "",
      original: "",
      prompt: "",
      images_generation_ct: 1,
      result: [],
      showclearTooltip: false,
      isError: false,
    }))
    setPhotoEditorPanelInfo((prev: any) => ({
      ...prev,
      uploadSection: true,
      trySampleImg: true,
      uploadPreview: false,
      resultSectionVisible: false,
    }))
  }, [])

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
    if (user) {
      getPollingIntervals()
        .then((res: any) => {
          // Store polling intervals
          setPollingIntervalInfo((prev: any) => ({ ...prev, photoEditor: res.features.photo_editor }))
          // storePollingIntervalCookies(res)
        })
        .catch(() => {
          // an error occured so we rely on fallback polling intervals for each tool in this case
        })
    }
  }, [user])

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
    setPhotoEditorInfo((prev: any) => ({ ...prev, isError: false }))

    if (getCookie(COOKIE_KEYS.AUTH) == "invalid_cookie_value_detected") {
      setShowLoginPopup(true)
      setAutoCallAPI(true)
    } else {
      setImageLoading(true)
      setAutoCallAPI(false)
      setCurrentActiveImg(-1)
      setPhotoEditorPanelInfo((prev: any) => ({ ...prev, resultSectionVisible: true }))
      photoEditorController(photoEditorInfo.src, photoEditorInfo.prompt, pollingIntervalInfo.photoEditor)
        .then((response) => {
          addImg(response[0], 1)
          setImageLoading(false)
          setPhotoEditorInfo((prev: any) => ({
            ...prev,
            result: [...photoEditorInfo.result, ...response],
          }))
        })
        .catch((error) => {
          setImageLoading(false)
          setPhotoEditorInfo((prev: any) => ({ ...prev, isError: true }))
          console.error("Error:", error)
        })
    }
  }

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
            setPhotoEditorInfo
          )
          return prev + 1
        })
      })
    } else {
      UpdateObjectFunc(imageUrl, editor, frame, photoEditorInfo, setPhotoEditorInfo, setImagesCt)
    }
    setCurrentActiveImg(_idx)
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
      id: "",
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
                disabled={photoEditorInfo.showclearTooltip || photoEditorInfo.prompt.trim().length == 0 ? true : false}
                handleClick={() => {
                  generateImage()
                }}
              />
              <LoginPopup
                isOpen={showLoginPopup}
                loginPopupCloseHandler={() => {
                  setShowLoginPopup(false)
                }}
                toolName={TOOL_NAMES.photoEditor}
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
                    id: "",
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
              <Block className={clsx(classes.tryImgHeading, "d-flex align-items-center justify-content-start mb-2 mt-3")}>
                Try Sample Images
              </Block>
              <Scrollable>
                <Block className="py-3 mb-2">
                  <Block className={classes.sampleImgSection}>
                    {sampleImages.photoEditor &&
                      sampleImages.photoEditor.map((image: any, index: any) => {
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
              setPhotoEditorInfo((prev: any) => ({ ...prev, id: "", result: [], showclearTooltip: true }))
            }}
            $style={{ cursor: "pointer", display: "flex" }}
            className={classes.chevronRightIcon}
          >
            <Icons.ChevronRight fill="#000" size={"20"} />
          </Block>

          <div className={classes.resultImages}>
            <div className={clsx(classes.eachImg, currentActiveImg === 0 && classes.currentActiveImg)}>
              <img
                src={photoEditorInfo.src}
                alt="orginal-img"
                onClick={() => {
                  if (imageLoading) return;
                  if (currentActiveImg === 0) return;
                  addImg(photoEditorInfo.src, 0);
                }}
              />
              <div className={classes.resultLabel}>{"Original"}</div>
            </div>
            {photoEditorInfo.result.map((each, idx) => {
              return (
                <div
                  className={clsx("pointer", classes.eachImg, currentActiveImg === idx + 1 && classes.currentActiveImg)}
                  key={idx}
                >
                  <img
                    src={each}
                    alt="result-img"
                    onClick={() => {
                      if (currentActiveImg === idx + 1) return
                      addImg(each, idx + 1)
                    }}
                  />
                  {/* <div className={classes.resultLabel}>{"Result"}</div> */}
                </div>
              )
            })}
            {photoEditorInfo.isError && !imageLoading && (
              <div className={classes.skeletonBox}>
                {
                  <div className={classes.retry}>
                    <Icons.RetryImg />
                  </div>
                }{" "}
              </div>
            )}
            {imageLoading &&
              Array.from(Array(photoEditorInfo.images_generation_ct).keys()).map((each, idx) => (
                <div className={classes.skeletonBox} key={idx}>
                  {<img className={classes.imagesLoader} src={LoaderSpinner} />}
                </div>
              ))}
          </div>
          {!imageLoading && photoEditorInfo.isError && (
            <div style={{ position: "relative", margin: "12px 0px 0px -7px" }}>
              <FileError
                ErrorMsg={"Oops! unable to generate your image please try again."}
                displayError={photoEditorInfo.isError}
              />
            </div>
          )}
          <BaseButton
            disabled={imageLoading ? true : false}
            handleClick={() => {
              generateImage()
            }}
            width="319px"
            margin="16px 0 0 20px"
            fontSize="16px"
          >
            {photoEditorInfo.isError && !imageLoading ? "Retry" : "Regenerate"}
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

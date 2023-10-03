import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import React, { useCallback, useContext, useState, useRef, useEffect } from "react"
import Scrollable from "~/components/Scrollable"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import ColorPicker from "~/components/UI/ColorPicker/ColorPicker"
import { changeLayerFill } from "~/utils/updateLayerBackground"
import UploadImgModal from "~/components/UI/UploadImgModal/UploadImgModal"
import LoaderContext from "~/contexts/LoaderContext"
import { ID_MASK_CANVAS, ID_RESULT_CANVAS, ID_SRC_CANVAS, removeBackgroundController } from "~/utils/removeBackground"
import MainImageContext from "~/contexts/MainImageContext"
import { HandleBgChangeOption } from "~/views/DesignEditor/utils/functions/HandleBgChangeFunc"
import { RemoveBGFunc } from "~/views/DesignEditor/utils/functions/RemoveBgFunc"
import ImagesContext from "~/contexts/ImagesCountContext"
import ErrorContext from "~/contexts/ErrorContext"
import { ObjectLayerOption } from "~/views/DesignEditor/utils/ObjectLayerOptions"
import DropdownWrapper from "./DropdownWrapper"
import Loader from "~/components/UI/Loader/Loader"
import { getCookie } from "~/utils/common"
import { COOKIE_KEYS } from "~/utils/enum"
import LoginPopup from "../../../LoginPopup/LoginPopup"
import { useAuth } from "~/hooks/useAuth"

const ObjectLayer = ({ showLayer, handleClose }: any) => {
  const virtualSrcImageRef = useRef<HTMLImageElement | null>(null)
  const virtualMaskImageRef = useRef<HTMLImageElement | null>(null)
  const virtualCanvasSrcImageRef = useRef<HTMLCanvasElement | null>(null)
  const virtualCanvasMaskImageRef = useRef<HTMLCanvasElement | null>(null)
  const virtualCanvasResultImageRef = useRef<HTMLCanvasElement | null>(null)
  const [activeState, setActiveState] = useState(-1)
  const [objectBgColor, setObjectBgColor] = useState("#000000")
  const [isOpen, setIsOpen] = React.useState(false)
  const [isReplacePopup, setIsReplacePopup] = useState(false)
  const [activeOb, setActiveOb] = useState<any>()
  const { mainImgInfo, setMainImgInfo, setPanelInfo } = useContext(MainImageContext)
  const { errorInfo, setErrorInfo } = useContext(ErrorContext)
  const [showLoginPopUp, setShowLoginPopup] = useState(false)
  // @ts-ignore
  const { authState, setAuthState } = useAuth()
  const { user } = authState
  const handleActiveState = (idx: number) => {
    if (idx == activeState) {
      setActiveState(-1)
    } else setActiveState(idx)
  }
  function close() {
    setIsOpen(false)
  }

  const handleUpdatePopup = () => {
    setIsReplacePopup(false)
  }

  const editor = useEditor()
  const activeObject: any = useActiveObject()
  const { setBlinkInOutLoader } = useContext(LoaderContext)
  const colors = ["#FF6BB2", "#B69DFF", "#30C5E5", "#7BB872", "#49A8EE", "#3F91A2", "#DA4F7A", "#FFFFFF"]
  const { setImagesCt } = useContext(ImagesContext)
  const handleChangeBg = useCallback(
    async (each: any) => {
      let inputImage
      if (getCookie(COOKIE_KEYS.AUTH) == "invalid_cookie_value_detected") {
        return setShowLoginPopup(true)
      }
      if (
        activeObject?.metadata?.originalLayerPreview &&
        (activeObject && activeObject?.metadata?.originalLayerPreview).substring(0, 4) != "http"
      ) {
        inputImage = activeObject?.metadata?.originalLayerPreview
        changeBGFillHandler(inputImage, each.color)
        setObjectBgColor(each.color)
        setMainImgInfo((prev: any) => ({ ...prev, swiper_selected_color: each.color }))
      } else {
        removeBackgroundBeforeChangingColor(each)
      }
    },
    [activeObject, user]
  )

  const eraseHandler = () => {
    if (activeObject?.id === mainImgInfo.id) {
      // @ts-ignore
      setPanelInfo((prev) => ({
        ...prev,
        uploadSection: true,
        trySampleImg: true,
        uploadPreview: false,
        bgOptions: false,
        bgRemoverBtnActive: false,
      }))
      setMainImgInfo((prev: any) => ({ ...prev, id: "" }))
    }
    editor.objects.remove(activeObject?.id)
  }

  const changeBGFillHandler = async (inputImg: string, BG: string) => {
    if (activeObject?.id === mainImgInfo.id) {
      // @ts-ignore
      setMainImgInfo((prev) => ({ ...prev, swiper_option_selected: false }))
      HandleBgChangeOption(editor, mainImgInfo, setMainImgInfo, BG, changeLayerFill, activeObject, inputImg)
    } else {
      HandleBgChangeOption(editor, 0, 0, BG, changeLayerFill, activeObject, inputImg)
    }
    setBlinkInOutLoader(false)
  }

  const removeBackgroundBeforeChangingColor = async (each: any) => {
    try {
      setBlinkInOutLoader(true)
      let response = await removeBackgroundController(
        activeObject.metadata ? activeObject.metadata.originalLayerPreview : activeObject.src,
        async (image: string) => {
          if (activeObject?.id === mainImgInfo?.id) {
            setPanelInfo((prev: any) => ({
              ...prev,
              bgOptions: true,
              bgRemoverBtnActive: false,
              uploadSection: false,
              trySampleImg: false,
              uploadPreview: false,
            }))
          }
          changeBGFillHandler(image, each.color)
        },
        virtualSrcImageRef,
        virtualMaskImageRef,
        virtualCanvasSrcImageRef,
        virtualCanvasMaskImageRef,
        virtualCanvasResultImageRef,
        activeObject?.width * activeObject?.scaleX,
        activeObject?.height * activeObject?.scaleY
      )
      if (response) {
        throw new Error("Something went wrong while removing background...")
      }
    } catch (error: any) {
      setBlinkInOutLoader(false)
      // @ts-ignore
      setErrorInfo((prev) => ({
        ...prev,
        showError: true,
        errorMsg: "Something went wrong while removing background...",
        retryFn: () => {
          // @ts-ignore
          setErrorInfo((prev) => ({ ...prev, showError: false }))
          removeBackgroundBeforeChangingColor(each)
        },
      }))
      setTimeout(() => {
        // @ts-ignore
        setErrorInfo((prev) => ({ ...prev, showError: false }))
      }, 5000)
      console.log("Something went wrong while removing background...", error.message)
    }
  }
  useEffect(() => {
    if (mainImgInfo.swiper_selected_color.startsWith("#")) {
      setObjectBgColor(mainImgInfo?.swiper_selected_color)
    } else {
      setObjectBgColor("#000000")
    }
  }, [mainImgInfo])


  return showLayer ? (
    <>
      <Loader isOpen={setBlinkInOutLoader} />
      <Scrollable>
        <img src="" ref={virtualSrcImageRef} style={{ display: "none" }} crossOrigin="anonymous" />
        <img src="" ref={virtualMaskImageRef} style={{ display: "none" }} crossOrigin="anonymous" />

        <canvas className={ID_SRC_CANVAS} ref={virtualCanvasSrcImageRef} style={{ display: "none" }} />
        <canvas className={ID_MASK_CANVAS} ref={virtualCanvasMaskImageRef} style={{ display: "none" }} />
        <canvas className={ID_RESULT_CANVAS} ref={virtualCanvasResultImageRef} style={{ display: "none" }} />
        <div className={classes.objectLayerSection}>
          <div
            className="d-flex justify-content-start flex-row align-items-center pointer mt-1"
            onClick={() => {
              handleClose()
            }}
          >
            <Icons.ChevronRight size="16" /> <div className={clsx(classes.panelHeading, "ml-1")}>Object</div>
          </div>
          <div>
            <div className={clsx(classes.layerSubSection, "flex-center mt-3")}>
              <div
                className={clsx(
                  classes.box,
                  "d-flex justify-content-center align-items-center flex-column mr-1 pointer"
                )}
                onClick={() => {
                  setActiveOb(activeObject)
                  setIsReplacePopup(true)
                }}
              >
                <Icons.Image />
                <p>Replace</p>
              </div>
              <div
                className={clsx(
                  classes.box,
                  " pointer d-flex justify-content-center align-items-center flex-column ml-1"
                )}
                // @ts-ignore
                onClick={() => eraseHandler()}
              >
                <Icons.TrashIcon size={"20"} />
                <p>Delete</p>
              </div>{" "}
            </div>
            <LoginPopup
              isOpen={showLoginPopUp}
              loginPopupCloseHandler={() => {
                setShowLoginPopup(false)
              }}
            />
            <div className={clsx(classes.modifierSection, classes.panelSubHeading, "mb-2")}>Modifiers</div>
            {ObjectLayerOption.map((each, idx) => (
              <DropdownWrapper
                key={idx}
                icon={each.icon}
                activeState={activeState}
                idx={idx}
                heading={each.name}
                handleActiveState={handleActiveState}
              />
            ))}
          </div>
          <div className={clsx(classes.panelSubHeading, "my-2")}>Colors</div>
          <div className={classes.colorsWrapper}>
            {colors.map((each, idx) => {
              return (
                <>
                  <div
                    key={idx}
                    style={{
                      backgroundColor: each,
                      border: idx == colors.length - 1 ? "1px solid #92929D" : "",
                      position: "relative",
                    }}
                    className={clsx(classes.colorOption, "flex-center")}
                    onClick={() => {
                      if (idx === colors.length - 1) {
                        setIsOpen(true)
                      } else {
                        handleChangeBg({ color: each })
                      }
                    }}
                  >
                    {objectBgColor === each && (
                      <div
                        style={{
                          position: "absolute",
                          width: "42px",
                          height: "42px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Icons.Selection size={"22"} />
                      </div>
                    )}
                    {idx === colors.length - 1 && (
                      <div>
                        {" "}
                        <Icons.ColorPlus />{" "}
                      </div>
                    )}
                  </div>
                </>
              )
            })}
          </div>
          <ColorPicker
            inputColor={objectBgColor}
            isOpen={isOpen}
            handleClose={close}
            handleChangeColor={(color: any) => {
              handleChangeBg({ color })
            }}
          />

          {activeObject?.preview !== activeObject?.metadata?.originalLayerPreview ||
            activeObject?.src !== activeObject?.metadata?.originalLayerPreview ? (
            <>
              <div className={clsx(classes.panelSubHeading, "my-2")}>Other tools</div>
              <div className={classes.otherToolsWrapper}>
                <div
                  onClick={() => {
                    let latest_ct = 0
                    setImagesCt((prev: any) => {
                      latest_ct = prev
                      return prev
                    })
                    if (getCookie(COOKIE_KEYS.AUTH) == "invalid_cookie_value_detected") {
                      setShowLoginPopup(true)
                      return
                    }
                    if (mainImgInfo?.id === activeObject?.id) {
                      RemoveBGFunc(
                        editor,
                        setBlinkInOutLoader,
                        setPanelInfo,
                        mainImgInfo,
                        setMainImgInfo,
                        virtualSrcImageRef,
                        virtualMaskImageRef,
                        virtualCanvasSrcImageRef,
                        virtualCanvasMaskImageRef,
                        virtualCanvasResultImageRef,
                        0,
                        (latest_ct = latest_ct),
                        errorInfo,
                        setErrorInfo
                      )
                    } else {
                      RemoveBGFunc(
                        editor,
                        setBlinkInOutLoader,
                        setPanelInfo,
                        0,
                        setMainImgInfo,
                        virtualSrcImageRef,
                        virtualMaskImageRef,
                        virtualCanvasSrcImageRef,
                        virtualCanvasMaskImageRef,
                        virtualCanvasResultImageRef,
                        activeObject,
                        (latest_ct = latest_ct),
                        errorInfo,
                        setErrorInfo
                      )
                    }
                  }}
                  className={clsx(
                    classes.otherToolsBox,
                    "d-flex  pointer justify-content-center align-items-center flex-column mr-1 mb-1"
                  )}
                >
                  <Icons.Image />
                  <p>Remove Background</p>
                </div>
              </div>
            </>
          ) : null}
        </div>

        <UploadImgModal
          activeOb={activeOb}
          fileInputType="update"
          isOpen={isReplacePopup}
          handleClose={handleUpdatePopup}
          id={"ObjectLayer"}
        />
      </Scrollable>
    </>
  ) : null
}

export default ObjectLayer

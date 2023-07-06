import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { useEditor } from "@layerhub-io/react"
import { useContext, useRef } from "react"
import LoaderContext from "~/contexts/LoaderContext"
import MainImageContext from "~/contexts/MainImageContext"
import {
  IMAGE_COLORIZER,
  LOCAL_SAMPLE_IMG,
  MAIN_IMG_Bg,
  MODAL_IMG_UPLOAD,
  OBJECT_REMOVER,
  REMOVE_BACKGROUND,
  TEXT_TO_ART,
} from "~/constants/contants"
import { ID_MASK_CANVAS, ID_RESULT_CANVAS, ID_SRC_CANVAS } from "~/utils/removeBackground"
import { RemoveBGFunc } from "~/views/DesignEditor/utils/functions/RemoveBgFunc"
import ImagesContext from "~/contexts/ImagesCountContext"
import ErrorContext from "~/contexts/ErrorContext"
import BaseButton from "~/components/UI/Button/BaseButton"

const UploadPreview = ({
  discardHandler,
  uploadType,
  previewHeading,
  imgSrc,
  btnTitle,
  previewHandle,
  uploading,
}: any) => {
  const virtualSrcImageRef = useRef<HTMLImageElement | null>(null)
  const virtualMaskImageRef = useRef<HTMLImageElement | null>(null)
  const virtualCanvasSrcImageRef = useRef<HTMLCanvasElement | null>(null)
  const virtualCanvasMaskImageRef = useRef<HTMLCanvasElement | null>(null)
  const virtualCanvasResultImageRef = useRef<HTMLCanvasElement | null>(null)
  const editor = useEditor()
  const { setLoaderPopup } = useContext(LoaderContext)
  const { mainImgInfo, setMainImgInfo, panelInfo, setPanelInfo } = useContext(MainImageContext)
  const { setImagesCt } = useContext(ImagesContext)
  const { errorInfo, setErrorInfo } = useContext(ErrorContext)

  const removeBg = () => {
    let latest_ct = 0
    setImagesCt((prev: any) => {
      latest_ct = prev + 1
      RemoveBGFunc(
        editor,
        setLoaderPopup,
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

      return prev + 1
    })
  }

  return (
    <div>
      <Block paddingTop={"10px"}>
        {uploadType != MAIN_IMG_Bg &&
          uploadType !== IMAGE_COLORIZER &&
          uploadType != MODAL_IMG_UPLOAD &&
          uploadType != OBJECT_REMOVER && (
            <div
              className="d-flex justify-content-start flex-row align-items-center pointer pl-2"
              onClick={() => {
                discardHandler()
              }}
            >
              <Icons.ChevronRight size="16" /> <Block className={clsx(classes.panelHeading)}>{previewHeading}</Block>
            </div>
          )}
        {uploadType === IMAGE_COLORIZER && (
          <Block
            onClick={() => {
              discardHandler()
            }}
            $style={{ cursor: "pointer", display: "flex" }}
            className={classes.chevronRightIcon}
          >
            <Icons.ChevronRight fill="#000" size={"20"} />
          </Block>
        )}
      </Block>
      <Block className={classes.uploadInputWrapper}>
        <div
          className={clsx(
            classes.uploadPreviewSection,
            "d-flex align-items-center pointer",
            uploadType === LOCAL_SAMPLE_IMG && classes.localImg
          )}
        >
          <div className="p-relative">
            <img src="" ref={virtualSrcImageRef} style={{ display: "none" }} crossOrigin="anonymous" />
            <img src="" ref={virtualMaskImageRef} style={{ display: "none" }} crossOrigin="anonymous" />

            <canvas className={ID_SRC_CANVAS} ref={virtualCanvasSrcImageRef} style={{ display: "none" }} />
            <canvas className={ID_MASK_CANVAS} ref={virtualCanvasMaskImageRef} style={{ display: "none" }} />
            <canvas className={ID_RESULT_CANVAS} ref={virtualCanvasResultImageRef} style={{ display: "none" }} />
            <Block className={clsx(classes.uploadPreviewContainer, uploadType === MAIN_IMG_Bg && classes.mainImgBg)}>
              <Icons.InputContainer height={uploadType === MAIN_IMG_Bg && "165"} />
            </Block>
            <Block className={clsx(classes.uploadPreview, "flex-center flex-column ")}>
              <img
                className={clsx(classes.uploadedImg, uploadType === MAIN_IMG_Bg && classes.mainBgUploadedImg)}
                style={{ objectFit: "contain" }}
                src={imgSrc}
                alt="preview"
              />

              {uploadType != MODAL_IMG_UPLOAD && uploadType != OBJECT_REMOVER && (
                <Block
                  className={clsx(
                    "p-absolute pointer",
                    classes.discardBtn,
                    uploadType === MAIN_IMG_Bg && classes.mainImgBgDiscard,
                    uploadType === TEXT_TO_ART && classes.textToArtTrashIcon
                  )}
                >
                  <span onClick={discardHandler}>
                    <Icons.Trash size={"32"} />
                  </span>
                </Block>
              )}
            </Block>

            {btnTitle && (
              <BaseButton
                title={btnTitle}
                disabled={uploadType === REMOVE_BACKGROUND ? (panelInfo.bgRemoverBtnActive ? false : true) : false}
                margin={uploadType === MAIN_IMG_Bg ? "0 0 0 4px" : "16px 0 0 0"}
                handleClick={() => {
                  if (uploadType === REMOVE_BACKGROUND) {
                    removeBg()
                  } else {
                    !uploading && previewHandle()
                  }
                }}
              />
            )}
          </div>
        </div>
      </Block>
    </div>
  )
}

export default UploadPreview

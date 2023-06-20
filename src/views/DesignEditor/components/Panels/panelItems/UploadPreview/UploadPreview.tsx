import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { useEditor } from "@layerhub-io/react"
import { useContext, useEffect, useRef } from "react"
import LoaderContext from "~/contexts/LoaderContext"
import MainImageContext from "~/contexts/MainImageContext"
import { LOCAL_SAMPLE_IMG, MAIN_IMG_Bg, TEXT_TO_ART } from "~/constants/contants"
import { ID_MASK_CANVAS, ID_RESULT_CANVAS, ID_SRC_CANVAS } from "~/utils/removeBackground"
import { RemoveBGFunc } from "~/views/DesignEditor/utils/functions/RemoveBgFunc"
import ImagesContext from "~/contexts/ImagesCountContext"
import ErrorContext from "~/contexts/ErrorContext"
import BaseButton from "~/components/UI/Button/BaseButton"

const UploadPreview = ({ discardHandler, uploadType, textToArtImg, upload, mainImgUrl, handleBgAdd,disableButton}: any) => {
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

  return (
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
        {uploadType === LOCAL_SAMPLE_IMG && upload ? (
          <img className={classes.uploadedImg} src={upload.preview ? upload.preview : upload.src} alt="preview" />
        ) : uploadType === MAIN_IMG_Bg && mainImgUrl ? (
          <img
            className={clsx(classes.uploadedImg, uploadType === MAIN_IMG_Bg && classes.mainBgUploadedImg)}
            src={mainImgUrl}
            alt="preview h"
          />
        ) : uploadType === TEXT_TO_ART && textToArtImg ? (
          <img className={classes.uploadedImg} style={{ objectFit: "contain" }} src={textToArtImg} alt="preview" />
        ) : (
          mainImgInfo.id &&
          (mainImgInfo.url || mainImgInfo.original) && (
            <img
              className={classes.uploadedImg}
              src={mainImgInfo.original ? mainImgInfo.original : mainImgInfo.url}
              alt="preview k"
            />
          )
        )}

        {
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
        }
      </Block>

      {uploadType === LOCAL_SAMPLE_IMG ? (
        <BaseButton
          title="Add"
          margin="16px 0 0 0"
          handleClick={() => {
            let latest_ct = 0
            setImagesCt((prev: any) => {
              latest_ct = prev + 1
              return prev + 1
            })
            editor.objects.add({ ...upload, name: latest_ct.toString() })
            discardHandler()
          }}
        />
      ) : uploadType === MAIN_IMG_Bg ? (

        <BaseButton
          title="Add Background"
          width="320px"
          margin="0 0 0 20px"
          handleClick={() => {
           if(!loaderPopup){
              handleBgAdd()
            }

          }}
        />
      ) : (
        uploadType != TEXT_TO_ART && (
          <div style={{ marginTop: "6px" }}>
            <BaseButton
              title="Remove Background"
              margin="16px 0 0 0"
              disabled={panelInfo.bgRemoverBtnActive ? false : true}
              handleClick={() => {
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
              }}
            />
          </div>
        )
      )}
    </div>
  )
}

export default UploadPreview

import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { useEditor } from "@layerhub-io/react"
import { useContext, useRef } from "react"
import LoaderContext from "~/contexts/LoaderContext"
import { removeBackgroundController } from "~/utils/removeBackground"
import MainImageContext from "~/contexts/MainImageContext"
import { nanoid } from "nanoid"
import { LOCAL_SAMPLE_IMG, MAIN_IMG_Bg } from "~/constants/contants"
import { ID_MASK_CANVAS, ID_RESULT_CANVAS, ID_SRC_CANVAS } from "~/utils/removeBackground"
import { RemoveBGFunc } from "~/views/DesignEditor/utils/functions/RemoveBgFunc"
import ImagesContext from "~/contexts/ImagesCountContext"

const UploadPreview = ({ discardHandler, uploadType, upload, mainImgUrl, handleBgAdd }: any) => {
  const virtualSrcImageRef = useRef<HTMLImageElement | null>(null)
  const virtualMaskImageRef = useRef<HTMLImageElement | null>(null)
  const virtualCanvasSrcImageRef = useRef<HTMLCanvasElement | null>(null)
  const virtualCanvasMaskImageRef = useRef<HTMLCanvasElement | null>(null)
  const virtualCanvasResultImageRef = useRef<HTMLCanvasElement | null>(null)
  const editor = useEditor()
  const { setLoaderPopup } = useContext(LoaderContext)
  const { mainImgInfo, setMainImgInfo, panelInfo, setPanelInfo } = useContext(MainImageContext)
  const { setImagesCt } = useContext(ImagesContext)
  return (
    <div className="p-relative">
      <img src="" ref={virtualSrcImageRef} style={{ display: "none" }} crossOrigin="anonymous" />
      <img src="" ref={virtualMaskImageRef} style={{ display: "none" }} crossOrigin="anonymous" />

      <canvas className={ID_SRC_CANVAS} ref={virtualCanvasSrcImageRef} style={{ display: "none" }} />
      <canvas className={ID_MASK_CANVAS} ref={virtualCanvasMaskImageRef} style={{ display: "none" }} />
      <canvas className={ID_RESULT_CANVAS} ref={virtualCanvasResultImageRef} style={{ display: "none" }} />
      <Block className={clsx(classes.uploadPreviewContainer, uploadType === MAIN_IMG_Bg && classes.mainImgBg)}>
        <Icons.InputContainer />
      </Block>
      <Block className={clsx(classes.uploadPreview, "flex-center flex-column ")}>
        {uploadType === LOCAL_SAMPLE_IMG && upload ? (
          <img className={classes.uploadedImg} src={upload.preview ? upload.preview : upload.src} alt="preview" />
        ) : uploadType === MAIN_IMG_Bg && mainImgUrl ? (
          <img
            className={clsx(classes.uploadedImg, uploadType === MAIN_IMG_Bg && classes.mainBgUploadedImg)}
            src={mainImgUrl}
            alt="preview"
          />
        ) : (
          <img
            className={classes.uploadedImg}
            src={mainImgInfo.original ? mainImgInfo.original : mainImgInfo.url}
            alt="preview"
          />
        )}

        {
          <Block
            className={clsx(
              "p-absolute pointer",
              classes.discardBtn,
              uploadType === MAIN_IMG_Bg && classes.mainImgBgDiscard
            )}
          >
            <span onClick={discardHandler}>
              <Icons.Trash size={"32"} />
            </span>
          </Block>
        }
      </Block>

      {uploadType === LOCAL_SAMPLE_IMG ? (
        <button
          onClick={() => {
            let latest_ct = 0
            setImagesCt((prev: any) => {
              latest_ct = prev + 1
              return prev + 1
            })
            editor.objects.add({ ...upload, name: latest_ct.toString() })
            discardHandler()
          }}
          className={clsx(classes.removeBgBtn)}
        >
          Add
        </button>
      ) : uploadType === MAIN_IMG_Bg ? (
        <button
          onClick={() => {
            handleBgAdd()
          }}
          className={clsx(classes.removeBgBtn, uploadType === MAIN_IMG_Bg && classes.mainImgBgBtn)}
        >
          Add Background
        </button>
      ) : (
        <button
          disabled={panelInfo.bgRemoverBtnActive ? false : true}
          onClick={() => {
            let latest_ct = 0
            setImagesCt((prev: any) => {
              latest_ct = prev + 1
              return prev + 1
            })
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
              (latest_ct = latest_ct)
            )
          }}
          className={clsx(classes.removeBgBtn, !panelInfo.bgRemoverBtnActive && classes.disabledBtn)}
        >
          Remove Background
        </button>
      )}
    </div>
  )
}

export default UploadPreview

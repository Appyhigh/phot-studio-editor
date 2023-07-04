import BaseButton from "~/components/UI/Button/BaseButton"
import classes from "./style.module.css"
import { useCoreHandler } from "~/components/FabricCanvas/Canvas/handlers"
import { Modal } from "baseui/modal"
import ProductPhotoshootContext from "~/contexts/ProductPhotoshootContext"
import { useContext, useRef } from "react"
import { ID_MASK_CANVAS, ID_RESULT_CANVAS, ID_SRC_CANVAS, removeBackgroundController } from "~/utils/removeBackground"
import CanvasLoaderContext from "~/contexts/CanvasLoaderContext"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"
import ErrorContext from "~/contexts/ErrorContext"

const ProductPreview = ({ isOpen, onClose, imageUrl }: any) => {
  const { addImage } = useCoreHandler()
  const { productPhotoshootInfo, setProductPhotoshootInfo } = useContext(ProductPhotoshootContext)
  const { setCanvasLoader } = useContext(CanvasLoaderContext)
  const virtualSrcImageRef = useRef<HTMLImageElement | null>(null)
  const virtualMaskImageRef = useRef<HTMLImageElement | null>(null)
  const virtualCanvasSrcImageRef = useRef<HTMLCanvasElement | null>(null)
  const virtualCanvasMaskImageRef = useRef<HTMLCanvasElement | null>(null)
  const virtualCanvasResultImageRef = useRef<HTMLCanvasElement | null>(null)
  const { setErrorInfo } = useContext(ErrorContext)

  const handleRemoveBgAndAddObject = async (imageUrl: any) => {
    setCanvasLoader(true)
    try {
      await getDimensions(imageUrl, async (img: any) => {
        let response = await removeBackgroundController(
          imageUrl,
          (image: string) => {
            if (image) {
              console.log("image", imageUrl)
              console.log("image", image)
              addImage({
                type: "image",
                src: image,
              })
              setCanvasLoader(false)
            } else {
              setCanvasLoader(false)
              throw new Error("Something went wrong while removing background...")
            }
          },
          virtualSrcImageRef,
          virtualMaskImageRef,
          virtualCanvasSrcImageRef,
          virtualCanvasMaskImageRef,
          virtualCanvasResultImageRef,
          img.width,
          img.height
        )
        if (response) {
          setCanvasLoader(false)
          console.log(response)
          setErrorInfo((prev: any) => ({
            ...prev,
            showError: true,
            errorMsg: "Something went wrong while removing background...",
            retryFn: () => {
              setErrorInfo((prev: any) => ({ ...prev, showError: false }))
              handleRemoveBgAndAddObject(imageUrl)
            },
          }))
          setTimeout(() => {
            setErrorInfo((prev: any) => ({ ...prev, showError: false }))
          }, 5000)
        }
      })
    } catch (error: any) {
      console.log("ERROR", error)
      setCanvasLoader(false)
      setErrorInfo((prev: any) => ({
        ...prev,
        showError: true,
        errorMsg: "Something went wrong while removing background...",
        retryFn: () => {
          // @ts-ignore
          setErrorInfo((prev) => ({ ...prev, showError: false }))
          handleRemoveBgAndAddObject(imageUrl)
        },
      }))
      setTimeout(() => {
        // @ts-ignore
        setErrorInfo((prev) => ({ ...prev, showError: false }))
      }, 5000)
    }
  }

  return (
    <Modal
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            zIndex: 500,
          }),
        },
        Close: {
          style: ({ $theme }) => ({
            display: "none",
          }),
        },
        Dialog: {
          style: ({ $theme }) => ({
            backgroundColor: $theme.colors.white,
            width: "550px",
            position: "absolute",
            top: "-8.25rem",
            left: "31.5rem",
          }),
        },
      }}
      onClose={onClose}
      isOpen={isOpen}
    >
      <img src="" ref={virtualSrcImageRef} style={{ display: "none" }} crossOrigin="anonymous" />
      <img src="" ref={virtualMaskImageRef} style={{ display: "none" }} crossOrigin="anonymous" />
      <canvas className={ID_SRC_CANVAS} ref={virtualCanvasSrcImageRef} style={{ display: "none" }} />
      <canvas className={ID_MASK_CANVAS} ref={virtualCanvasMaskImageRef} style={{ display: "none" }} />
      <canvas className={ID_RESULT_CANVAS} ref={virtualCanvasResultImageRef} style={{ display: "none" }} />
      <div className={classes.previewPanel}>
        <div className={classes.previewImg}>
          <img
            src={imageUrl}
            alt="preview"
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              verticalAlign: "middle",
            }}
          />
        </div>
        <div className={classes.ctaButtons}>
          <BaseButton
            title="Don't remove background"
            borderRadius="10px"
            width="13rem"
            fontSize="0.8rem"
            fontFamily="Rubik"
            fontWeight="500"
            bgColor="#F1F1F5"
            txtColor="#44444F"
            padding="0.8125rem"
            handleClick={() => {
              //   onClose()
              addImage({
                type: "image",
                src: imageUrl,
              })
            }}
          />
          <BaseButton
            title="Remove background & Add"
            borderRadius="0.5rem"
            width="13rem"
            fontSize="0.8rem"
            fontFamily="Rubik"
            fontWeight="500"
            padding="0.8125rem"
            handleClick={() => {
              //   onClose()
              handleRemoveBgAndAddObject(imageUrl)
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

export default ProductPreview

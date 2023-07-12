import { Block } from "baseui/block"
import clsx from "clsx"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import { useContext, useState } from "react"
import ResizeCanvasPopup from "~/views/DesignEditor/components/Footer/Graphic/ResizeCanvasPopup/ResizeCanvasPopup"
import BaseButton from "../../../../UI/Button/BaseButton"
import UploadImgModal from "~/components/UI/UploadImgModal/UploadImgModal"
import ProductPhotoshootContext from "~/contexts/ProductPhotoshootContext"
import ObjectRemoverContext from "~/contexts/ObjectRemoverContext"
import ObjectReplacerContext from "~/contexts/ObjectReplacerContext"
import ProductPreview from "~/views/DesignEditor/components/Panels/panelItems/ProductPreview/ProductPreview"
import useAppContext from "~/hooks/useAppContext"
import useFabricEditor from "../../../../../../src/hooks/useFabricEditor"
import { OBJECT_REMOVER, OBJECT_REPLACER, PRODUCT_PHOTOSHOOT } from "~/constants/contants"
import ImagesContext from "~/contexts/ImagesCountContext"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"
import { AddObjectFunc } from "~/views/DesignEditor/utils/functions/AddObjectFunc"
import { useEditor, useFrame } from "@layerhub-io/react"

const ModalBasePanel = ({ handleDone, isDoneBtnDisabled, handleClose }: any) => {
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [showCanvasResizePopup, setCanvasResizePopup] = useState(false)
  const { productPhotoshootInfo, setProductPhotoshootInfo } = useContext(ProductPhotoshootContext)
  const { objectRemoverInfo, setObjectRemoverInfo } = useContext(ObjectRemoverContext)
  const { objectReplacerInfo } = useContext(ObjectReplacerContext)

  const { activePanel } = useAppContext()
  const [showPreview, setShowPreview] = useState(false)
  const { fabricEditor, setFabricEditor } = useFabricEditor()
  const { canvas, objects }: any = fabricEditor

  const handleCloseAddPopup = () => {
    setShowAddPopup(false)
    setShowPreview(true)
  }

  const editor = useEditor()
  const frame = useFrame()
  const { setImagesCt } = useContext(ImagesContext)

  // let width = canvas?.getWidth()
  // let height = canvas?.getHeight()

  const handleAddCanvas = async () => {
    // @ts-ignore
    if (activePanel === OBJECT_REMOVER) {
      await getDimensions(objectRemoverInfo.result, (imgSrc: any) => {
        let latest_ct = 0
        setImagesCt((prev: any) => {
          latest_ct = prev + 1
          return prev + 1
        })
        AddObjectFunc(objectRemoverInfo.result, editor, imgSrc.width, imgSrc.height, frame, latest_ct)
        handleClose()
      })
      // @ts-ignore
    } else if(activePanel=== OBJECT_REPLACER) {
      await getDimensions(objectReplacerInfo.result[objectReplacerInfo.activeResult], (imgSrc: any) => {
        let latest_ct = 0
        setImagesCt((prev: any) => {
          latest_ct = prev + 1
          return prev + 1
        })

        console.log(objectReplacerInfo.result[objectReplacerInfo.activeResult])
        AddObjectFunc(
          objectReplacerInfo.result[objectReplacerInfo.activeResult],
          editor,
          imgSrc.width,
          imgSrc.height,
          frame,
          latest_ct
        )
        handleClose()
      })
      // @ts-ignore
    }else if(activePanel===PRODUCT_PHOTOSHOOT){
      await getDimensions(productPhotoshootInfo.finalImage, (imgSrc: any) => {
        let latest_ct = 0
        setImagesCt((prev: any) => {
          latest_ct = prev + 1
          return prev + 1
        })
        AddObjectFunc(productPhotoshootInfo.finalImage, editor, imgSrc.width, imgSrc.height, frame, latest_ct)
        handleClose()
      })
    }
  }
  
  const closeProductPreview = () => {
    setShowPreview(false)
  }
  // @ts-ignore

  const isDone =
    // @ts-ignore
    activePanel === OBJECT_REMOVER
      && objectRemoverInfo.result
        ? true
        : false
        // @ts-ignore
      || activePanel === OBJECT_REPLACER && objectReplacerInfo.result
      ? true
      : false
      // @ts-ignore
      || activePanel === PRODUCT_PHOTOSHOOT && productPhotoshootInfo.finalImage ? true :false

  return (
    <div>
      <Block className={clsx(classes.basePanel)}>
        {activePanel == ("ProductPhotoshoot" as any) && (
          <>
            <div
              className="p-relative addPopupBtn"
              style={{
                cursor: productPhotoshootInfo.result.length == 0 ? "not-allowed" : "",
              }}
            >
              <button
                className={classes.basePanelBtn}
                style={{
                  backgroundColor: productPhotoshootInfo.result.length == 0 ? "#6729f3" : "#F1F1F5",
                  color: productPhotoshootInfo.result.length == 0 ? "#FFF" : "#92929D",
                  pointerEvents: productPhotoshootInfo.result.length == 0 ? "auto" : "none",
                }}
                onClick={() => {
                  setShowAddPopup(true)
                }}
              >
                <span className="d-flex align-items-center">
                  <span className="pr-1">
                    <Icons.Plus size={16} color={productPhotoshootInfo.result.length == 0 ? "#FAFAFB" : "#92929D"} />
                  </span>
                  Add
                  <span className="pl-3">
                    <Icons.ArrowDown size={14} color={productPhotoshootInfo.result.length == 0 ? "#FFF" : "#92929D"} />
                  </span>
                </span>
              </button>
              <UploadImgModal
                fileInputType="productAdd"
                isOpen={showAddPopup}
                handleClose={handleCloseAddPopup}
                id={"ProductAddPopup"}
              />
              <ProductPreview
                isOpen={productPhotoshootInfo.addPreview && showPreview}
                onClose={closeProductPreview}
                imageUrl={productPhotoshootInfo.addPreview}
              />
            </div>
            <Block
              className="flex-center pointer p-relative resizeCanvasBtn"
              onMouseOver={() => {
                setCanvasResizePopup(true)
              }}
            >
              <Icons.CanvasResize size={24} />
              <ResizeCanvasPopup show={showCanvasResizePopup} />
            </Block>
          </>
        )}
        <div className="flex-1"></div>

        <Block className="d-flex justify-content-end align-items-center mr-1 pointer">
          <Block
            className={classes.canvasOptions}
            onClick={() => {
              // @ts-ignore
              if (objects?.length >= 2) {
                // @ts-ignore
                canvas.undo()
              }
            }}
          >
            <Icons.Undo size={22} />
          </Block>
          <Block
            className={classes.canvasOptions}
            onClick={() => {
              // @ts-ignore
              canvas.redo()
            }}
          >
            <Icons.Redo size={22} />
          </Block>
          <BaseButton
            title="Done"
            disabled={isDone ? false : true}
            fontSize="0.75rem"
            padding="15px"
            borderRadius="10px"
            fontFamily="poppins"
            height="2.375rem"
            width="7.5rem;"
            margin="0px 0.75rem"
            handleClick={() => {
              !isDoneBtnDisabled || objectRemoverInfo.result || objectReplacerInfo.result || productPhotoshootInfo.finalImage ? handleAddCanvas() : null
            }}
          />
        </Block>
      </Block>
    </div>
  )
}

export default ModalBasePanel

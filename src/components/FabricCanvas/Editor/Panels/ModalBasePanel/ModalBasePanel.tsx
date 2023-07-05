import { Block } from "baseui/block"
import clsx from "clsx"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import AddPopup from "~/views/DesignEditor/components/Footer/Graphic/AddPopup/AddPopup"
import { useContext, useEffect, useState } from "react"
import ResizeCanvasPopup from "~/views/DesignEditor/components/Footer/Graphic/ResizeCanvasPopup/ResizeCanvasPopup"
import BaseButton from "../../../../UI/Button/BaseButton"
import useFabricEditor from "../../../../../../src/hooks/useFabricEditor"
import { AddObjectFunc } from "~/views/DesignEditor/utils/functions/AddObjectFunc"
import ObjectRemoverContext from "~/contexts/ObjectRemoverContext"
import { useEditor, useFrame } from "@layerhub-io/react"
import ImagesContext from "~/contexts/ImagesCountContext"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"
import useAppContext from "~/hooks/useAppContext"
import { OBJECT_REMOVER } from "~/constants/contants"

const ModalBasePanel = ({ handleClose, isDoneBtnDisabled }: any) => {
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [showCanvasResizePopup, setCanvasResizePopup] = useState(false)
  const { objectRemoverInfo, setObjectRemoverInfo } = useContext(ObjectRemoverContext)
  const editor = useEditor()

  const handleCloseAddPopup = () => {
    setShowAddPopup(false)
  }
  const frame = useFrame()

  const { setImagesCt } = useContext(ImagesContext)
 
  const { fabricEditor, setFabricEditor } = useFabricEditor()

  const { canvas, objects } = fabricEditor
  const { activePanel } = useAppContext()
  // let width = canvas?.getWidth()
  // let height = canvas?.getHeight()

  const handleAddCanvas = async () => {
    await getDimensions(objectRemoverInfo.result, (imgSrc: any) => {
      let latest_ct = 0
      setImagesCt((prev: any) => {
        latest_ct = prev + 1
        return prev + 1
      })
      AddObjectFunc(objectRemoverInfo.result, editor, imgSrc.width, imgSrc.height, frame, latest_ct)
      handleClose()
    })
  }

  return (
    <div>
      <Block className={clsx(classes.basePanel)}>
        {/* @ts-ignore  */}
        {activePanel != OBJECT_REMOVER && (
          <>
            <div className="p-relative addPopupBtn">
              <button
                className={classes.basePanelBtn}
                onMouseOver={() => {
                  setShowAddPopup(true)
                }}
              >
                <span className="d-flex align-items-center">
                  <span className="pr-1">
                    <Icons.Plus size={16} />
                  </span>
                  Add
                  <span className="pl-3">
                    <Icons.ArrowDown size={14} />
                  </span>
                </span>
              </button>
              <AddPopup showPopup={showAddPopup} handleClose={handleCloseAddPopup} />
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


   {/* img zoom in zoom out  */}
        {/* <input
          type="range"
          min={1}
          max={1.5}
          defaultValue={0}
          step={0.1}
          onChange={(e) => {
            // const zoomMin = 10
            // const zoomMax = 240
            // let parsedValue = parseFloat(e.target.value)

            // if (parsedValue < 0) {
            //   canvas.setZoom(zoomMin / 100)
            // } else if (parsedValue > zoomMax) {
            //   canvas.setZoom(zoomMax / 100)
            // } else {
            //   canvas.setZoom(parsedValue / 100)
            // }

            // let width=canvas.getWidth();
            // let height=canvas.getHeight();

            // console.log(width,height)
            //  console.log(e.target.value)
            //  let val=e.target.value;
            // canvas.setDimensions({
            //   width: width * val,
            //   height: height * val,
            // })
            let bg=canvas.getObjects()[0];

            canvas.setZoom(1);
            canvas.setDimensions({
              width:width,
              height:height
            })
            bg.scale(1)
            bg.center()
            canvas.setZoom(e.target.value)
            canvas.setDimensions({
              width: width * e.target.value,
              height: height * e.target.value,
            })
            bg.scale(e.target.value)
            bg.center()

            // canvas.setDimensions({ width: newWidth, height: newHeight });
          }}
        /> */}
        <div className="flex-1"></div>

        <Block className="d-flex justify-content-end align-items-center mr-1 pointer">
          <Block
            className={classes.canvasOptions}
            onClick={() => {
              if (objects?.length >= 2) {
                canvas.undo()
              }
            }}
          >
            <Icons.Undo size={22} />
          </Block>
          <Block
            className={classes.canvasOptions}
            onClick={() => {
              canvas.redo()
            }}
          >
            <Icons.Redo size={22} />
          </Block>
          <BaseButton
            title="Done"
            disabled={objectRemoverInfo.result ? false : true}
            fontSize="0.75rem"
            padding="15px"
            borderRadius="10px"
            fontFamily="poppins"
            height="2.375rem"
            width="7.5rem;"
            margin="0px 0.75rem"
            handleClick={!isDoneBtnDisabled ? handleAddCanvas : null}
          />
        </Block>
      </Block>
    </div>
  )
}

export default ModalBasePanel

import { Block } from "baseui/block"
import clsx from "clsx"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import AddPopup from "~/views/DesignEditor/components/Footer/Graphic/AddPopup/AddPopup"
import { useState } from "react"
import ResizeCanvasPopup from "~/views/DesignEditor/components/Footer/Graphic/ResizeCanvasPopup/ResizeCanvasPopup"
import BaseButton from "../../../../UI/Button/BaseButton"
import useFabricEditor from "../../../../../../src/hooks/useFabricEditor"

const ModalBasePanel = ({ handleClose, isDoneBtnDisabled }: any) => {
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [showCanvasResizePopup, setCanvasResizePopup] = useState(false)

  const handleCloseAddPopup = () => {
    setShowAddPopup(false)
  }

  const { fabricEditor, setFabricEditor } = useFabricEditor()

  const { canvas, objects } = fabricEditor

  const handleAddCanvas = () => {
    console.log(canvas.toDataURL())
  }
  return (
    <div>
      <Block className={clsx(classes.basePanel)}>
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
        <div className="flex-1"></div>

        <Block className="d-flex justify-content-end align-items-center mr-1 pointer">
          <Block
            className={classes.canvasOptions}
            onClick={() => {
              if (objects?.length >= 3) {
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
            disabled={isDoneBtnDisabled ? true : false}
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

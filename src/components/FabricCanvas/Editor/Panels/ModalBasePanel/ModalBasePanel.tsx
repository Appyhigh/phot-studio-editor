import { Block } from "baseui/block"
import clsx from "clsx"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import AddPopup from "~/views/DesignEditor/components/Footer/Graphic/AddPopup/AddPopup"
import { useContext, useState } from "react"
import ResizeCanvasPopup from "~/views/DesignEditor/components/Footer/Graphic/ResizeCanvasPopup/ResizeCanvasPopup"
import BaseButton from "../../../../UI/Button/BaseButton"
import UploadImgModal from "~/components/UI/UploadImgModal/UploadImgModal"
import ProductPhotoshootContext from "~/contexts/ProductPhotoshootContext"
import ProductPreview from "~/views/DesignEditor/components/Panels/panelItems/ProductPreview/ProductPreview"
import useAppContext from "~/hooks/useAppContext"

const ModalBasePanel = ({ handleDone, isDoneBtnDisabled }: any) => {
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [showCanvasResizePopup, setCanvasResizePopup] = useState(false)
  const { productPhotoshootInfo, setProductPhotoshootInfo } = useContext(ProductPhotoshootContext)
  const { activePanel } = useAppContext()

  const handleCloseAddPopup = () => {
    setShowAddPopup(false)
  }

  const closeProductPreview = () => {
    setProductPhotoshootInfo((prev: any) => ({
      ...prev,
      addPreview: "",
    }))
  }

  return (
    <div>
      <Block className={clsx(classes.basePanel)}>
        {activePanel == ("ProductPhotoshoot" as any) && (
          <div className="p-relative addPopupBtn">
            <button
              className={classes.basePanelBtn}
              onClick={() => {
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
            <UploadImgModal
              fileInputType="productAdd"
              isOpen={showAddPopup}
              handleClose={handleCloseAddPopup}
              id={"ProductAddPopup"}
            />
            <ProductPreview
              isOpen={productPhotoshootInfo.addPreview}
              onClose={closeProductPreview}
              imageUrl={productPhotoshootInfo.addPreview}
            />
          </div>
        )}
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
          <Block className={classes.canvasOptions} onClick={() => {}}>
            <Icons.Undo size={22} />
          </Block>
          <Block className={classes.canvasOptions} onClick={() => {}}>
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
            handleClick={!isDoneBtnDisabled ? handleDone : null}
          />
        </Block>
      </Block>
    </div>
  )
}

export default ModalBasePanel

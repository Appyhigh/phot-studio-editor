import BaseButton from "~/components/UI/Button/BaseButton"
import classes from "./style.module.css"
import { useCoreHandler } from "~/components/FabricCanvas/Canvas/handlers"
import { Modal } from "baseui/modal"
import ProductPhotoshootContext from "~/contexts/ProductPhotoshootContext"
import { useContext } from "react"

const ProductPreview = ({ isOpen, onClose, imageUrl }: any) => {
  const { addImage } = useCoreHandler()
  const { setProductPhotoshootInfo } = useContext(ProductPhotoshootContext)

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
            top: "8.25rem",
            left: "31.5rem",
          }),
        },
      }}
      onClose={onClose}
      isOpen={isOpen}
    >
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
              onClose()
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
              onClose()
              setProductPhotoshootInfo((prev: any) => ({ ...prev, removeBg: true }))
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

export default ProductPreview

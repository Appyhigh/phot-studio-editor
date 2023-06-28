import { Modal, SIZE } from "baseui/modal"
import Editor from "../Editor"
import classes from "./style.module.css"
import Icons from "~/components/Icons"

const FabricCanvasModal = ({ isOpen, handleClose }: any) => {
  return (
    <Modal
      animate
      autoFocus
      size={SIZE.auto}
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            zIndex: 500,
            margin: "4.3rem 0rem 0rem 6rem",
          }),
        },
        Close: {
          style: ({ $theme }) => ({
            outline: `transparent`,
            display: "none",
          }),
        },
        Dialog: {
          style: ({ $theme }) => ({
            backgroundColor: $theme.colors.white,
            width: "100%",
            height: "100%",
            margin: "1rem 2rem",
          }),
        },
      }}
      onClose={handleClose}
      isOpen={isOpen}
    >
      <Editor handleClose={handleClose} />
    </Modal>
  )
}

export default FabricCanvasModal

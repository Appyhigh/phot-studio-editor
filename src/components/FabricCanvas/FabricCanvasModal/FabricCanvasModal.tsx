import { Modal, SIZE } from "baseui/modal"
import Editor from "../Editor"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import useAppContext from "~/hooks/useAppContext"
import ProductPhotoshootEditor from "../Editor/ProductPhotoshootEditor"

const FabricCanvasModal = ({ isOpen, handleClose }: any) => {
  const { activePanel } = useAppContext()
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
      {activePanel === ("ProductPhotoshoot" as any) && <ProductPhotoshootEditor handleClose={handleClose} />}
      {/* <Editor handleClose={handleClose} /> */}
    </Modal>
  )
}

export default FabricCanvasModal

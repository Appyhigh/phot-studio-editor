import { Modal, SIZE } from "baseui/modal"
import useAppContext from "~/hooks/useAppContext"
import ModalToolItems from "../../ModalToolsEditor"
import ObjectReplacerEditor from "~/components/ModalToolsEditor/ObjectReplacerEditor/ObjectReplacerEditor"
const FabricCanvasModal = ({ isOpen, handleClose }: any) => {
  const { activePanel } = useAppContext()

  // @ts-ignore
  const Component = ModalToolItems[activePanel]
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
            backgroundColor: "#F1F1F5",
            width: "100%",
            height: "100%",
            margin: "1rem 2rem",
          }),
        },
      }}
      // onClose={handleClose}
      isOpen={isOpen}
    >
      {Component && <Component handleClose={handleClose}  />}
      {/* <ObjectReplacerEditor/> */}
    </Modal>
  )
}

export default FabricCanvasModal

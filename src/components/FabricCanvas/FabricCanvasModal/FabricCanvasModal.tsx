import { Modal, SIZE } from "baseui/modal"
import Editor from "../Editor"

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
          }),
        },
        Close: {
          style: ({ $theme }) => ({
            outline: `transparent`,
          }),
        },
        Dialog: {
          style: ({ $theme }) => ({
            backgroundColor: $theme.colors.white,
          
          }),
        },
      }}
      onClose={handleClose}
      isOpen={isOpen}
    >
      <Editor />
    </Modal>
  )
}

export default FabricCanvasModal

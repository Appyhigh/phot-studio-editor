import { Modal, SIZE } from "baseui/modal"
import Editor from "../Editor"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import useAppContext from "~/hooks/useAppContext"
import ProductPhotoshootEditor from "../Editor/ProductPhotoshootEditor"
import ErrorContext from "~/contexts/ErrorContext"
import Toast from "~/components/Toast/Toast"
import { useContext } from "react"

const FabricCanvasModal = ({ isOpen, handleClose }: any) => {
  const { activePanel } = useAppContext()
  const { errorInfo } = useContext(ErrorContext)

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
      {errorInfo.showError && (
        <Toast
          style={{ width: "40%", position: "absolute", bottom: "1rem", left: "30%" }}
          type="error"
          message={errorInfo.errorMsg}
          clickHandler={() => {
            errorInfo.retryFn()
          }}
        />
      )}
    </Modal>
  )
}

export default FabricCanvasModal

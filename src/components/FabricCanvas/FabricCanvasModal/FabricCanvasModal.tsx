import { Modal, SIZE } from "baseui/modal"

import useAppContext from "~/hooks/useAppContext"
import ModalToolItems from "../../ModalToolsEditor"
import ProductPhotoshootEditor from "../Editor/Panels/ProductPhotoshootEditor/ProductPhotoshootEditor"
import ErrorContext from "~/contexts/ErrorContext"
import Toast from "~/components/Toast/Toast"
import { useContext } from "react"

const FabricCanvasModal = ({ isOpen, handleClose }: any) => {
  const { activePanel } = useAppContext()
  // @ts-ignore
  const Component = ModalToolItems[activePanel]
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
            backgroundColor: "#F1F1F5",
            width: "100%",
            height: "85vh",
            margin: "1rem 2rem",
          }),
        },
      }}
      // onClose={handleClose}
      isOpen={isOpen}
    >
      {activePanel === ("ProductPhotoshoot" as any) && <ProductPhotoshootEditor handleClose={handleClose} />}
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
      {Component && <Component handleClose={handleClose} />}
      {/* <ObjectReplacerEditor/> */}
    </Modal>
  )
}

export default FabricCanvasModal

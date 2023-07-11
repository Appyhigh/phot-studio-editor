import { Modal, SIZE } from "baseui/modal"

import useAppContext from "~/hooks/useAppContext"
import ModalToolItems from "../../ModalToolsEditor"
import ProductPhotoshootEditor from "~/components/ModalToolsEditor/ProductPhotoshootEditor/ProductPhotoshootEditor"
import ErrorContext from "~/contexts/ErrorContext"
import Toast from "~/components/Toast/Toast"
import { useContext, useEffect, useState } from "react"
import LoginPopup from "~/views/DesignEditor/components/LoginPopup/LoginPopup"
import { useAuth } from "~/hooks/useAuth"

const FabricCanvasModal = ({ isOpen, handleClose }: any) => {
  const { activePanel } = useAppContext()
  // @ts-ignore
  const Component = ModalToolItems[activePanel]
  const { errorInfo } = useContext(ErrorContext)
  const { authState, setAuthState }:any = useAuth()
  const { showLoginPopUp } = authState

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
            height: "80vh",
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
      <LoginPopup isOpen={showLoginPopUp} loginPopupCloseHandler={() => setAuthState((prev:any) => ({...prev, showLoginPopUp: false})) }  /> 
    </Modal>
  )
}

export default FabricCanvasModal

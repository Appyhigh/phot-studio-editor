import { Modal } from "baseui/modal"
import classes from "./style.module.css"
import { useContext } from "react"
import LoaderContext from "~/contexts/LoaderContext"
import clsx from "clsx"
import LoaderSpinner from "../../../views/Public/images/loader-spinner.svg"

const Loader = ({ isOpen, handleClose }: any) => {
  const { loaderPopup } = useContext(LoaderContext)

  const close = () => {
    handleClose()
  }

  return loaderPopup.showPopup ? (
    <Modal
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            zIndex: 500,
          }),
        },
        Close: {
          style: ({ $theme }) => ({
            outline: `transparent`,
            margin: "40px 20px",
            display: "none",
          }),
        },
        Dialog: {
          style: ({ $theme }) => ({
            backgroundColor: $theme.colors.white,
            width: "229px",
            height: "217px",
          }),
        },
      }}
      onClose={close}
      isOpen={isOpen}
    >
      <div className="flex-center">
        <img src={LoaderSpinner} />
      </div>
    </Modal>
  ) : null
}

export default Loader

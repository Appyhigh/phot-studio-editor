import { Modal } from "baseui/modal"
import { useContext } from "react"
import LoaderContext from "~/contexts/LoaderContext"
import LoaderSpinner from "../../../views/Public/images/loader-spinner.svg"

const Loader = ({ isOpen }: any) => {
  const { loaderPopup } = useContext(LoaderContext)

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
      isOpen={isOpen}
    >
      <div className="flex-center">
        <img src={LoaderSpinner} />
      </div>
    </Modal>
  ) : null
}

export default Loader

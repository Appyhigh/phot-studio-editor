import { Modal } from "baseui/modal"
import classes from "./style.module.css"
import { useContext, useState } from "react"
import { useActiveObject } from "@layerhub-io/react"
import MainImageContext from "~/contexts/MainImageContext"
import FileError from "../Common/FileError/FileError"
import LoaderSpinner from "../../../views/Public/images/loader-spinner.svg"
import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import clsx from "clsx"
import UppyDashboard from "../UploadInput/UppyDashboard"

const UploadImgModal = ({ isOpen, handleClose, fileInputType, activeOb, id }: any) => {
  const { mainImgInfo, setMainImgInfo, setPanelInfo } = useContext(MainImageContext)
  const [rejectedFileUpload, setRejectedFileUpload] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const activeObject: any = useActiveObject()
  const [addImgInfo, setAddImgInfo] = useState({
    showPreview: false,
    url: "",
  })

  const close = () => {
    if (!imageLoading) {
      setAddImgInfo((prev) => ({ ...prev, showPreview: false, url: "" }))
      setRejectedFileUpload(false)
      setImageLoading(false)
      handleClose()
    }
  }

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
            outline: `transparent`,
            margin: fileInputType === "add" || "productAdd" ? "20px" : "40px 20px",
            pointerEvents: imageLoading ? "none" : "auto",
            display: imageLoading ? "none" : "block",
          }),
        },
        Dialog: {
          style: ({ $theme }) => ({
            backgroundColor: $theme.colors.white,
            width: "550px",
            position: fileInputType === "productAdd" ? "absolute":"relative",
            top: fileInputType === "productAdd" ? "7.75rem":"0rem",
            left: fileInputType === "productAdd" ?"31.25rem":"0rem",
            boxShadow: fileInputType === "productAdd" ? "0px 0px 20px 0px rgba(0, 0, 0, 0.05)":"0px",
          }),
        },
        DialogContainer: {
          style: ({ $theme }) => ({
            backgroundColor: "rgba(0,0,0,0)",
          }),
        },
      }}
      onClose={close}
      isOpen={isOpen}
    >
      <div className={classes.modal}>
        {!addImgInfo.showPreview && !imageLoading && !rejectedFileUpload && (
          <>
            <div className={classes.modalHeader}>
              {fileInputType === "update"
                ? "Update Image"
                : fileInputType === "bgupdate"
                ? "Update background"
                : "Add Image"}
            </div>
            <div className={classes.uploadInput}>
              <UppyDashboard
                close={close}
                setImageLoading={setImageLoading}
                setAddImgInfo={setAddImgInfo}
                fileInputType={fileInputType}
                mainImgInfo={mainImgInfo}
                setMainImgInfo={setMainImgInfo}
                setPanelInfo={setPanelInfo}
                activeOb={activeOb}
                activeObject={activeObject}
                id={id}
              />
            </div>
          </>
        )}
        {imageLoading && !rejectedFileUpload && (
          <Block
            className={clsx(
              "d-flex justify-content-center align-items-center flex-column pointer p-relative p-2 m-2 mt-6 ",
              classes.uploadInput
            )}
          >
            <Block className={classes.uploadInputContainer}>
              <Icons.InputContainer width={500} height={300} />
            </Block>
            <div className={classes.loadingSpinner}>
              {<img className={classes.stockImagesLoader} src={LoaderSpinner} />}{" "}
            </div>
          </Block>
        )}
      </div>

      {rejectedFileUpload && (
        <FileError
          handleTry={() => {
            setRejectedFileUpload(false)
          }}
        />
      )}
    </Modal>
  )
}

export default UploadImgModal

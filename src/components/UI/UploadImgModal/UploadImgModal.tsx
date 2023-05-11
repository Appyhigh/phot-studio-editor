import { Modal, ModalBody, ModalButton, ModalFooter, ModalHeader } from "baseui/modal"
import classes from "./style.module.css"
import React from "react"
import UploadInput from "../UploadInput/UploadInput"
import DropZone from "~/components/Dropzone"
import { useEditor } from "@layerhub-io/react"
import { toBase64 } from "~/utils/data"
import { nanoid } from "nanoid"
import { backgroundLayerType } from "~/constants/contants"

const UploadImgModal = ({ isOpen, handleClose }: any) => {
  const close = () => {
    handleClose()
  }

  const inputNextFile = React.useRef<HTMLInputElement>(null)
  const editor = useEditor()

  const handleDropFiles = async (files: FileList) => {
    const file = files[0]
    const isVideo = file.type.includes("video")
    const base64 = (await toBase64(file)) as string
    let preview = base64

    const type = isVideo ? "StaticVideo" : "StaticImage"
    close()

    const upload = {
      id: nanoid(),
      src: base64,
      preview: preview,
      type: type,
      metadata: { generationDate: new Date().getTime() },
    }

    editor.objects.add(upload).then(() => {
      const fileInfo: any = document.getElementById("inputBgFile")
      if (fileInfo.value) fileInfo.value = ""
    })
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }

  const handleInputFileRefClick = () => {
    inputNextFile.current?.click()
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
            margin: "40px 20px",
          }),
        },
        Dialog: {
          style: ({ $theme }) => ({
            backgroundColor: $theme.colors.white,
            width: "600px",
            height: "514px",
          }),
        },
      }}
      onClose={close}
      isOpen={isOpen}
    >
      <div className={classes.modal}>
        <div className={classes.modalHeader}>Add Image</div>
        <DropZone handleDropFiles={handleDropFiles}>
          <div className={classes.uploadInput}>
            <UploadInput type="modal" handleInputFileRefClick={handleInputFileRefClick} width={514} height={319} />
            <input
              onChange={handleFileInput}
              type="file"
              id="inputNextFile"
              ref={inputNextFile}
              className={classes.inputFile}
            />
          </div>
        </DropZone>{" "}
      </div>
    </Modal>
  )
}

export default UploadImgModal

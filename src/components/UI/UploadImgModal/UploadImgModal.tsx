import { Modal } from "baseui/modal"
import classes from "./style.module.css"
import React from "react"
import UploadInput from "../UploadInput/UploadInput"
import DropZone from "~/components/Dropzone"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { toBase64 } from "~/utils/data"
import { nanoid } from "nanoid"

const UploadImgModal = ({ isOpen, handleClose, fileInputType, activeOb }: any) => {
  const close = () => {
    handleClose()
  }

  const inputNextFile = React.useRef<HTMLInputElement>(null)
  const inputReplaceFile = React.useRef<HTMLInputElement>(null)

  const editor = useEditor()
  const activeObject = useActiveObject()

  const handleDropFiles = async (files: FileList) => {
    const file = files[0]

    const isVideo = file.type.includes("video")
    const base64 = (await toBase64(file)) as string
    let preview = base64
    const inputType = isVideo ? "StaticVideo" : "StaticImage"
    setTimeout(() => {
      close()
    }, 100)
    if (fileInputType === "add") {
      const upload = {
        id: nanoid(),
        src: base64,
        preview: preview,
        type: inputType,
        metadata: { generationDate: new Date().getTime() },
      }

      editor.objects.add(upload).then(() => {
        const fileInfo: any = document.getElementById("inputNextFile")
        if (fileInfo.value) fileInfo.value = ""
      })
    } else {
      let topPosition = activeOb?.top
      let leftPosition = activeOb?.left

      const upload = {
        src: preview,
        id: nanoid(),
        preview: preview,
        type: inputType,
        metadata: { generationDate: new Date().getTime() },
      }
      // to replace the object removing the previous active object first
      editor.objects.remove(activeObject?.id)
      editor.objects.add(upload)

      setTimeout(() => {
        editor?.objects.update({ top: topPosition + 280, left: leftPosition + 30 })
      }, 20)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }

  const handleInputFileRefClick = () => {
    if (fileInputType === "update") inputReplaceFile.current?.click()
    else inputNextFile.current?.click()
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
        <div className={classes.modalHeader}>{fileInputType === "update" ? "Update " : "Add "}Image</div>
        <DropZone handleDropFiles={handleDropFiles}>
          <div className={classes.uploadInput}>
            <UploadInput type="modal" handleInputFileRefClick={handleInputFileRefClick} width={514} height={319} />
            <input
              onChange={handleFileInput}
              type="file"
              id={fileInputType === "update" ? "inputReplace" : "inputNextFile"}
              ref={fileInputType === "update" ? inputReplaceFile : inputNextFile}
              className={classes.inputFile}
            />
          </div>
        </DropZone>{" "}
      </div>
    </Modal>
  )
}

export default UploadImgModal

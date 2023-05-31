import { Modal } from "baseui/modal"
import classes from "./style.module.css"
import React, { useContext, useEffect, useState } from "react"
import UploadInput from "../UploadInput/UploadInput"
import DropZone from "~/components/Dropzone"
import { useActiveObject, useEditor, useFrame } from "@layerhub-io/react"
import { nanoid } from "nanoid"
import MainImageContext from "~/contexts/MainImageContext"
import { backgroundLayerType, deviceUploadType } from "~/constants/contants"
import { getBucketImageUrlFromFile } from "~/utils/removeBackground"

const UploadImgModal = ({ isOpen, handleClose, fileInputType, activeOb }: any) => {
  const inputNextFile = React.useRef<HTMLInputElement>(null)
  const inputReplaceFile = React.useRef<HTMLInputElement>(null)
  const { mainImgInfo, setMainImgInfo, panelInfo, setPanelInfo } = useContext(MainImageContext)
  const frame = useFrame()
  const editor = useEditor()
  const activeObject = useActiveObject()
  const [addImgInfo, setAddImgInfo] = useState({
    showPreview: false,
    url: "",
  })

  const handleDropFiles = async (files: FileList) => {
    const file = files[0]
    const imageUrl = await getBucketImageUrlFromFile(file)
    const isVideo = file.type.includes("video")
    let preview = imageUrl
    const inputType = isVideo ? "StaticVideo" : "StaticImage"

    if (fileInputType === "add") {
      setAddImgInfo({ showPreview: true, url: imageUrl })
      const fileInfo: any = document.getElementById("inputNextFile")
      if (fileInfo.value) fileInfo.value = ""
    } else if (fileInputType === "bgupdate") {
      const bgObject = editor?.frame?.background?.canvas?._objects.filter(
        (el: any) => el.metadata?.type === backgroundLayerType || el.metadata?.type === deviceUploadType
      )[0]
      editor.frame.resize({ width: frame.width, height: frame.height })

      if (bgObject) {
        editor.frame.resize({ width: frame.width, height: frame.height })
        editor.objects.remove(bgObject.id)
        editor.objects.unsetBackgroundImage()
      }

      editor?.frame?.setBackgroundColor("#FFF")

      const options = {
        type: "BackgroundImage",
        src: imageUrl,
        preview: imageUrl,
        metadata: { generationDate: new Date().getTime(), type: deviceUploadType },
      }
      editor.objects.add(options).then(() => {
        setTimeout(() => {
          editor.objects.setAsBackgroundImage()
        }, 100)
      })
      handleClose()
      setTimeout(() => {
        close()
      }, 100)
    } else {
      let topPosition = activeOb?.top
      let leftPosition = activeOb?.left
      const activeMainObject = editor.objects.findById(mainImgInfo.id)[0]

      const upload = {
        src: preview,
        id: nanoid(),
        preview: preview,
        original: preview,
        type: inputType,
        metadata: { generationDate: new Date().getTime() },
      }
      // to replace the object removing the previous active object first
      if (activeOb.id === activeMainObject?.id) {
        setMainImgInfo((prev: any) => ({ ...prev, ...upload }))
        setPanelInfo((prev: any) => ({ ...prev, uploadPreview: true, bgOptions: false, bgRemoverBtnActive: true }))
      }
      editor.objects.remove(activeObject?.id)
      editor.objects.add(upload)

      setTimeout(() => {
        editor?.objects.update({ top: topPosition + 280, left: leftPosition + 30 })
      }, 20)
      handleClose()
      setTimeout(() => {
        close()
      }, 100)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }

  const close = () => {
    setAddImgInfo((prev) => ({ ...prev, showPreview: false, url: "" }))
    handleClose()
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
            margin: fileInputType === "add" ? "20px" : "40px 20px",
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
        {!addImgInfo.showPreview && (
          <>
            <div className={classes.modalHeader}>
              {fileInputType === "update"
                ? "Update Image"
                : fileInputType === "bgupdate"
                ? "Update background"
                : "Add  Image"}
            </div>
            <DropZone handleDropFiles={handleDropFiles}>
              <div className={classes.uploadInput}>
                <UploadInput type="modal" handleInputFileRefClick={handleInputFileRefClick} width={514} height={319} />
                <input
                  onChange={handleFileInput}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/bmp"
                  id={fileInputType === "update" ? "inputReplace" : "inputNextFile"}
                  ref={fileInputType === "update" ? inputReplaceFile : inputNextFile}
                  className={classes.inputFile}
                />
              </div>
            </DropZone>
          </>
        )}
      </div>
      {fileInputType == "add" && addImgInfo.showPreview && addImgInfo.url && (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div>
            <img className={classes.addImgPreview} src={addImgInfo.url} alt="preview" />
          </div>
          <div>
            <button
              onClick={() => {
                const upload = {
                  id: nanoid(),
                  src: addImgInfo.url,
                  preview: addImgInfo.url,
                  metadata: { generationDate: new Date().getTime() },
                  type: "StaticImage",
                }
                editor.objects.add(upload).then(() => {
                  handleClose()
                  setAddImgInfo((prev) => ({ ...prev, showPreview: false, url: "" }))
                })
              }}
              className={classes.addImgBtn}
            >
              Add Image
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default UploadImgModal

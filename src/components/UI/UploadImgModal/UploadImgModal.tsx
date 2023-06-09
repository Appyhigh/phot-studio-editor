import { Modal } from "baseui/modal"
import classes from "./style.module.css"
import React, { useContext, useState } from "react"
import UploadInput from "../UploadInput/UploadInput"
import DropZone from "~/components/Dropzone"
import { useActiveObject, useEditor, useFrame } from "@layerhub-io/react"
import { nanoid } from "nanoid"
import MainImageContext from "~/contexts/MainImageContext"
import { backgroundLayerType, deviceUploadType } from "~/constants/contants"
import { getBucketImageUrlFromFile } from "~/utils/removeBackground"
import FileError from "../Common/FileError/FileError"
import LoaderSpinner from "../../../views/Public/images/loader-spinner.svg"
import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import clsx from "clsx"
import ImagesContext from "~/contexts/ImagesCountContext"

const UploadImgModal = ({ isOpen, handleClose, fileInputType, activeOb }: any) => {
  const inputNextFile = React.useRef<HTMLInputElement>(null)
  const inputReplaceFile = React.useRef<HTMLInputElement>(null)
  const { mainImgInfo, setMainImgInfo, panelInfo, setPanelInfo } = useContext(MainImageContext)
  const [rejectedFileUpload, setRejectedFileUpload] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)

  const frame = useFrame()
  const editor = useEditor()
  const activeObject = useActiveObject()
  const [addImgInfo, setAddImgInfo] = useState({
    showPreview: false,
    url: "",
  })

  const handleDropFiles = async (files: FileList) => {
    setImageLoading(true)
    const file = files[0]
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/bmp" ||
      file.type === "image/webp"
    ) {
      setRejectedFileUpload(false)
    } else {
      setRejectedFileUpload(true)
      setImageLoading(false)

      return
    }
    const imageUrl = await getBucketImageUrlFromFile(file)

    if (imageUrl) {
      setImageLoading(false)
      setAddImgInfo({ showPreview: true, url: imageUrl })
      if (fileInputType === "add") {
        addImage(imageUrl)
      } else if (fileInputType === "bgupdate") {
        updateBackground(imageUrl)
      } else {
        updateImage(imageUrl)
      }
      setTimeout(() => {
        close()
      }, 200)
    }

    const fileInfo: any = document.getElementById("inputNextFile")
    if (fileInfo.value) fileInfo.value = ""
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageLoading(true)
    handleDropFiles(e.target.files!)
  }

  const close = () => {
    if (!imageLoading) {
      setAddImgInfo((prev) => ({ ...prev, showPreview: false, url: "" }))
      setRejectedFileUpload(false)
      setImageLoading(false)
      handleClose()
    }
  }

  const handleInputFileRefClick = () => {
    if (fileInputType === "update") inputReplaceFile.current?.click()
    else inputNextFile.current?.click()
  }

  const updateBackground = (imageUrl: string) => {
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
  }

  const updateImage = (imageUrl: string) => {
    const inputType = "StaticImage"

    let topPosition = activeOb?.top
    let leftPosition = activeOb?.left
    const activeMainObject = editor.objects.findById(mainImgInfo.id)[0]
    let preview = imageUrl
    const upload = {
      src: preview,
      id: nanoid(),
      preview: preview,
      original: preview,
      type: inputType,
      name: activeOb.name,
      metadata: { generationDate: new Date().getTime() },
    }
    // to replace the object removing the previous active object first
    if (activeOb.id === mainImgInfo?.id) {
      setMainImgInfo((prev: any) => ({ ...prev, ...upload }))
      setPanelInfo((prev: any) => ({ ...prev, uploadPreview: true, bgOptions: false, bgRemoverBtnActive: true }))
    }
    editor.objects.remove(activeObject?.id)
    editor.objects.add(upload)

    setTimeout(() => {
      editor?.objects.update({ top: topPosition + 280, left: leftPosition + 30 })
    }, 20)
  }
  const { setImagesCt } = useContext(ImagesContext)

  const addImage = (imageUrl: string) => {
    let latest_ct = 0
    setImagesCt((prev: any) => {
      latest_ct = prev + 1
      const upload = {
        id: nanoid(),
        src: imageUrl,
        preview: imageUrl,
        metadata: { generationDate: new Date().getTime() },
        type: "StaticImage",
        name: latest_ct.toString(),
      }
      editor.objects.add(upload).then(() => {
        setRejectedFileUpload(false)
        setAddImgInfo((prev) => ({ ...prev, showPreview: false, url: "" }))
      })
      return prev + 1
    })
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
            pointerEvents: imageLoading ? "none" : "auto",
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
        {!addImgInfo.showPreview && !imageLoading && !rejectedFileUpload && (
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
        {imageLoading && !rejectedFileUpload && (
          <Block
            className={clsx("d-flex justify-content-center flex-column pointer p-relative mt-6", classes.uploadInput)}
          >
            <Block className={classes.uploadInputContainer}>
              <Icons.InputContainer width={514} height={319} />
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

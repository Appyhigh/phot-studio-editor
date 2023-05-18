import React from "react"
import { Block } from "baseui/block"
import DropZone from "~/components/Dropzone"
import { useEditor } from "@layerhub-io/react"
import { nanoid } from "nanoid"
import { captureFrame, loadVideoResource } from "~/utils/video"
import { toBase64 } from "~/utils/data"
import UploadInput from "~/components/UI/UploadInput/UploadInput"
import UploadPreview from "../UploadPreview/UploadPreview"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"

export default function ({
  handleCloseSampleImg,
  handleCloseBgOptions,
  handleOpenBgOptions,
  removeBgBtn,
  disableRemoveBgBtn,
  activeRemoveBgBtn,
}: any) {
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const [uploads, setUploads] = React.useState<any[]>([])
  const editor = useEditor()
  const [selectedImage, setSelectedImage] = React.useState<any>(null)

  const handleDropFiles = async (files: FileList) => {
    const file = files[0]
    handleCloseSampleImg()
    const isVideo = file.type.includes("video")
    const base64 = (await toBase64(file)) as string
    let preview = base64
    if (isVideo) {
      const video = await loadVideoResource(base64)
      const frame = await captureFrame(video)
      preview = frame
    }

    const type = isVideo ? "StaticVideo" : "StaticImage"
    activeRemoveBgBtn()
    const upload = {
      id: nanoid(),
      src: base64,
      preview: preview,
      type: type,
      metadata: { generationDate: new Date().getTime() },
    }

    setUploads([...uploads, upload])
    setSelectedImage(upload)
    const fileInfo: any = document.getElementById("inputFile")
    if (fileInfo.value) fileInfo.value = ""
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }

  const discardHandler = (id: string) => {
    setUploads([])
    handleCloseSampleImg()
    handleCloseBgOptions()
    editor.objects.removeById(id)
  }

  return (
    <DropZone handleDropFiles={handleDropFiles}>
      <Block className={clsx("d-flex flex-1 flex-column", classes.dropFileSection)}>
        <Block className="d-flex align-items-center flex-start">
          <Block className="pl-1">
            {uploads.length === 0 && <Block className={classes.panelHeading}>Add Image</Block>}
          </Block>
          <Block>
            {uploads.length != 0 && (
              <div
                className="d-flex justify-content-start flex-row align-items-center pointer"
                onClick={() => {
                  //when right icon with Image is clicked set upload to intital state
                  setUploads([])
                  handleCloseSampleImg()
                  handleCloseBgOptions()
                }}
              >
                <Icons.ChevronRight size="16" /> <Block className={clsx(classes.panelHeading, "ml-1")}>Image</Block>
              </div>
            )}
          </Block>
        </Block>
        {uploads.length === 0 && <UploadInput handleInputFileRefClick={handleInputFileRefClick} />}

        <>
          <Block className={classes.uploadInputWrapper}>
            <input
              onChange={handleFileInput}
              type="file"
              id="inputFile"
              ref={inputFileRef}
              className={classes.uploadInput}
            />
            <Block className={classes.uploadPreviewSection}>
              {uploads.map((upload) => (
                <div
                  key={upload.id}
                  className="d-flex align-items-center pointer"

                  // onClick={() => addImageToCanvas(upload)}
                >
                  <UploadPreview
                    removeBgBtn={removeBgBtn}
                    disableRemoveBgBtn={disableRemoveBgBtn}
                    handleOpenBgOptions={handleOpenBgOptions}
                    upload={upload}
                    selectedImage={selectedImage}
                    discardHandler={discardHandler}
                  />
                </div>
              ))}
            </Block>
          </Block>
        </>
      </Block>
    </DropZone>
  )
}

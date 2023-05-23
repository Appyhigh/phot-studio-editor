import React, { useContext, useEffect } from "react"
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
import MainImageContext from "~/contexts/MainImageContext"
import { LOCAL_SAMPLE_IMG } from "~/constants/contants"

export default function ({ uploadType }: any) {
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const [uploads, setUploads] = React.useState<any[]>([])
  const editor = useEditor()
  const [selectedImage, setSelectedImage] = React.useState<any>(null)
  const { mainImgInfo, setMainImgInfo, panelInfo, setPanelInfo } = useContext(MainImageContext)

  const handleDropFiles = async (files: FileList) => {
    const file = files[0]

    const isVideo = file.type.includes("video")
    const base64 = (await toBase64(file)) as string
    let preview = base64
    if (isVideo) {
      const video = await loadVideoResource(base64)
      const frame = await captureFrame(video)
      preview = frame
    }

    const type = isVideo ? "StaticVideo" : "StaticImage"
    // @ts-ignore
    const upload = {
      id: nanoid(),
      src: base64,
      preview: preview,
      original: base64,
      type: type,
      metadata: { generationDate: new Date().getTime() },
    }

    setSelectedImage(upload)
    const fileInfo: any = document.getElementById("inputFile")
    if (fileInfo?.value) fileInfo.value = ""

    if (uploadType === LOCAL_SAMPLE_IMG) {
      setUploads([...uploads, upload])
    } else {
      // @ts-ignore
      setPanelInfo((prev) => ({
        ...prev,
        trySampleImg: false,
        bgRemoverBtnActive: true,
        uploadSection: false,
        bgOptions: false,
        UploadPreview: true,
      }))
      // @ts-ignore
      setMainImgInfo((prev) => ({ ...prev, ...upload }))
    }
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }

  const discardHandler = (id: string) => {
    setMainImgInfo((prev: any) => ({ ...prev, id: "" }))
    // @ts-ignore
    setPanelInfo((prev) => ({
      ...prev,
      trySampleImg: true,
      bgOptions: false,
      uploadPreview: false,
      bgRemoverBtnActive: false,
      uploadSection: true,
    }))
    editor.objects.removeById(id)
  }

  return (
    <DropZone handleDropFiles={handleDropFiles}>
      <Block className={clsx("d-flex flex-1 flex-column", classes.dropFileSection)}>
        <Block className="d-flex align-items-center flex-start">
          <Block className="pl-1">
            {uploadType === LOCAL_SAMPLE_IMG && uploads.length === 0 ? (
              <Block className={classes.panelHeading}>Add Image</Block>
            ) : (
              uploadType != LOCAL_SAMPLE_IMG &&
              mainImgInfo.id === "" && <Block className={classes.panelHeading}>Add Image</Block>
            )}
          </Block>
          <Block>
            {uploadType === LOCAL_SAMPLE_IMG && uploads.length != 0 ? (
              <div
                className="d-flex justify-content-start flex-row align-items-center pointer"
                onClick={() => {
                  //when right icon with Image is clicked set upload to intital state
                  setUploads([])
                }}
              >
                <Icons.ChevronRight size="16" /> <Block className={clsx(classes.panelHeading, "ml-1")}>Image</Block>
              </div>
            ) : (
              mainImgInfo.id && (
                <div
                  className="d-flex justify-content-start flex-row align-items-center pointer"
                  onClick={() => {
                    //when right icon with Image is clicked set upload to intital state
                    setMainImgInfo((prev: any) => ({ ...prev, id: "" }))
                    setUploads([])
                    // @ts-ignore
                    setPanelInfo((prev) => ({
                      ...prev,
                      trySampleImg: true,
                      bgOptions: false,
                      uploadSection: true,
                      bgRemoveBtnActive: false,
                    }))
                  }}
                >
                  <Icons.ChevronRight size="16" /> <Block className={clsx(classes.panelHeading, "ml-1")}>Image</Block>
                </div>
              )
            )}
          </Block>
        </Block>
        {uploadType === LOCAL_SAMPLE_IMG && uploads.length === 0 ? (
          <UploadInput handleInputFileRefClick={handleInputFileRefClick} />
        ) : (
          mainImgInfo.id == "" &&
          uploadType !== LOCAL_SAMPLE_IMG && <UploadInput handleInputFileRefClick={handleInputFileRefClick} />
        )}

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
              {uploadType === LOCAL_SAMPLE_IMG && uploads.length != 0
                ? uploads.map((upload) => (
                    <div
                      key={upload.id}
                      className="d-flex align-items-center pointer"

                      // onClick={() => addImageToCanvas(upload)}
                    >
                      <UploadPreview
                        uploadType={uploadType}
                        upload={upload}
                        selectedImage={selectedImage}
                        discardHandler={() => {
                          setUploads([])
                        }}
                      />
                    </div>
                  ))
                : mainImgInfo.id && (
                    <UploadPreview
                      uploadType={uploadType}
                      selectedImage={selectedImage}
                      discardHandler={discardHandler}
                    />
                  )}
            </Block>
          </Block>
        </>
      </Block>
    </DropZone>
  )
}

import React from "react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { Button, SIZE } from "baseui/button"
import DropZone from "~/components/Dropzone"
import { useEditor } from "@layerhub-io/react"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { nanoid } from "nanoid"
import { captureFrame, loadVideoResource } from "~/utils/video"
import { toBase64 } from "~/utils/data"
import UploadInput from "~/components/UI/UploadInput"
import UploadPreview from "./UploadPreview"
import Icons from "~/components/Icons"
import useAppContext from "~/hooks/useAppContext"
import { LabelLarge } from "baseui/typography"

export default function ({ handleCloseSampleImg, handleCloseBgOptions }: any) {
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const [uploads, setUploads] = React.useState<any[]>([])
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [selectedImage, setSelectedImage] = React.useState<any>(null)

  const handleDropFiles = async (files: FileList) => {
    const file = files[0]
    handleCloseSampleImg()
    handleCloseBgOptions()
    const isVideo = file.type.includes("video")
    const base64 = (await toBase64(file)) as string
    let preview = base64
    if (isVideo) {
      const video = await loadVideoResource(base64)
      const frame = await captureFrame(video)
      preview = frame
    }

    const type = isVideo ? "StaticVideo" : "StaticImage"

    const upload = {
      id: nanoid(),
      src: base64,
      preview: preview,
      type: type,
      metadata: { generationDate: new Date().getTime() },
    }

    setUploads([...uploads, upload])

    editor.objects.add(upload).then(() => {
      setSelectedImage(upload.preview)
      const fileInfo: any = document.getElementById("inputFile")
      if (fileInfo.value) fileInfo.value = ""
    })
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
      <Block className="d-flex flex-1 flex-column">
        <Block
          className="d-flex align-items-center flex-start"
          $style={{
            padding: "20px 0px 0px 16px",
          }}
        >
          <Block className="pl-1">{uploads.length === 0 && <LabelLarge>Add Image</LabelLarge>}</Block>
          <Block>
            {uploads.length != 0 && (
              <div
                className="d-flex justify-content-start flex-row align-items-center pointer"
                onClick={() => {
                  setIsSidebarOpen(false)
                }}
              >
                <Icons.ChevronRight size="16" />{" "}
                <p className="ml-1">
                  <LabelLarge>Image</LabelLarge>
                </p>
              </div>
            )}
          </Block>
        </Block>
        {uploads.length === 0 && <UploadInput handleInputFileRefClick={handleInputFileRefClick} />}

        <>
          <Block padding={"0 1.5rem"}>
            <input
              onChange={handleFileInput}
              type="file"
              id="inputFile"
              ref={inputFileRef}
              style={{ display: "none" }}
            />
            <div
              style={{
                marginTop: "0.5rem",
                display: "grid",
                gap: "0.5rem",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {uploads.map((upload) => (
                <div
                  key={upload.id}
                  className="d-flex align-items-center pointer"

                  // onClick={() => addImageToCanvas(upload)}
                >
                  <UploadPreview upload={upload} selectedImage={selectedImage} discardHandler={discardHandler} />
                </div>
              ))}
            </div>
          </Block>
        </>
      </Block>
    </DropZone>
  )
}

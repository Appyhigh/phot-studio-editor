import { Theme, styled } from "baseui"
import { Block } from "baseui/block"
import React, { useState } from "react"
import classes from "./style.module.css"
import clsx from "clsx"
import UploadInput from "../UploadInput/UploadInput"
import DropZone from "~/components/Dropzone"
import { toBase64 } from "~/utils/data"
import { nanoid } from "nanoid"
import { useEditor } from "@layerhub-io/react"
import { backgroundLayerType } from "~/constants/contants"
import StockImages from "./StockImages"

const BgUpload = () => {
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const editor = useEditor()

  const handleDropFiles = async (files: FileList) => {
    const file = files[0]
    const isVideo = file.type.includes("video")
    const base64 = (await toBase64(file)) as string
    let preview = base64

    const type = isVideo ? "StaticVideo" : "StaticImage"

    const upload = {
      id: nanoid(),
      src: base64,
      preview: preview,
      type: type,
      metadata: { generationDate: new Date().getTime() },
    }

    const bgObject = editor.frame.background.canvas._objects.filter(
      (el: any) => el.metadata?.type === backgroundLayerType
    )[0]

    if (bgObject) {
      editor.objects.remove(bgObject.id)
      editor.objects.unsetBackgroundImage()
    }

    const options = {
      type: "StaticImage",
      src: upload.src,
      preview: upload.preview,
      metadata: { generationDate: new Date().getTime(), type: backgroundLayerType },
    }

    editor.objects.add(options).then(() => {
      editor.frame.setBackgroundColor("#ffffff")
      editor.objects.setAsBackgroundImage()

      const fileInfo: any = document.getElementById("inputBgFile")
      if (fileInfo.value) fileInfo.value = ""
    })
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const [bgChoice, setBgChoice] = useState(0)

  return (
    <Block>
      <div className={clsx(classes.bgUploadSection, "d-flex  flex-row")}>
        <div className={clsx(classes.tabs, bgChoice === 0 && classes.selectedChoice)} onClick={() => setBgChoice(0)}>
          Upload From PC
        </div>
        <div className={clsx(classes.tabs, bgChoice === 1 && classes.selectedChoice)} onClick={() => setBgChoice(1)}>
          Stock Images
        </div>
      </div>
      {bgChoice === 0 ? (
        <DropZone handleDropFiles={handleDropFiles}>
          <div className={classes.uploadInput}>
            <UploadInput handleInputFileRefClick={handleInputFileRefClick} />
            <input
              onChange={handleFileInput}
              type="file"
              id="inputBgFile"
              ref={inputFileRef}
              className={classes.inputFile}
            />
          </div>
        </DropZone>
      ) : (
        <StockImages />
      )}
    </Block>
  )
}
export default BgUpload

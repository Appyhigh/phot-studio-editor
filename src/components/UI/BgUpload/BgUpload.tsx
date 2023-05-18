import { Block } from "baseui/block"
import React, { useState } from "react"
import classes from "./style.module.css"
import clsx from "clsx"
import UploadInput from "../UploadInput/UploadInput"
import DropZone from "~/components/Dropzone"
import { toBase64 } from "~/utils/data"
import { useEditor, useActiveObject } from "@layerhub-io/react"
import StockImages from "./StockImages"
import { changeLayerBackgroundImage } from "~/utils/updateLayerBackground"

const BgUpload = () => {
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const editor = useEditor()
  const activeObject: any = useActiveObject()
  const handleDropFiles = async (files: FileList) => {
    const file = files[0]
    const base64 = (await toBase64(file)) as string

    const previewWithUpdatedBackground: any = await changeLayerBackgroundImage(
      activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      base64
    )
    const options = {
      type: "StaticImage",
      src: previewWithUpdatedBackground,
      preview: previewWithUpdatedBackground,
      metadata: {
        generationDate: new Date().getTime(),
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
    }
    editor.objects.add(options)
    editor.objects.removeById(activeObject?.id)
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

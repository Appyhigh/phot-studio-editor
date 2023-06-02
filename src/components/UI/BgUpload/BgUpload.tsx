import { Block } from "baseui/block"
import React, { useContext, useState } from "react"
import classes from "./style.module.css"
import clsx from "clsx"
import UploadInput from "../UploadInput/UploadInput"
import DropZone from "~/components/Dropzone"
import { useEditor } from "@layerhub-io/react"
import StockImages from "./StockImages"
import { changeLayerBackgroundImage } from "~/utils/updateLayerBackground"
import UploadPreview from "~/views/DesignEditor/components/Panels/panelItems/UploadPreview/UploadPreview"
import { getBucketImageUrlFromFile } from "~/utils/removeBackground"
import { MAIN_IMG_Bg } from "~/constants/contants"
import { toDataURL } from "~/utils/export"
import MainImageContext from "~/contexts/MainImageContext"
import { nanoid } from "nanoid"
import ImagesContext from "~/contexts/ImagesCountContext"

const BgUpload = () => {
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const [bgUploadPreview, setBgUploadPreview] = useState({
    showPreview: false,
    url: "",
  })
  const { mainImgInfo, setMainImgInfo } = useContext(MainImageContext)

  const editor = useEditor()
  const handleDropFiles = async (files: FileList) => {
    const file = files[0]

    const imageUrl = await getBucketImageUrlFromFile(file)
    setBgUploadPreview((prev) => ({ ...prev, showPreview: true, url: imageUrl }))
  }

  const { imagesCt, setImagesCt } = useContext(ImagesContext)
  const handleImgAdd = () => {
    const activeMainObject = editor.objects.findById(mainImgInfo.id)[0]

    const imageUrl = bgUploadPreview.url

    setBgUploadPreview((prev) => ({ ...prev, showPreview: true, url: imageUrl }))

    toDataURL(imageUrl, async function (dataUrl: string) {
      const previewWithUpdatedBackground: any = await changeLayerBackgroundImage(
        activeMainObject?.metadata?.originalLayerPreview ?? activeMainObject.preview,
        dataUrl
      )
    
      const options = {
        type: "StaticImage",
        src: previewWithUpdatedBackground,
        preview: previewWithUpdatedBackground,
        original: mainImgInfo.original,
        name:mainImgInfo.name,
        id: nanoid(),
        metadata: {
          generationDate: new Date().getTime(),
          originalLayerPreview: activeMainObject?.metadata?.originalLayerPreview ?? activeMainObject.preview,
        },
      }
      editor.objects.removeById(mainImgInfo.id)
      editor.objects.add(options).then(() => {
        //@ts-ignore
        setMainImgInfo((prev) => ({ ...prev, ...options }))
        setBgUploadPreview((prev) => ({ ...prev, showPreview: false, url: "" }))
      })
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
    <Block className="mb-3">
      <div className={clsx(classes.bgUploadSection, "d-flex  flex-row")}>
        <div className={clsx(classes.tabs, bgChoice === 0 && classes.selectedChoice)} onClick={() => setBgChoice(0)}>
          Upload From PC
        </div>
        <div className={clsx(classes.tabs, bgChoice === 1 && classes.selectedChoice)} onClick={() => setBgChoice(1)}>
          Stock Images
        </div>
      </div>
      {bgChoice === 0 ? (
        <>
          {!bgUploadPreview.showPreview && (
            <DropZone handleDropFiles={handleDropFiles}>
              <div className={classes.uploadInput}>
                <UploadInput handleInputFileRefClick={handleInputFileRefClick} />
                <input
                  onChange={handleFileInput}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/bmp"
                  id="inputBgFile"
                  ref={inputFileRef}
                  className={classes.inputFile}
                />
              </div>
            </DropZone>
          )}
          {bgUploadPreview.showPreview && bgUploadPreview.url && (
            <UploadPreview
              uploadType={MAIN_IMG_Bg}
              discardHandler={() => {
                setBgUploadPreview((prev) => ({ ...prev, showPreview: false, url: "" }))
              }}
              mainImgUrl={bgUploadPreview.url}
              handleBgAdd={handleImgAdd}
            />
          )}
        </>
      ) : (
        <StockImages />
      )}
    </Block>
  )
}
export default BgUpload

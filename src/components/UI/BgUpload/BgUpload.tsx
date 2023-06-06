import { Block } from "baseui/block"
import React, { useContext, useEffect, useState } from "react"
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
import LoaderSpinner from "../../../views/Public/images/loader-spinner.svg"
import { HandleBgChangeOption } from "~/views/DesignEditor/utils/functions/HandleBgChangeFunc"
import Scrollbars from "@layerhub-io/react-custom-scrollbar"
import Icons from "~/components/Icons"

const BgUpload = () => {
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const [bgUploading, setBgUploading] = useState(false)

  const [bgUploadPreview, setBgUploadPreview] = useState({
    showPreview: false,
    url: "",
  })
  const { mainImgInfo, setMainImgInfo } = useContext(MainImageContext)

  const editor = useEditor()
  const handleDropFiles = async (files: FileList) => {
    setBgUploading(true)
    const file = files[0]

    const imageUrl = await getBucketImageUrlFromFile(file)

    setBgUploadPreview((prev) => ({ ...prev, showPreview: true, url: imageUrl }))
    if (imageUrl) {
      setBgUploading(false)
    }
  }

  const handleImgAdd = () => {
    const imageUrl = bgUploadPreview.url
    setBgUploadPreview((prev) => ({ ...prev, showPreview: true, url: imageUrl }))
    toDataURL(imageUrl, async function (dataUrl: string) {
      HandleBgChangeOption(editor, mainImgInfo, setMainImgInfo, dataUrl, changeLayerBackgroundImage)
      setBgUploadPreview((prev) => ({ ...prev, showPreview: false, url: "" }))
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
        <>
          <Scrollbars style={{ height: "250px" }}>
            {bgUploading && bgChoice === 0 && (
              <div>
                <Block className={classes.uploadInputContainer}>
                  <Icons.InputContainer height={185} />
                  <img className={classes.bgUploadLoader} src={LoaderSpinner} />
                </Block>
              </div>
            )}
            {!bgUploadPreview.showPreview && !bgUploading && (
              <DropZone handleDropFiles={handleDropFiles}>
                <div className={classes.uploadInput}>
                  <UploadInput height={185} handleInputFileRefClick={handleInputFileRefClick} />
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

            {bgUploadPreview.showPreview && bgUploadPreview.url && !bgUploading && (
              <Scrollbars style={{ height: "300px" }}>
                <UploadPreview
                  uploadType={MAIN_IMG_Bg}
                  discardHandler={() => {
                    setBgUploadPreview((prev) => ({ ...prev, showPreview: false, url: "" }))
                  }}
                  mainImgUrl={bgUploadPreview.url}
                  handleBgAdd={handleImgAdd}
                />
              </Scrollbars>
            )}
          </Scrollbars>
        </>
      ) : (
        <StockImages height="165px" />
      )}
    </Block>
  )
}
export default BgUpload

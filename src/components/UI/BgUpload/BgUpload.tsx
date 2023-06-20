import { Block } from "baseui/block"
import { useContext, useEffect, useState } from "react"
import classes from "./style.module.css"
import clsx from "clsx"
import { useEditor } from "@layerhub-io/react"
import StockImages from "./StockImages"
import { changeLayerBackgroundImage } from "~/utils/updateLayerBackground"
import UploadPreview from "~/views/DesignEditor/components/Panels/panelItems/UploadPreview/UploadPreview"
import { MAIN_IMG_Bg } from "~/constants/contants"
import { toDataURL } from "~/utils/export"
import MainImageContext from "~/contexts/MainImageContext"
import LoaderSpinner from "../../../views/Public/images/loader-spinner.svg"
import { HandleBgChangeOption } from "~/views/DesignEditor/utils/functions/HandleBgChangeFunc"
import Scrollbars from "@layerhub-io/react-custom-scrollbar"
import Icons from "~/components/Icons"
import FileError from "../Common/FileError/FileError"
import UppyDashboard from "../UploadInput/UppyDashboard"

const BgUpload = () => {
  const [bgUploading, setBgUploading] = useState(false)
  const [bgUploadPreview, setBgUploadPreview] = useState({
    showPreview: false,
    url: "",
  })
  const { mainImgInfo, setMainImgInfo } = useContext(MainImageContext)
  const [rejectedFileUpload, setRejectedFileUpload] = useState(false)
  const editor = useEditor()
  const [bgChoice, setBgChoice] = useState(0)
  const [renderKey, setRenderKey] = useState(0)
  const [disableButton, setDisableButton] = useState(false)

  const handleImgAdd = async() => {
    
    setDisableButton(true)
    const imageUrl = bgUploadPreview.url
    setBgUploadPreview((prev) => ({ ...prev, showPreview: true, url: imageUrl }))
    toDataURL(imageUrl, async function (dataUrl: string) {
      await HandleBgChangeOption(editor, mainImgInfo, setMainImgInfo, dataUrl, changeLayerBackgroundImage)
      setBgUploadPreview((prev) => ({ ...prev, showPreview: false, url: "" }))
      setDisableButton(false)
    })
      
  }

  useEffect(() => {
    setTimeout(() => {
      setRenderKey((prev) => prev + 1)
    }, 4000)
  }, [bgUploading])

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
          <Scrollbars style={{ height: "450%" }}>
            {bgUploading && bgChoice === 0 && (
              <div>
                <Block className={classes.uploadInputContainer}>
                  <Icons.InputContainer height={185} />
                  <img className={classes.bgUploadLoader} src={LoaderSpinner} />
                </Block>
              </div>
            )}
            {!bgUploadPreview.showPreview && !bgUploading && !rejectedFileUpload && (
              <div key={renderKey}>
                <UppyDashboard
                  setImageLoading={setBgUploading}
                  setRejectedFileUpload={setRejectedFileUpload}
                  setBgUploadPreview={setBgUploadPreview}
                  id={"BgUpload"}
                  fileInputType={"bgUpload"}
                />
              </div>
            )}
            {rejectedFileUpload && (
              <FileError
                handleTry={() => {
                  setRejectedFileUpload(false)
                }}
              />
            )}

            {bgUploadPreview.showPreview && !rejectedFileUpload && bgUploadPreview.url && !bgUploading && (
              <Scrollbars style={{ height: "300px" }}>
                <UploadPreview
                  uploadType={MAIN_IMG_Bg}
                  discardHandler={() => {
                    setBgUploadPreview((prev) => ({ ...prev, showPreview: false, url: "" }))
                  }}
                  mainImgUrl={bgUploadPreview.url}
                  handleBgAdd={handleImgAdd}
                  disableButton = {disableButton}
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

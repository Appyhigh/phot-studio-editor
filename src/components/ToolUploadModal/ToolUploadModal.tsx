import React, { useContext, useState } from "react"
import classes from "./style.module.css"
import LoaderContext from "~/contexts/LoaderContext"
import UploadPreview from "~/views/DesignEditor/components/Panels/panelItems/UploadPreview/UploadPreview"
import Uploads from "~/views/DesignEditor/components/Panels/panelItems/UploadDropzone/Uploads"
import useAppContext from "~/hooks/useAppContext"
import clsx from "clsx"
import BaseButton from "../UI/Button/BaseButton"
import { MODAL_IMG_UPLOAD } from "~/constants/contants"
import { Block } from "baseui/block"

const ToolUploadModal = () => {
  const [imgUpload, setImgUpload] = React.useState<any>({
    src: "",
    preview: "",
  })
  const { loaderPopup } = useContext(LoaderContext)
  const [imageLoading, setImageLoading] = useState(false)

  const { activePanel } = useAppContext()

  return (
    <>
      {imgUpload.preview ? (
        <Block>
          <UploadPreview
            discardHandler={() => {
              setImgUpload({ src: "", preview: "" })
            }}
            previewHandle={() => {
              setImgUpload({ src: "", preview: "" })
            }}
            imgSrc={imgUpload.src}
            uploadType={MODAL_IMG_UPLOAD}
          />
        </Block>
      ) : (
        <Uploads
          imageLoading={imageLoading}
          setImageLoading={setImageLoading}
          imgUpload={imgUpload}
          setImgUpload={setImgUpload}
          fileInputType={"modalUpload"}
          uploadType={MODAL_IMG_UPLOAD}
          id={"modalUpload"}
        />
      )}
      <div className={classes.tryImages}>
        <div>
          <p>or try one of these for free</p>
          <div className={classes.sampleImg}>
            {Array.from(Array(5).keys()).map((each, idx) => {
              return (
                <div key={idx} className={clsx(classes.eachImg, idx == 0 && classes.firstImg)}>
                  <img
                    src={
                      "https://images.pexels.com/photos/3493777/pexels-photo-3493777.jpeg?auto=compress&cs=tinysrgb&h=130"
                    }
                    key={idx}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <BaseButton
          borderRadius="10px"
          title={"Continue"}
          margin={"8px 0 0 4px"}
          disabled={imgUpload.src ? false : true}
          width="315px"
          handleClick={() => {}}
        />
      </div>
    </>
  )
}

export default ToolUploadModal

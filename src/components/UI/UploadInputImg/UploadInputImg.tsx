import { getBucketImageUrlFromFile } from "~/utils/removeBackground"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import { Block } from "baseui/block"
import clsx from "clsx"
import React, { useContext, useState } from "react"
import TextToArtContext from "~/contexts/TextToArtContext"
import DropZone from "~/components/Dropzone"
import LoaderSpinner from "../../../views/Public/images/loader-spinner.svg"
import SliderInput from "../SliderInput/SliderInput"
import UploadPreview from "~/views/DesignEditor/components/Panels/panelItems/UploadPreview/UploadPreview"
import { TEXT_TO_ART } from "~/constants/contants"
import FileError from "../Common/FileError/FileError"
import ImagePopUp from "./ImagePopUp"

const UploadInputImg = () => {
  const [imageUploading, setImageUploading] = useState(false)
  const inputImageRef = React.useRef<HTMLInputElement>(null)
  const [rejectedFileUpload, setRejectedFileUpload] = useState(false)

  const { textToArtInputInfo, setTextToArtInputInfo } = useContext(TextToArtContext)
  const [openModal, setOpenModal] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  const handleDropFiles = async (files: FileList) => {
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
      setImageUploading(false)
      return
    }
    const imageUrl = await getBucketImageUrlFromFile(file)
    setImageUrl(imageUrl)
    if (imageUrl) {
      setImageUploading(false)
      setOpenModal(true)
    } else {
      console.log("ERROR: Could not upload image")
      setImageUploading(false)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUploading(true)
    handleDropFiles(e.target.files!)
  }

  const handleInputFileRefClick = () => {
    inputImageRef.current?.click()
  }

  return (
    <>
      {!textToArtInputInfo.uploaded_img && !imageUploading && !rejectedFileUpload && (
        <div>
          <div className={classes.artSubHeading}>Add an image (optional)</div>

          <DropZone handleDropFiles={handleDropFiles}>
            <div className={classes.uploadInput} onClick={handleInputFileRefClick}>
              <div className={classes.uploadImgText}>Upload an image</div>
              <div className="flex-1"></div>
              <div className={classes.circlePlusIcon}>
                <Icons.CirclePlus />
              </div>
              <input
                onChange={handleFileInput}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/bmp"
                ref={inputImageRef}
                className={classes.inputFile}
              />
            </div>
          </DropZone>
        </div>
      )}

      {imageUploading && !rejectedFileUpload && (
        <div>
          <div className={clsx(classes.artSubHeading, "mb-1")}>Add an image </div>

          <Block className={classes.uploadInputContainer}>
            <Icons.InputContainer />
            <img className={classes.bgUploadLoader} src={LoaderSpinner} />
          </Block>
        </div>
      )}
      {textToArtInputInfo.uploaded_img != "" && (
        <>
          <div className={clsx(classes.artSubHeading, "mb-1")}>Add an image </div>

          <UploadPreview
            uploadType={TEXT_TO_ART}
            textToArtImg={textToArtInputInfo.uploaded_img}
            discardHandler={() => {
              setTextToArtInputInfo((prev: any) => ({ ...prev, uploaded_img: "" }))
            }}
          />
          <div className={clsx(classes.artSubHeading, "mt-3 mb-1")}>Selected Aspect Ratio</div>
          <div className={classes.imageAspectRatio}>
            <div
              className={classes.shapes}
              style={{ aspectRatio: `${textToArtInputInfo.aspect_ratio.split(":").join("/")}` }}
            ></div>
            {textToArtInputInfo.aspect_ratio}
          </div>
          <div className={clsx(classes.artSubHeading, classes.imageWeightSubHeading)}>Image Weight </div>
          <p className={classes.paraText}>Indicate influence of the selected image on final output.</p>
          <SliderInput
            minVal={1}
            maxVal={10}
            value={textToArtInputInfo.image_wt}
            handleChange={(e: any) => {
              setTextToArtInputInfo((prev: any) => ({ ...prev, image_wt: e }))
            }}
          />

          <div className={clsx(classes.sliderMark, "d-flex")}>
            <p>Better Quality</p>
            <div className="flex-1"></div>
            <p>Match Prompt</p>
          </div>
        </>
      )}
      {rejectedFileUpload && (
        <div className={classes.rejectedFilesError}>
          <FileError
            handleTry={() => {
              setRejectedFileUpload(false)
            }}
          />
        </div>
      )}
      <ImagePopUp openModal={openModal} setOpenModal={setOpenModal} imageUrl={imageUrl} setImageUrl={setImageUrl} />
    </>
  )
}

export default UploadInputImg

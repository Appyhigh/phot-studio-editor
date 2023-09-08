import { useCallback, useState, useContext } from "react"
import Cropper from "react-easy-crop"
import classes from "./style.module.css"
import "./cropStyles.css"
import AspectRatioSwiper from "~/components/UI/AspectRatioSwiper/AspectRatioSwiper"
import { aspectRatio } from "~/views/DesignEditor/utils/AspectRatio"
import TextToArtContext from "~/contexts/TextToArtContext"
import { Modal } from "baseui/modal"
import { getCroppedImage } from "~/utils/getCroppedImage"
import BaseButton from "../Button/BaseButton"

const ImagePopUp = ({ openModal, setOpenModal, imageUrl, setImageUrl }: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage]: any = useState(null)
  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])
  const { textToArtInputInfo, setTextToArtInputInfo } = useContext(TextToArtContext)
  const values = textToArtInputInfo.aspect_ratio.split(":")
  const x = parseInt(values[0])
  const y = parseInt(values[1])

  return (
    <Modal
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            zIndex: 100,
          }),
        },

        Close: {
          style: ({ $theme }) => ({
            margin: "1.5rem",
          }),
        },
      }}
      size={"auto"}
      isOpen={openModal}
      onClose={() => {
        setOpenModal(false)
        setTextToArtInputInfo((prev: any) => ({ ...prev, uploaded_img: "" }))
      }}
    >
      <div className={classes.imageModal}>
        <div className={classes.imageModalHeading}>Crop image</div>
        <div className={classes.cross}></div>
        <div className={classes.aspectRatio}>
          <div className={classes.aspectRatioHeading}>Aspect Ratio:</div>
          <AspectRatioSwiper
            data={aspectRatio}
            aspectRatioSelected={textToArtInputInfo.aspect_ratio}
            handleChange={(x: number, y: number) => {
              setTextToArtInputInfo((prev: any) => ({ ...prev, aspect_ratio: `${x}:${y}` }))
            }}
            width="23rem"
            slides={"auto"}
            centeredSlides={"no"}
            spacing={16}
            sticky={true}
          />
        </div>
        <div>
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={x / y}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <BaseButton
          title="Add"
          width="30rem"
          height="50px"
          fontFamily="rubik"
          fontSize="16px"
          margin="0 0 1.5rem 0"
          handleClick={() =>
            getCroppedImage(imageUrl, croppedAreaPixels, setCroppedImage, setTextToArtInputInfo, setOpenModal)
          }
        />
      </div>
    </Modal>
  )
}

export default ImagePopUp

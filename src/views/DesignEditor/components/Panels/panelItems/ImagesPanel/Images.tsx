import React, { useContext, useState } from "react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { useEditor, useFrame } from "@layerhub-io/react"
import classes from "./style.module.css"
import clsx from "clsx"
import Loader from "~/components/UI/Loader/Loader"
import LoaderContext from "~/contexts/LoaderContext"
import { BgSampleImages } from "~/constants/bg-sample-images"
import { images } from "~/constants/mock-data"
import Uploads from "../UploadDropzone/Uploads"
import { LOCAL_SAMPLE_IMG } from "~/constants/contants"
import useAppContext from "~/hooks/useAppContext"
import StockImages from "~/components/UI/BgUpload/StockImages"
import { AddObjectFunc } from "~/views/DesignEditor/utils/functions/AddObjectFunc"
import ImagesContext from "~/contexts/ImagesCountContext"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"
import UploadPreview from "../UploadPreview/UploadPreview"
import Accordian from "~/components/UI/Accordian/Accordian"

const Images = () => {
  const editor = useEditor()
  const [uploads, setUploads] = React.useState<any[]>([])
  const { loaderPopup } = useContext(LoaderContext)
  const { activePanel } = useAppContext()

  const [bgChoice, setBgChoice] = useState(0)
  const { setImagesCt } = useContext(ImagesContext)
  const [imageLoading, setImageLoading] = useState(false)
  const frame = useFrame()

  const addImg = async (imageUrl: string) => {
    await getDimensions(imageUrl, (img: any) => {
      let latest_ct = 0
      setImagesCt((prev: any) => {
        latest_ct = prev + 1
        AddObjectFunc(imageUrl, editor, img.width, img.height, frame, (latest_ct = latest_ct))
        return prev + 1
      })
    })
  }

  const accordinanContent = () => <h3>Children</h3>
  return (
    <Block className="d-flex flex-1 flex-column">
      {/* accordian demo  */}
      {/* <Accordian label={1} isDone={true} heading={"Upload/choose image"} children={accordinanContent()} /> */}
      <>
        {uploads.length != 0 ? (
          uploads.map((upload) => (
            <div key={upload.id} className="d-flex align-items-center pointer">
              <UploadPreview
                previewHeading={"Image"}
                uploadType={LOCAL_SAMPLE_IMG}
                imgSrc={upload.preview}
                upload={upload}
                discardHandler={() => {
                  setUploads([])
                }}
                previewHandle={() => {
                  let latest_ct = 0
                  setImagesCt((prev: any) => {
                    latest_ct = prev + 1
                    return prev + 1
                  })
                  editor.objects.add({ ...upload, name: latest_ct.toString() })
                  setUploads([])
                }}
                btnTitle={"Add"}
              />
            </div>
          ))
        ) : (
          <Uploads
            activePanel={activePanel}
            uploadType={LOCAL_SAMPLE_IMG}
            mainHeading={"Add Image"}
            previewHeading={"Image"}
            uploads={uploads}
            setUploads={setUploads}
            fileInputType={"panelAdd"}
            id="Image"
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
          />
        )}

        <div className={clsx(classes.bgUploadSection, "d-flex  flex-row")}>
          <div className={clsx(classes.tabs, bgChoice === 0 && classes.selectedChoice)} onClick={() => setBgChoice(0)}>
            Sample Images
          </div>
          <div
            className={clsx(classes.tabs, bgChoice === 1 && classes.selectedChoice)}
            style={{
              cursor: imageLoading ? "not-allowed" : "pointer",
            }}
          >
            <div
              style={{
                pointerEvents: imageLoading ? "none" : "auto",
              }}
              onClick={() => setBgChoice(1)}
            >
              Stock Images
            </div>
          </div>
        </div>
        {bgChoice === 0 ? (
          <Scrollable>
            <Block className="py-3 mt-2 mb-2">
              <Block className={classes.sampleImgSection}>
                {BgSampleImages.map((image, index) => {
                  return (
                    <ImageItem
                      key={index}
                      onClick={() => {
                        addImg(image.src)
                      }}
                      preview={image.src}
                      imageLoading={imageLoading}
                    />
                  )
                })}
                {images.map((image, index) => {
                  return (
                    <ImageItem
                      key={index}
                      onClick={() => {
                        addImg(image.src.medium)
                      }}
                      preview={image.src.small}
                      imageLoading={imageLoading}
                    />
                  )
                })}
              </Block>
            </Block>
          </Scrollable>
        ) : (
          <StockImages imageAs="foreground" />
        )}
      </>
      <Loader isOpen={loaderPopup} />
    </Block>
  )
}

const ImageItem = ({
  preview,
  onClick,
  imageLoading,
}: {
  preview: any
  onClick?: (option: any) => void
  imageLoading: any
}) => {
  return (
    <div
      style={{
        cursor: imageLoading ? "not-allowed" : "pointer",
      }}
    >
      <div
        onClick={onClick}
        className={clsx("pointer p-relative", classes.imageItemSection)}
        style={{
          pointerEvents: imageLoading ? "none" : "auto",
        }}
      >
        <div className={clsx("p-absolute", classes.imageItem)} />
        <img src={preview} className={classes.imagePreview} />
      </div>
    </div>
  )
}

export default Images

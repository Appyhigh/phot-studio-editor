import React, { useContext, useState } from "react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { useEditor, useFrame } from "@layerhub-io/react"
import classes from "./style.module.css"
import clsx from "clsx"
import Loader from "~/components/UI/Loader/Loader"
import LoaderContext from "~/contexts/LoaderContext"
import { BgSampleImages } from "~/constants/bg-sample-images"
import { nanoid } from "nanoid"
import { images } from "~/constants/mock-data"
import Uploads from "../UploadDropzone/Uploads"
import { LOCAL_SAMPLE_IMG } from "~/constants/contants"
import useAppContext from "~/hooks/useAppContext"
import StockImages from "~/components/UI/BgUpload/StockImages"
import { AddObjectFunc } from "~/views/DesignEditor/utils/functions/AddObjectFunc"
import ImagesContext from "~/contexts/ImagesCountContext"

const Images = () => {
  const editor = useEditor()
  const { loaderPopup } = useContext(LoaderContext)
  const { activePanel } = useAppContext()

  const [bgChoice, setBgChoice] = useState(0)
  const { setImagesCt } = useContext(ImagesContext)
  const frame = useFrame()
  return (
    <Block className="d-flex flex-1 flex-column">
      <>
        <Uploads activePanel={activePanel} uploadType={LOCAL_SAMPLE_IMG} />{" "}
        <div className={clsx(classes.bgUploadSection, "d-flex  flex-row")}>
          <div className={clsx(classes.tabs, bgChoice === 0 && classes.selectedChoice)} onClick={() => setBgChoice(0)}>
            Sample Images
          </div>
          <div className={clsx(classes.tabs, bgChoice === 1 && classes.selectedChoice)} onClick={() => setBgChoice(1)}>
            Stock Images
          </div>
        </div>
        {bgChoice === 0 ? (
          <Scrollable>
            <Block className="py-3 mt-2">
              <Block className={classes.sampleImgSection}>
                {BgSampleImages.map((image, index) => {
                  return (
                    <ImageItem
                      key={index}
                      onClick={() => {
                        let latest_ct = 0
                        setImagesCt((prev: any) => {
                          latest_ct = prev + 1
                          AddObjectFunc(image.src, editor, 0, 0, frame, latest_ct)
                          return prev + 1
                        })
                      }}
                      preview={image.src}
                    />
                  )
                })}
                {images.map((image, index) => {
                  return (
                    <ImageItem
                      key={index}
                      onClick={() => {
                        let latest_ct = 0
                        setImagesCt((prev: any) => {
                          latest_ct = prev + 1
                          AddObjectFunc(image.src.medium, editor, 0, 0, frame, latest_ct)
                          return prev + 1
                        })
                      }}
                      preview={image.src.small}
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

const ImageItem = ({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) => {
  return (
    <div onClick={onClick} className={clsx("pointer p-relative", classes.imageItemSection)}>
      <div className={clsx("p-absolute", classes.imageItem)} />
      <img src={preview} className={classes.imagePreview} />
    </div>
  )
}

export default Images

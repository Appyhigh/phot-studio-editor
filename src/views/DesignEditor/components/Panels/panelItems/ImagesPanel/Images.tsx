import React, { useContext, useState } from "react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { useEditor } from "@layerhub-io/react"
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

const Images = () => {
  const editor = useEditor()
  const { loaderPopup } = useContext(LoaderContext)
  const { activePanel } = useAppContext()

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: "StaticImage",
          id: nanoid(),
          src: url,
          preview: url,
          metadata: { generationDate: new Date().getTime() },
        }
        editor.objects.add(options)
      }
    },
    [editor]
  )

  const [bgChoice, setBgChoice] = useState(0)

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
                        addObject(image.src)
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
                        addObject(image.src.medium)
                      }}
                      preview={image.src.small}
                    />
                  )
                })}
              </Block>
            </Block>
          </Scrollable>
        ) : (
          <Scrollable>
            <StockImages imageAs="foreground" />
          </Scrollable>
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

import React, { useContext } from "react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { useEditor } from "@layerhub-io/react"
import classes from "./style.module.css"
import clsx from "clsx"
import Loader from "~/components/UI/Loader/Loader"
import LoaderContext from "~/contexts/LoaderContext"
import { BgSampleImages } from "~/constants/bg-sample-images"
import { toDataURL } from "~/utils/export"
import { nanoid } from "nanoid"
import { images } from "~/constants/mock-data"

const Images = () => {
  const editor = useEditor()
  const { loaderPopup } = useContext(LoaderContext)

  const addObject = React.useCallback(
    (url: string) => {
      toDataURL(url, async function (dataUrl: string) {
        if (editor) {
          const options = {
            type: "StaticImage",
            id: nanoid(),
            src: dataUrl,
            preview: dataUrl,
            metadata: { generationDate: new Date().getTime() },
          }
          editor.objects.add(options)
        }
      })
    },
    [editor]
  )

  return (
    <Block className="d-flex flex-1 flex-column">
      <>
        {" "}
        <Block className={clsx(classes.tryImgHeading, "d-flex align-items-center justify-content-start mb-3 mt-3")}>
          Try Sample Images
        </Block>
        <Scrollable>
          <Block className="py-3">
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

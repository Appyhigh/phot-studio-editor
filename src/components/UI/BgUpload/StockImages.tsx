import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { images } from "~/constants/mock-data"
import { useEditor } from "@layerhub-io/react"
import { backgroundLayerType } from "~/constants/contants"
import React, { useState } from "react"

const StockImages = () => {
  const editor = useEditor()
  const [selectedImg, setSelectedImg] = useState(-1)

  const setBgImg = React.useCallback(
    (url: string) => {
      const bgObject = editor.frame.background.canvas._objects.filter(
        (el: any) => el.metadata?.type === backgroundLayerType
      )[0]

      if (bgObject) {
        editor.objects.remove(bgObject.id)
        editor.objects.unsetBackgroundImage()
      }
      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
          preview: url,
          metadata: { generationDate: new Date().getTime(), type: backgroundLayerType },
        }
        editor.objects.add(options).then(() => {
          editor.frame.setBackgroundColor("#ffffff")
          editor.objects.setAsBackgroundImage()
        })
      }
    },
    [editor]
  )

  return (
    <div className={classes.stockImgSection}>
      <div className={classes.inputWrapper}>
        <input className={classes.textInput} />
        <div className={clsx(classes.iconWrapper, "flex-center")}>
          <Icons.SearchIcon />
        </div>
      </div>

      <div className={classes.sampleImgSection}>
        {images.map((image, index) => {
          return (
            <ImageItem
              key={index}
              idx={index}
              selectedImage={selectedImg}
              onClick={() => {
                setBgImg(image.src.medium)
                setSelectedImg(index)
              }}
              preview={image.src.small}
            />
          )
        })}
      </div>
    </div>
  )
}

const ImageItem = ({
  idx,
  preview,
  onClick,
  selectedImage,
}: {
  idx: number
  preview: any
  onClick?: (option: any) => void
  selectedImage: number
}) => {
  return (
    <div onClick={onClick} className={clsx("pointer p-relative", classes.imageItemSection, "flex-center")}>
      <div className={clsx("p-absolute", classes.imageItem)} />
      <img src={preview} className={classes.imagePreview} />
      {selectedImage === idx && (
        <div className={classes.selectedIcon}>
          <Icons.Selection size={"24"} />
        </div>
      )}
    </div>
  )
}

export default StockImages

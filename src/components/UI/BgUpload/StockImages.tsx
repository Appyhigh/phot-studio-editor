import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { images } from "~/constants/mock-data"
import { useEditor } from "@layerhub-io/react"
import { backgroundLayerType } from "~/constants/contants"
import React, { useCallback, useContext, useState } from "react"
import { toDataURL } from "~/utils/export"
import MainImageContext from "~/contexts/MainImageContext"
import { nanoid } from "nanoid"
import { changeLayerBackgroundImage } from "~/utils/updateLayerBackground"

const StockImages = () => {
  const editor = useEditor()
  const [selectedImg, setSelectedImg] = useState(-1)
  const { mainImgInfo, setMainImgInfo } = useContext(MainImageContext)

  const setBgImg = useCallback(
    async (img: string) => {
      const activeMainObject = editor.objects.findById(mainImgInfo.id)[0]
      toDataURL(img, async function (dataUrl: string) {
        const previewWithUpdatedBackground: any = await changeLayerBackgroundImage(
          activeMainObject?.metadata?.originalLayerPreview ?? activeMainObject.preview,
          dataUrl
        )
        const options = {
          type: "StaticImage",
          src: previewWithUpdatedBackground,
          preview: previewWithUpdatedBackground,
          original: mainImgInfo.original,

          id: nanoid(),
          metadata: {
            generationDate: new Date().getTime(),
            originalLayerPreview: activeMainObject?.metadata?.originalLayerPreview ?? activeMainObject.preview,
          },
        }
        editor.objects.removeById(mainImgInfo.id)
        editor.objects.add(options).then(() => {
          //@ts-ignore
          setMainImgInfo((prev) => ({ ...prev, ...options }))
        })
      })
    },
    [mainImgInfo, selectedImg]
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

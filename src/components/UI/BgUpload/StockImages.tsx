import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { images } from "~/constants/mock-data"
import { useEditor } from "@layerhub-io/react"
import { backgroundLayerType } from "~/constants/contants"
import React, { useEffect, useState } from "react"
import { getStockImages } from "~/services/stockApi"

const StockImages = () => {
  const editor = useEditor()
  const [selectedImg, setSelectedImg] = useState(-1)
  const [res, setRes] = useState<any[]>([])

  useEffect(() => {
    getStockImages().then((res) => {
      setRes(res)
    })
  }, [])

  const [search, setSearch] = useState("")
  const searchImages = (e: any) => {
    console.log("value", search)
    if (search) {
      const filteredImages = res.filter((image) => {
        return image.tags.includes(search)
      })
      setRes(filteredImages)
    } else if (search === "") {
      getStockImages().then((res) => {
        setRes(res)
      })
    } else {
      setRes(res)
    }
  }

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
        <input className={classes.textInput} onChange={(e) => setSearch(e.target.value)} />
        <button className={clsx(classes.iconWrapper, "flex-center")} onClick={searchImages}>
          <Icons.SearchIcon />
        </button>
      </div>

      <div className={classes.sampleImgSection}>
        {res.map((image, index) => {
          return (
            <ImageItem
              key={index}
              idx={index}
              selectedImage={selectedImg}
              onClick={() => {
                setBgImg(image.largeImageURL)
                setSelectedImg(index)
              }}
              preview={image.previewURL}
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

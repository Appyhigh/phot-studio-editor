import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { useCallback, useContext, useRef, useState } from "react"
import Scrollbars from "@layerhub-io/react-custom-scrollbar"
import { Block } from "baseui/block"
import SearchIcon from "~/components/Icons/SearchIcon"
import { selectStyleApi } from "~/services/selectStyleApi"
import usePagination from "~/hooks/usePagination"
import TextToArtContext from "~/contexts/TextToArtContext"
import LoaderSpinner from "../../../views/Public/images/loader-spinner.svg"
import { HandleStyleImageClick } from "~/views/DesignEditor/utils/functions/HandleStyleImageClick"

const SelectStyle = (props: any) => {
  const { search, setSearch }: any = useState()
  const [page, setPage] = useState(1)
  const { res, more, loading, result } = usePagination("style", selectStyleApi, search, page)
  const { styleImage, setStyleImage } = useContext(TextToArtContext)
  const { textToArtInputInfo, setTextToArtInputInfo } = useContext(TextToArtContext)

  const observer = useRef<any>()

  const lastElementRef = useCallback(
    (element?: any) => {
      if (observer.current) observer.current.disconnect()

      if (!more) return

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && more) setPage((prev) => prev + 1)
      })

      if (element) observer.current.observe(element)
    },
    [more]
  )

  const searchImages = () => {
    console.log("context", styleImage)
  }

  return (
    <div className={classes.selectStyleContainer}>
      <Block className={classes.selectStyleHeading}>Style</Block>
      <div className={classes.selectStyleSearch}>
        <div className={classes.searchIcon}>
          <SearchIcon color={"#92929D"} />
        </div>
        <input
          className={classes.textInput}
          placeholder="Search"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchImages()
            }
          }}
        />
      </div>
      <Scrollbars style={{ height: props?.height ? props.height : "30rem", margin: "0.5rem 0" }}>
        <Block className={classes.selectStyleImages}>
          {result.map((image: any, index: any) => {
            const isSelected = styleImage.has(image)
            return (
              <div ref={index === result.length - 1 ? lastElementRef : undefined} key={index}>
                <ImageItem
                  idx={index}
                  selectedImage={isSelected}
                  onClick={() =>
                    HandleStyleImageClick(
                      styleImage,
                      setStyleImage,
                      textToArtInputInfo,
                      setTextToArtInputInfo,
                      index,
                      image
                    )
                  }
                  preview={image.image_link}
                  name={image.name}
                />
              </div>
            )
          })}
        </Block>
        {loading && <img className={classes.stylesLoader} src={LoaderSpinner} />}
      </Scrollbars>
    </div>
  )
}

const ImageItem = ({
  idx,
  preview,
  onClick,
  selectedImage,
  name,
}: {
  idx: number
  preview: any
  onClick?: (option: any) => void
  selectedImage: any
  name: string
}) => {
  return (
    <div>
      <div onClick={onClick} className={clsx("pointer p-relative", classes.imageItemSection, "flex-center")}>
        <div className={clsx("p-absolute", classes.imageItem)} />
        <img src={preview} className={classes.imagePreview} />
        {selectedImage && (
          <div className={classes.selectedIcon}>
            <Icons.Selection size={"24"} />
          </div>
        )}
      </div>
      <div className={classes.imageItemName}>{name}</div>
    </div>
  )
}

export default SelectStyle

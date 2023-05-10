import React, { useState } from "react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { images } from "~/constants/mock-data"
import { useEditor } from "@layerhub-io/react"
import Uploads from "../UploadDropzone/Uploads"
import SwiperWrapper from "../Swiper/Swiper"
import { BgOptions } from "~/views/DesignEditor/utils/BgOptions"
import { LabelLarge } from "baseui/typography"
import classes from "./style.module.css"
import clsx from "clsx"

const Images = () => {
  const editor = useEditor()
  const [trySampleImgShow, setTrySampleImgShow] = useState(true)
  const [showBgOptions, setShowBgOptions] = useState(false)
  const [selectedBgOption, setSelectedBgOption] = useState({
    type: -1,
    id: 0,
  })

  const handleBgChangeOption = ({ type, idx }: { type: number; idx: number }) => {
    setSelectedBgOption({ type: type, id: idx })
  }

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
          preview: url,
          metadata: { generationDate: new Date().getTime() },
        }
        editor.objects.add(options)
      }
    },
    [editor]
  )
  const handleCloseSampleImg = () => {
    setTrySampleImgShow(!trySampleImgShow)
  }

  const handleCloseBgOptions = () => {
    setShowBgOptions(!showBgOptions)
  }

  return (
    <Block className="d-flex flex-1 flex-column">
      <Uploads handleCloseSampleImg={handleCloseSampleImg} handleCloseBgOptions={handleCloseBgOptions} />
      {trySampleImgShow && (
        <>
          {" "}
          <Block className={clsx(classes.tryImgHeading, "d-flex align-items-center justify-content-start mb-3")}>
            Try Sample Images
          </Block>
          <Scrollable>
            <Block className="py-3">
              <Block className={classes.sampleImgSection}>
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
      )}

      {showBgOptions && (
        <>
          {" "}
          <Block className="mt-4">
            <Block className={clsx("d-flex  flex-row", classes.bgOptionsSection)}>
              <Block className={clsx(classes.tabSection, classes.leftOption)}>Backgrounds</Block>
              <Block className={clsx(classes.tabSection, classes.rightSection)}>Upload</Block>
            </Block>
          </Block>
          <Scrollable>
            <Block className="mt-2">
              {BgOptions.map((each, index) => (
                <Block key={index}>
                  <Block className={clsx("d-flex align-items-center justify-content-start", classes.bgOptionHeading)}>
                    <LabelLarge> {each.heading}</LabelLarge>
                  </Block>
                  <SwiperWrapper
                    type={index}
                    selectedBgOption={selectedBgOption}
                    handleBgChangeOption={handleBgChangeOption}
                    data={each.options}
                  />
                </Block>
              ))}
            </Block>
          </Scrollable>
        </>
      )}
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

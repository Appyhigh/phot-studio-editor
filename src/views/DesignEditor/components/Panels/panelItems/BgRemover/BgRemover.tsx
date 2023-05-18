import React, { useContext, useState } from "react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { useActiveObject, useEditor, useObjects } from "@layerhub-io/react"
import Uploads from "../UploadDropzone/Uploads"
import SwiperWrapper from "../Swiper/Swiper"
import { BgOptions } from "~/views/DesignEditor/utils/BgOptions"
import { LabelLarge } from "baseui/typography"
import classes from "./style.module.css"
import clsx from "clsx"
import BgUpload from "~/components/UI/BgUpload/BgUpload"
import Loader from "~/components/UI/Loader/Loader"
import LoaderContext from "~/contexts/LoaderContext"
import { BgSampleImages } from "~/constants/bg-sample-images"
import UploadPreview from "../UploadPreview/UploadPreview"
import { toDataURL } from "~/utils/export"
import Icons from "~/components/Icons"
import { nanoid } from "nanoid"
import MainImageContext from "~/contexts/MainImageContext"

const BgRemover = () => {
  const editor = useEditor()
  const [backgroundChoice, setBackgroundChoice] = useState(0)
  const [selectedBgOption, setSelectedBgOption] = useState({
    type: -1,
    id: 0,
  })
  const objects = useObjects()
  const activeObject = useActiveObject()

  const { loaderPopup } = useContext(LoaderContext)
  const { mainImgInfo, setMainImgInfo, panelInfo, setPanelInfo } = useContext(MainImageContext)
  const handleBgChangeOption = ({ type, idx }: { type: number; idx: number }) => {
    setSelectedBgOption({ type: type, id: idx })
  }

  const addObject = React.useCallback(
    (url: string) => {
      // @ts-ignore
      setPanelInfo((prev) => ({ ...prev, bgRemoverBtnActive: true }))

      toDataURL(url, async function (dataUrl: string) {
        if (editor) {
          const options = {
            type: "StaticImage",
            src: dataUrl,
            preview: dataUrl,
            id: nanoid(),
            original: dataUrl,
            metadata: { generationDate: new Date().getTime() },
          }
          setPanelInfo((prev: any) => ({
            ...prev,
            UploadPreview: true,
            bgOptions: false,
            trySampleImg: false,
            uploadSection: false,
          }))
          editor.objects.add(options)
          setMainImgInfo((prev: any) => ({ ...prev, ...options }))
        }
      })
    },
    [editor]
  )

  const discardSampleImageHandler = (id: string) => {
    setMainImgInfo((prev: any) => ({ ...prev, id: "" }))
    setPanelInfo((prev: any) => ({
      ...prev,
      UploadPreview: false,
      bgOptions: false,
      trySampleImg: true,
      uploadSection: true,
    }))
    editor.objects.removeById(id)
  }

    return (
    <Block className="d-flex flex-1 flex-column">
      {mainImgInfo.id && mainImgInfo.preview ? (
        <Block>
          <Block paddingTop={"20px"}>
            {
              <div
                className="d-flex justify-content-start flex-row align-items-center pointer pl-2"
                onClick={() => {
                  //when right icon with Image is clicked set upload to intital state
                  setMainImgInfo((prev: any) => ({ ...prev, id: "" }))
                  setPanelInfo((prev: any) => ({
                    ...prev,
                    uploadPreview: false,
                    bgOptions: false,
                    uploadSection: true,
                    trySampleImg: true,
                    bgRemoveBtnActive: false,
                  }))
                }}
              >
                <Icons.ChevronRight size="16" /> <Block className={clsx(classes.panelHeading)}>Image</Block>
              </div>
            }
          </Block>
          <Block className={classes.uploadInputWrapper}>
            <div
              className={clsx(
                classes.uploadPreviewSection,

                "d-flex align-items-center pointer"
              )}
            >
              <UploadPreview discardHandler={discardSampleImageHandler} />
            </div>
          </Block>
        </Block>
      ) : (
        <>
          <Uploads />
        </>
      )}
      {panelInfo.trySampleImg && (
        <>
          {" "}
          <Block className={clsx(classes.tryImgHeading, "d-flex align-items-center justify-content-start mb-3")}>
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
              </Block>
            </Block>
          </Scrollable>
        </>
      )}

      {panelInfo.bgOptions && (
        <>
          {" "}
          <Block className="mt-4">
            <Block className={clsx("d-flex  flex-row", classes.bgOptionsSection)}>
              <Block
                className={clsx(
                  classes.tabSection,
                  classes.leftOption,
                  backgroundChoice === 0 && classes.selectedBgChoice
                )}
                onClick={() => setBackgroundChoice(0)}
              >
                Background
              </Block>
              <Block
                className={clsx(
                  classes.tabSection,
                  classes.rightOption,
                  backgroundChoice === 1 && classes.selectedBgChoice
                )}
                onClick={() => setBackgroundChoice(1)}
              >
                Upload
              </Block>
            </Block>
          </Block>
          <Scrollable>
            {backgroundChoice === 0 ? (
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
            ) : (
              <BgUpload />
            )}
          </Scrollable>
        </>
      )}
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

export default BgRemover

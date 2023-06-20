import { IMAGE_UPSCALER } from "~/constants/contants"
import Uploads from "../UploadDropzone/Uploads"
import classes from "./style.module.css"
import useAppContext from "~/hooks/useAppContext"
import clsx from "clsx"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { bgSampleImagesApi } from "~/services/bgSampleImagesApi"
import React, { useContext, useEffect, useState } from "react"
import ImageUpScalerContext from "~/contexts/ImageUpScalerContext"
import { useEditor } from "@layerhub-io/react"
import { nanoid } from "nanoid"
import CreditsSection from "~/components/CreditsSection/CreditsSection"
import Icons from "~/components/Icons"
import LoaderSpinner from "../../../../../Public/images/loader-spinner.svg"
import ImagesContext from "~/contexts/ImagesCountContext"
import { AddObjectFunc } from "~/views/DesignEditor/utils/functions/AddObjectFunc"
import { img2Upscaler, img4Upscaler } from "~/utils/imgUpscaler"
import ErrorContext from "~/contexts/ErrorContext"

const ImageUpscaler = () => {
  const { activePanel } = useAppContext()
  const [imageLoading, setImageLoading] = useState(false)
  const editor = useEditor()
  const [currentActiveImg, setCurrentActiveImg] = useState(-1)
  const { setImagesCt } = useContext(ImagesContext)

  const { bgSampleImages, setBgSampleImages } = useAppContext()
  useEffect(() => {
    const fetchSampleImages = async () => {
      const result = await bgSampleImagesApi()
      setBgSampleImages(result)
    }

    fetchSampleImages()
  }, [])

  const { imgScalerPanelInfo, setImgScalerInfo, setImgScalerPanelInfo, imgScalerInfo } =
    useContext(ImageUpScalerContext)
  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
          preview: url,
          id: nanoid(),
          original: url,
          url: url,
          metadata: { generationDate: new Date().getTime() },
        }
        // @ts-ignore
        setImgScalerPanelInfo((prev) => ({ ...prev, trySampleImg: false, uploadSection: false, uploadPreview: true }))
        // @ts-ignore
        setImgScalerInfo((prev) => ({ ...prev, src: url, id: options.id, original: url }))
      }
    },
    [editor]
  )

  const { setErrorInfo } = useContext(ErrorContext)

  const generateImg2Scaler = () => {
    setImageLoading(true)
    // @ts-ignore
    setImgScalerPanelInfo((prev) => ({ ...prev, resultSectionVisible: true }))

    img2Upscaler(imgScalerInfo.src)
      .then((response) => {
        setImageLoading(false)
        // @ts-ignore
        setImgScalerInfo((prev) => ({ ...prev, result: [response] }))
      })
      .catch((error) => {
        setImageLoading(false)
        // @ts-ignore
        setImgScalerPanelInfo((prev) => ({ ...prev, resultSectionVisible: false }))
        // @ts-ignore
        setErrorInfo((prev) => ({
          ...prev,
          showError: true,
          errorMsg: "Some error has occurred",
          retryFn: () => {
            // @ts-ignore
            setErrorInfo((prev) => ({ ...prev, showError: false }))
            generateImg2Scaler()
          },
        }))
        setTimeout(() => {
          // @ts-ignore
          setErrorInfo((prev) => ({ ...prev, showError: false }))
        }, 5000)
        console.error("Error:", error)
      })
  }

  const generateImg4Scaler = () => {
    setImageLoading(true)
    // @ts-ignore
    setImgScalerPanelInfo((prev) => ({ ...prev, resultSectionVisible: true }))

    img4Upscaler(imgScalerInfo.src)
      .then((response) => {
        setImageLoading(false)
        // @ts-ignore
        setImgScalerInfo((prev) => ({ ...prev, result: [response] }))
      })
      .catch((error) => {
        setImageLoading(false)
        // @ts-ignore
        setImgScalerPanelInfo((prev) => ({ ...prev, resultSectionVisible: false }))
        // @ts-ignore
        setErrorInfo((prev) => ({
          ...prev,
          showError: true,
          errorMsg: "Some error has occurred",
          retryFn: () => {
            // @ts-ignore
            setErrorInfo((prev) => ({ ...prev, showError: false }))
            generateImg2Scaler()
          },
        }))
        setTimeout(() => {
          // @ts-ignore
          setErrorInfo((prev) => ({ ...prev, showError: false }))
        }, 5000)
        console.error("Error:", error)
      })
  }

  return (
    <div className="d-flex flex-1 flex-column">
      {!imgScalerPanelInfo.resultSectionVisible ? (
        <>
          <Uploads activePanel={activePanel} uploadType={IMAGE_UPSCALER} />{" "}
          {imgScalerPanelInfo.uploadPreview && (
            <div>
              <div className={classes.scaleSection}>
                <div className={classes.tryImgHeading}>Scale</div>
                <div className={classes.scaleBox}>
                  <div
                    className={clsx(classes.scaleInput, imgScalerInfo.scaler === 2 && classes.activeScale)}
                    onClick={() => {
                      // @ts-ignore
                      setImgScalerInfo((prev) => ({ ...prev, scaler: 2 }))
                    }}
                  >
                    2x
                  </div>
                  <div
                    className={clsx(classes.scaleInput, imgScalerInfo.scaler === 4 && classes.activeScale)}
                    onClick={() => {
                      // @ts-ignore
                      setImgScalerInfo((prev) => ({ ...prev, scaler: 4 }))
                    }}
                  >
                    {" "}
                    4x
                  </div>
                </div>
              </div>
              {/* hide for now credits related  */}
              {/* <CreditsSection /> */}
              <button
                className={classes.generateBtn}
                onClick={() => {
                  if (imgScalerInfo.scaler === 2) {
                    generateImg2Scaler()
                  } else generateImg4Scaler()
                }}
              >
                Generate
              </button>
              {/* <p className={classes.freeImgText}>*1/5 free images left</p> */}
            </div>
          )}
          {imgScalerPanelInfo.trySampleImg && (
            <>
              <Block className={clsx(classes.tryImgHeading, "d-flex align-items-center justify-content-start mb-3")}>
                Try Sample Images
              </Block>
              <Scrollable>
                <Block className="py-3">
                  <Block className={classes.sampleImgSection}>
                    {bgSampleImages.map((image: any, index) => {
                      return (
                        <ImageItem
                          key={index}
                          onClick={() => {
                            addObject(image.originalImage)
                          }}
                          preview={image.originalImage}
                          imageLoading={imageLoading}
                        />
                      )
                    })}
                  </Block>
                </Block>
              </Scrollable>
            </>
          )}
        </>
      ) : (
        <div className={classes.resultSection}>
          <Block
            onClick={() => {
              // @ts-ignore
              setImgScalerPanelInfo((prev) => ({ ...prev, resultSectionVisible: false }))
              // @ts-ignore
              setImgScalerInfo((prev) => ({ ...prev, result: [] }))
            }}
            $style={{ cursor: "pointer", display: "flex" }}
            className={classes.chevronRightIcon}
          >
            <Icons.ChevronRight fill="#000" size={"20"} />
          </Block>

          <div className={classes.resultImages}>
            {imgScalerInfo.result.map((each, _idx) => {
              return (
                <div
                  className={clsx("pointer", classes.eachImg, currentActiveImg === _idx && classes.currentActiveImg)}
                  key={_idx}
                >
                  {
                    <img
                      src={each}
                      alt="result-img"
                      onClick={() => {
                        setCurrentActiveImg(_idx)
                        let latest_ct = 0
                        setImagesCt((prev: any) => {
                          latest_ct = prev + 1
                          AddObjectFunc(each, editor, 0, 0, 0, (latest_ct = latest_ct))
                          return prev + 1
                        })
                      }}
                    />
                  }
                  <div className={classes.resultLabel}>{imgScalerInfo.scaler}x</div>
                </div>
              )
            })}
            {imageLoading && (
              <div className={classes.skeletonBox}>{<img className={classes.imagesLoader} src={LoaderSpinner} />} </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const ImageItem = ({
  preview,
  onClick,
  imageLoading,
}: {
  preview: any
  onClick?: (option: any) => void
  imageLoading: boolean
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx("pointer p-relative", classes.imageItemSection)}
      style={{ pointerEvents: imageLoading ? "none" : "auto" }}
    >
      <div className={clsx("p-absolute", classes.imageItem)} />
      <img src={preview} className={classes.imagePreview} />
    </div>
  )
}

export default ImageUpscaler

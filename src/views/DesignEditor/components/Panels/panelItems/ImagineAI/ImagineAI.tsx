import { Block } from "baseui/block"
import { useContext, useEffect, useRef, useState } from "react"
import TextToArtContext from "~/contexts/TextToArtContext"
import classes from "./style.module.css"
import clsx from "clsx"
import Icons from "~/components/Icons"
import LoaderSpinner from "../../../../../Public/images/loader-spinner.svg"
import ToggleBtn from "~/components/UI/ToggleBtn/ToggleBtn"
import Scrollable from "~/components/Scrollable"
import AspectRatioSwiper from "~/components/UI/AspectRatioSwiper/AspectRatioSwiper"
import { useEditor, useFrame } from "@layerhub-io/react"
import { AddObjectFunc } from "~/views/DesignEditor/utils/functions/AddObjectFunc"
import ImagesContext from "~/contexts/ImagesCountContext"
import SliderInput from "~/components/UI/SliderInput/SliderInput"
import { aspectRatio } from "~/views/DesignEditor/utils/AspectRatio"
import ArrowOpen from "~/components/Icons/ArrowOpen"
import SelectStyle from "~/components/UI/SelectStyle/SelectStyle"
import StyleSwiper from "~/components/UI/SelectStyle/StyleSwiper"
import imagineAiController from "~/utils/imagineAiController"
import LoginPopup from "~/views/DesignEditor/components/LoginPopup/LoginPopup"
import { getCookie } from "~/utils/common"
import { COOKIE_KEYS } from "~/utils/enum"

import ErrorContext from "~/contexts/ErrorContext"

import UploadInputImg from "~/components/UI/UploadInputImg/UploadInputImg"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"
import BaseButton from "~/components/UI/Button/BaseButton"
import Prompt from "~/components/Prompt/Prompt"
import ImagesCount from "~/components/ImagesCount/ImagesCount"
import { UpdateObjectFunc } from "~/views/DesignEditor/utils/functions/UpdateObjectFunc"
import FileError from "~/components/UI/Common/FileError/FileError"

const ImagineAI = () => {
  const { textToArtInputInfo, textToArtpanelInfo, setTextToArtInputInfo, setTextToArtPanelInfo } =
    useContext(TextToArtContext)
  const { setImagesCt } = useContext(ImagesContext)
  const [currentActiveImg, setCurrentActiveImg] = useState(-1)
  const [imagesLoading, setImagesLoading] = useState(false)
  const editor = useEditor()
  const leftPanelRef = useRef()
  const { styleImage, setStyleImage } = useContext(TextToArtContext)
  const [selectStyleDisplay, setSelectStyleDisplay] = useState(false)
  const selectStyleRef = useRef<HTMLDivElement>(null)
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const { setErrorInfo } = useContext(ErrorContext)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectStyleRef.current && !selectStyleRef.current.contains(event.target as Node)) {
        setSelectStyleDisplay(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])




  useEffect(() => {
    setTextToArtInputInfo((prev: any) => ({
      ...prev,
      id: "",
      prompt: "",
      style: [],
      images_generation_ct: 1,
      image_wt: 5.6,
      uploaded_img: "",
      negative_prompt_visible: false,
      negative_prompt: "",
      cfg_scale: 7.5,
      aspect_ratio: "1:1",
      showclearTooltip: false,
      isError: false,
    }))
    setTextToArtPanelInfo((prev: any) => ({ ...prev, resultSectionVisible: false, resultImages: [] }))
  }, [])

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the clearField is open and the clicked target is not within the clearfield,
      // then close the clearfield
      // @ts-ignore
      if (leftPanelRef?.current && !leftPanelRef?.current?.contains(e.target)) {
        setTextToArtInputInfo((prev: any) => ({
          ...prev,
          showclearTooltip: false,
        }))
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [textToArtInputInfo.showclearTooltip])

  const generateImage = () => {
    if (getCookie(COOKIE_KEYS.AUTH) == "invalid_cookie_value_detected") {
      setShowLoginPopup(true)
      setTextToArtInputInfo((prev: any) => ({ ...prev, isError: false }))
    } else {
      setImagesLoading(true)
      setTextToArtPanelInfo((prev: any) => ({ ...prev, resultSectionVisible: true, isError: false }))
      imagineAiController(
        textToArtInputInfo.prompt,
        textToArtInputInfo.cfg_scale,
        textToArtInputInfo.image_wt,
        textToArtInputInfo.negative_prompt,
        textToArtInputInfo.images_generation_ct,
        textToArtInputInfo.aspect_ratio,
        textToArtInputInfo.style,
        textToArtInputInfo.uploaded_img
      )
        .then((responseData) => {
          addImgToCanvas(responseData["data"]["image"][0])
          setCurrentActiveImg(0)
          // @ts-ignore
          setErrorInfo((prev) => ({ ...prev, showError: false }))
          setTextToArtPanelInfo((prev: any) => ({
            ...prev,
            resultImages: [...responseData["data"]["image"], ...prev.resultImages],
          }))
          setImagesLoading(false)
        })
        .catch((error) => {
          setImagesLoading(false)
          // @ts-ignore
          setTextToArtInputInfo((prev) => ({ ...prev, isError: true }))
          console.error("Error:", error)
        })
    }
  }

  const frame = useFrame()

  const addImgToCanvas = async (imageUrl: string) => {
    if (currentActiveImg == -1) {
      await getDimensions(imageUrl, (img: any) => {
        let latest_ct = 0
        setImagesCt((prev: any) => {
          latest_ct = prev + 1
          AddObjectFunc(
            imageUrl,
            editor,
            img.width,
            img.height,
            frame,
            (latest_ct = latest_ct),
            null,
            null,
            setTextToArtInputInfo
          )
          return prev + 1
        })
      })
    } else {
      UpdateObjectFunc(imageUrl, editor, frame, textToArtInputInfo)
    }
  }

  return (
    <Scrollable>
      {!textToArtpanelInfo.resultSectionVisible && (
        <Block className="d-flex flex-1 flex-column">
          {/* Prompt */}
          <Prompt
            stateInfo={textToArtInputInfo}
            setStateInfo={setTextToArtInputInfo}
            placeholder={"Oil painting, fantasy, fantasy style, japanese female wearing a blue kimono holding a katana"}
          />
          {/* Select a Style */}
          <Block className={classes.imagineItemContainer}>
            <Block className={classes.imagineItemHeading}>Select a Style</Block>
            <button className={classes.selectStyleInput} onClick={() => setSelectStyleDisplay(true)}>
              Select style
              <ArrowOpen size={14} />
            </button>
            {styleImage.size != 0 && (
              <StyleSwiper
                styleImage={styleImage}
                setStyleImage={setStyleImage}
                textToArtInputInfo={textToArtInputInfo}
                setTextToArtInputInfo={setTextToArtInputInfo}
              />
            )}
          </Block>

          {/* Select a Style popup */}
          {selectStyleDisplay && (
            <div ref={selectStyleRef}>
              <SelectStyle />
            </div>
          )}
        </Block>
      )}
      <div className={clsx(classes.section, "d-flex flex-1 flex-column mb-5")}>
        {!textToArtpanelInfo.resultSectionVisible && (
          //  @ts-ignore
          <div className={classes.inputPanel}>
            <ImagesCount stateInfo={textToArtInputInfo} setStateInfo={setTextToArtInputInfo} />
            <div className={classes.uploadImageSection}>
              <UploadInputImg />
            </div>
            <div className={classes.negativePromptSection}>
              <div className="d-flex flex-row">
                <div className={clsx(classes.artSubHeading, "mb-1")}>Negative prompt </div>
                <div className="flex-1"></div>
                <ToggleBtn
                  initialVal={textToArtInputInfo.negative_prompt_visible}
                  handleChange={(val: boolean) => {
                    // @ts-ignore
                    setTextToArtInputInfo((prev) => ({ ...prev, negative_prompt_visible: val }))
                  }}
                />
              </div>
              {textToArtInputInfo.negative_prompt_visible && (
                <div>
                  <p className={classes.paraText}>Describe what don’t want in image like colour, object or scenery!</p>
                  <input
                    className={classes.negativeInputPrompt}
                    placeholder="goldfish, pink, sunset"
                    value={textToArtInputInfo.negative_prompt}
                    onChange={(e) => {
                      setTextToArtInputInfo((prev: any) => ({ ...prev, negative_prompt: e.target.value }))
                    }}
                  />
                </div>
              )}
            </div>
            <div className={classes.cfgScaleSection}>
              <div className={clsx(classes.artSubHeading)}>CFG Scale</div>
              <p className={classes.paraText}>Indicate how your input image effect the final output</p>
              <SliderInput
                minVal={1.0}
                value={textToArtInputInfo.cfg_scale}
                maxVal={14.0}
                handleChange={(e: any) => {
                  setTextToArtInputInfo((prev: any) => ({ ...prev, cfg_scale: e }))
                }}
              />

              <div className={clsx(classes.sliderMark, "d-flex")}>
                <p>Better Quality</p>
                <div className="flex-1"></div>
                <p>Match Prompt</p>
              </div>
            </div>
            {textToArtInputInfo.uploaded_img == "" && (
              <div className={classes.aspectRatioSection}>
                <div className={clsx(classes.artSubHeading)}>Aspect Ratio</div>
                <AspectRatioSwiper
                  data={aspectRatio}
                  aspectRatioSelected={textToArtInputInfo.aspect_ratio}
                  handleChange={(x: number, y: number) => {
                    setTextToArtInputInfo((prev: any) => ({ ...prev, aspect_ratio: `${x}:${y}` }))
                  }}
                />
              </div>
            )}

            <BaseButton
              title="Generate"
              width="310px"
              margin="5px 0px 0px 20px"
              disabledBgColor="#92929d"
              fontSize="16px"
              disabled={
                textToArtInputInfo.showclearTooltip || textToArtInputInfo.prompt.trim().length == 0 ? true : false
              }
              handleClick={() => {
                generateImage()
              }}
            />
            <LoginPopup
              isOpen={showLoginPopup}
              loginPopupCloseHandler={() => {
                setShowLoginPopup(false)
              }}
            />

            <p className={classes.creditsPara}>
              <span>1 credit</span> will be used if you want to generate 3 more outputs
            </p>
            {textToArtInputInfo.showclearTooltip && (
              // @ts-ignore
              <div className={classes.clearFieldBtn} ref={leftPanelRef}>
                <div
                  className="pointer"
                  onClick={() => {
                    setStyleImage((prev: any) => ({ ...prev, styleImage: new Set<string>() }))
                    setTextToArtInputInfo((prev: any) => ({
                      ...prev,
                      id: "",
                      prompt: "",
                      style: [],
                      images_generation_ct: 1,
                      uploaded_img: "",
                      image_wt: 1.0,
                      negative_prompt_visible: false,
                      negative_prompt: "",
                      cfg_scale: 7.5,
                      aspect_ratio: "1:1",
                      showclearTooltip: false,
                    }))
                  }}
                >
                  Clear all fields
                </div>{" "}
                <div
                  className="pl-2 pointer"
                  onClick={() => {
                    setTextToArtInputInfo((prev: any) => ({
                      ...prev,
                      showclearTooltip: false,
                    }))
                  }}
                >
                  <Icons.ToolTipCross />
                </div>
              </div>
            )}
          </div>
        )}
        {textToArtpanelInfo.resultSectionVisible && (
          <div className={classes.resultSection}>
            <Block
              onClick={() => {
                setTextToArtInputInfo((prev: any) => ({ ...prev, showclearTooltip: true }))
                setTextToArtPanelInfo((prev: any) => ({ ...prev, resultSectionVisible: false, resultImages: [] }))
                setCurrentActiveImg(-1);
              }}
              $style={{ cursor: "pointer", display: "flex" }}
              className={classes.chevronRightIcon}
            >
              <Icons.ChevronRight fill="#000" size={"20"} />
            </Block>
            <div className={classes.resultImages}>
              {imagesLoading &&
                Array.from(Array(textToArtInputInfo.images_generation_ct).keys()).map((each, idx) => (
                  <div className={classes.skeletonBox} key={idx}>
                    {<img className={classes.imagesLoader} src={LoaderSpinner} />}{" "}
                  </div>
                ))}
              {textToArtpanelInfo.resultImages.map((each, idx) => (
                <div
                  className={clsx("pointer", classes.eachImg, idx === currentActiveImg && classes.currentActiveImg)}
                  key={idx}
                >
                  {
                    <img
                      src={each}
                      onClick={() => {
                        if (currentActiveImg === idx) return
                        setCurrentActiveImg(idx)
                        addImgToCanvas(each)
                      }}
                    />
                  }
                </div>
              ))}
              {textToArtInputInfo.isError &&
                !imagesLoading &&
                Array.from(Array(textToArtInputInfo.images_generation_ct).keys()).map((each, idx) => {
                  return (
                    <div className={classes.skeletonBox} key={idx}>
                      {
                        <div className={classes.retry}>
                          <Icons.RetryImg />
                        </div>
                      }{" "}
                    </div>
                  )
                })}
            </div>
            {!imagesLoading && textToArtInputInfo.isError && (
              <div style={{ position: "relative", margin: "12px 0px 0px -7px" }}>
                <FileError
                  ErrorMsg={"Oops! unable to generate your image please try again."}
                  displayError={textToArtInputInfo.isError}
                />
              </div>
            )}
            {
              <BaseButton
                disabled={imagesLoading ? true : false}
                handleClick={() => {
                  generateImage()
                }}
                width="319px"
                margin="16px 0 0 20px"
                fontSize="16px"
              >
                {textToArtInputInfo.isError && !imagesLoading ? "Retry" : "Regenerate"}
              </BaseButton>
            }
            {/* <p className={classes.creditsPara}>
              <span>*{textToArtInputInfo.images_generation_ct} credits</span> will be used if you want to generate{" "}
              {textToArtInputInfo.images_generation_ct} more outputs
            </p>
            <div className={classes.buyMorePara}>
              <a href="https://www.phot.ai/pricing">Buy Credits</a>
            </div> */}
          </div>
        )}
      </div>
    </Scrollable>
  )
}

export default ImagineAI

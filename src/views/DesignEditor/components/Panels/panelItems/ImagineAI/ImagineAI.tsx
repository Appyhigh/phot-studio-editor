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
import { useEditor } from "@layerhub-io/react"
import { AddObjectFunc } from "~/views/DesignEditor/utils/functions/AddObjectFunc"
import ImagesContext from "~/contexts/ImagesCountContext"
import SliderInput from "~/components/UI/SliderInput/SliderInput"
import { aspectRatio } from "~/views/DesignEditor/utils/AspectRatio"
import UploadInputImg from "~/components/UI/UploadInputImg/UploadInputImg"
import ArrowOpen from "~/components/Icons/ArrowOpen"
import SelectStyle from "~/components/UI/SelectStyle/SelectStyle"
import StyleSwiper from "~/components/UI/SelectStyle/StyleSwiper"
import imagineAiController from "~/utils/imagineAiController"

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
    const checkIfClickedOutside = (e: any) => {
      // If the clearFiled is open and the clicked target is not within the clearfield,
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
    setImagesLoading(true)
    setTextToArtPanelInfo((prev: any) => ({ ...prev, resultSectionVisible: true }))
    imagineAiController(
      textToArtInputInfo.prompt,
      // textToArtInputInfo.uploaded_img,
      textToArtInputInfo.cfg_scale,
      textToArtInputInfo.image_wt,
      textToArtInputInfo.negative_prompt,
      textToArtInputInfo.images_generation_ct,
      textToArtInputInfo.aspect_ratio,
      textToArtInputInfo.style
    )
      .then((responseData) => {
        setTextToArtPanelInfo((prev: any) => ({
          ...prev,
          resultImages: [...prev.resultImages, ...responseData["data"]["image"]],
        }))
        setImagesLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  return (
    <Scrollable>
      {!textToArtpanelInfo.resultSectionVisible && (
        <Block className="d-flex flex-1 flex-column">
          {/* Prompt */}
          <Block className={classes.imagineItemContainer}>
            <Block className={classes.imagineItemHeading}>Prompt</Block>
            <Block className={classes.imagineItemDesc}>
              What do you want to see, you can use a single word or complete sentence.
            </Block>
            <textarea
              className={classes.promptInput}
              placeholder="Oil painting, fantasy, fantasy style, japanese female wearing a blue kimono holding a katana"
              onChange={(e) => {
                setTextToArtInputInfo({ ...textToArtInputInfo, prompt: e.target.value })
              }}
            ></textarea>
          </Block>
          {/* Select a Style */}
          <Block className={classes.imagineItemContainer}>
            <Block className={classes.imagineItemHeading}>Select a Style</Block>
            <button className={classes.selectStyleInput} onClick={() => setSelectStyleDisplay(true)}>
              Select style
              <ArrowOpen size={14} />
            </button>
            <StyleSwiper
              styleImage={styleImage}
              setStyleImage={setStyleImage}
              textToArtInputInfo={textToArtInputInfo}
              setTextToArtInputInfo={setTextToArtInputInfo}
            />
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
            <div className={classes.imageGenerationCt}>
              <div className={classes.artSubHeading}>How many images you want to generate?</div>
              <div className="d-flex justify-content-start flex-row">
                {[1, 2, 3, 4].map((each, idx) => {
                  return (
                    <div
                      key={idx}
                      className={clsx(
                        classes.ctBox,
                        "flex-center pointer",
                        idx === 0 && "ml-0",
                        textToArtInputInfo.images_generation_ct === each && classes.selectedCtBox
                      )}
                      onClick={() => {
                        setTextToArtInputInfo((prev: any) => ({ ...prev, images_generation_ct: each }))
                      }}
                    >
                      {each}
                    </div>
                  )
                })}
              </div>
            </div>
            {/* <div className={classes.uploadImageSection}>
              <UploadInputImg />
            </div> */}
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
                maxVal={14.0}
                handleChange={(e: any) => {
                  setTextToArtInputInfo((prev: any) => ({ ...prev, cfg_scale: e / 2 }))
                }}
              />

              <div className={clsx(classes.sliderMark, "d-flex")}>
                <p>Better Quality</p>
                <div className="flex-1"></div>
                <p>Match Prompt</p>
              </div>
            </div>
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
            <button
              className={clsx(classes.generateBtn, textToArtInputInfo.showclearTooltip && classes.disabledGenBtn)}
              disabled={textToArtInputInfo.showclearTooltip ? true : false}
              onClick={() => {
                generateImage()
              }}
            >
              Generate
            </button>
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
              }}
              $style={{ cursor: "pointer", display: "flex" }}
              className={classes.chevronRightIcon}
            >
              <Icons.ChevronRight fill="#000" size={"20"} />
            </Block>
            <div className={classes.resultImages}>
              {textToArtpanelInfo.resultImages.map((each, idx) => (
                <div
                  className={clsx("pointer", classes.eachImg, idx === currentActiveImg && classes.currentActiveImg)}
                  key={idx}
                >
                  {
                    <img
                      src={each}
                      onClick={() => {
                        setCurrentActiveImg(idx)
                        let latest_ct = 0
                        setImagesCt((prev: any) => {
                          latest_ct = prev + 1
                          AddObjectFunc(each, editor, 0, 0, 0, (latest_ct = latest_ct))
                          return prev + 1
                        })
                      }}
                    />
                  }
                </div>
              ))}
              {imagesLoading &&
                Array.from(Array(textToArtInputInfo.images_generation_ct).keys()).map((each, idx) => (
                  <div className={classes.skeletonBox} key={idx}>
                    {<img className={classes.imagesLoader} src={LoaderSpinner} />}{" "}
                  </div>
                ))}
            </div>
            <button
              className={clsx(classes.generateBtn, classes.regenerateBtn, imagesLoading && classes.disabledBtn)}
              disabled={imagesLoading ? true : false}
              onClick={() => {
                generateImage()
              }}
            >
              Regenerate
            </button>
            <p className={classes.creditsPara}>
              <span>*{textToArtInputInfo.images_generation_ct} credits</span> will be used if you want to generate{" "}
              {textToArtInputInfo.images_generation_ct} more outputs
            </p>
            <div className={classes.buyMorePara}>
              <a href="https://www.phot.ai/pricing">Buy Credits</a>
            </div>
          </div>
        )}
      </div>
    </Scrollable>
  )
}

export default ImagineAI

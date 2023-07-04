import Icons from "~/components/Icons"
import classes from "./style.module.css"
import React, { useContext, useEffect, useState } from "react"
import { MODAL_IMG_UPLOAD, OBJECT_REMOVER, OBJECT_REPLACER } from "~/constants/contants"
import UploadPreview from "../../Panels/panelItems/UploadPreview/UploadPreview"
import { Block } from "baseui/block"
import Uploads from "../../Panels/panelItems/UploadDropzone/Uploads"
import BaseButton from "~/components/UI/Button/BaseButton"
import clsx from "clsx"
import Accordian from "~/components/UI/Accordian/Accordian"
import SliderBar from "~/components/UI/Common/SliderBar"
import useFabricEditor from "../../../../../../src/hooks/useFabricEditor"
import LoaderSpinner from "../../../../../views/Public/images/loader-spinner.svg"
import { sampleImg } from "~/constants/sample-images"
import { setBgImgFabricCanvas } from "~/views/DesignEditor/utils/functions/setBgImgFabricCanvas"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"
import ObjectReplacerContext from "~/contexts/ObjectReplacerContext"
import CreditsSection from "~/components/CreditsSection/CreditsSection"
import ImagesCount from "~/components/ImagesCount/ImagesCount"

const ObjectReplacer = ({ handleBrushToolTip }: any) => {
  const { fabricEditor, setFabricEditor } = useFabricEditor()
  const { objectReplacerInfo, setObjectReplacerInfo } = useContext(ObjectReplacerContext)
  const [brushSize, setBrushSize] = useState(10)
  const { canvas, objects } = fabricEditor

  const [imageLoading, setImageLoading] = useState(false)
  const [resultLoading, setResultLoading] = useState(false)
  const [selectedSampleImg, setSelectedSampleImg] = useState(-1)
  const [promptText, setPromptText] = useState("")
  const [imgGenerationCt, setImgGenerationCt] = useState(1)
  const [steps, setSteps] = useState({
    firstStep: true,
    secondStep: false,
    thirdStep: false,
    fourthStep: false,
    fifthStep: false,
  })

  const [stepsComplete, setStepsComplete] = useState({
    firstStep: true,
    secondStep: false,
    thirdStep: false,
    fourthStep: false,
    fifthStep: false,
  })

  console.log(objectReplacerInfo);
  

  const handleBrushSizeChange = (e: any) => {
    const cursor = `<svg width="${brushSize}" height="${brushSize}" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" ><circle cx="24" cy="24" r="23.5" fill="#429CB9" fill-opacity="0.43" stroke="#F8F8F8"/></svg>`
    const base64CursorString = btoa(cursor)

    setBrushSize(parseInt(e[0]))
    // @ts-ignore
    ;(canvas.freeDrawingCursor = `url('data:image/svg+xml;base64,${base64CursorString}') ${brushSize / 2} ${
      brushSize / 2
    }, auto`),
      // @ts-ignore
      (canvas.freeDrawingBrush.width = brushSize)
  }

  const handleBgImg = async (imgSrc: string) => {
    await getDimensions(imgSrc, (img: any) => {
      setBgImgFabricCanvas(imgSrc, canvas, img)
    })
  }

  useEffect(() => {
    if (steps.secondStep) {
      handleBrushToolTip(true)
      if (canvas) {
        // @ts-ignore
        canvas.isDrawingMode = true
      }
    } else {
      handleBrushToolTip(false)
      if (canvas) {
        // @ts-ignore

        canvas.isDrawingMode = false
      }
    }
  }, [steps.secondStep])

  const upload = () => (
    <>
      {objectReplacerInfo.preview ? (
        <Block>
          <UploadPreview
            discardHandler={() => {
              setObjectReplacerInfo((prev: any) => ({ ...prev, src: "", preview: "" }))
              setSelectedSampleImg(-1)
            }}
            previewHandle={() => {
              setObjectReplacerInfo((prev: any) => ({ ...prev, src: "", preview: "" }))
              setSelectedSampleImg(-1)
              setStepsComplete((prev) => ({ ...prev, firstStep: true, secondStep: false, thirdStep: false }))
            }}
            imgSrc={objectReplacerInfo.src}
            uploadType={OBJECT_REMOVER}
          />
          <div className={clsx("p-relative pointer", classes.discardBtn)}>
            <span
              onClick={() => {
                setObjectReplacerInfo((prev: any) => ({ ...prev, src: "", preview: "" }))
              }}
            >
              <Icons.Trash size={"32"} />
            </span>
          </div>
        </Block>
      ) : (
        <div className={classes.uploadWrapper}>
          <Uploads
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
            fileInputType={"ObjectReplacer"}
            uploadType={OBJECT_REPLACER}
            id={"ObjectReplacer"}
          />
        </div>
      )}
      <div style={{marginLeft:"8px"}} className={classes.sampleImagesLabel}>or try one of these for free</div>
      <div style={{marginLeft:"8px"}} className={classes.sampleImages}>
        {sampleImg.map((image, index) => (
          <div
            key={index}
            className={clsx(classes.sampleImage, "flex-center")}
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => {
              setSelectedSampleImg(index)
              setObjectReplacerInfo((prev: any) => ({ ...prev, src: image, preview: image }))
            }}
          >
            {selectedSampleImg == index && <Icons.Selection size={"24"} />}
          </div>
        ))}
      </div>
      <BaseButton
      margin="0 0px 0 8px"
        borderRadius="10px"
        title={"Continue"}
        disabled={objectReplacerInfo.src ? false : true}
        width="326px"
        height="38px"
        fontSize="14px"
        handleClick={() => {
          handleBrushToolTip(true)
          // @ts-ignore
          canvas.isDrawingMode = true
          handleBgImg(objectReplacerInfo.src)
          setSteps((prev) => ({
            ...prev,
            firstStep: false,
            secondStep: true,
            thirdStep: false,
            fourthStep: false,
            fifthStep: false,
          }))
          setStepsComplete((prev) => ({
            ...prev,
            firstStep: true,
            secondStep: true,
            thirdStep: false,
            fourthStep: false,
            fifthStep: false,
          }))
        }}
      />
    </>
  )

  const Brush = () => (
    <>
      <UploadPreview imgSrc={objectReplacerInfo.src} uploadType={MODAL_IMG_UPLOAD} />

      <div className={classes.brushInput}>
        <p>Brush</p>
        <SliderBar
          step={1}
          width={"310px"}
          minVal={5}
          maxVal={75}
          thumbSize={"20px"}
          val={[brushSize]}
          handleChange={handleBrushSizeChange}
        />
      </div>
      <div className={classes.brushActionBtn}>
        <BaseButton
          borderRadius="10px"
          title={"Redo"}
          height="38px"
          margin={"8px 8px 4px 4px"}
          width="155px"
          // @ts-ignore
          disabled={canvas?.getObjects().length >= 2 ? false : true}
          handleClick={() => {
            // @ts-ignore
            canvas?.getObjects().forEach((obj: any) => {
              if (obj.type === "path") {
                // @ts-ignore
                canvas.remove(obj)
              }
            })
            // @ts-ignore
            canvas?.clearHistory()
            setStepsComplete((prev) => ({ ...prev}))
          }}
          fontSize="14px"
          fontWeight="500"
        />
        <BaseButton
          borderRadius="10px"
          title={"Continue"}
          height="38px"
          margin={"8px 4px 4px 0px"}
          width="155px"
          fontSize="14px"
          fontWeight="500"
          // @ts-ignore
          disabled={canvas?.getObjects().length >= 2 ? false : true}
          handleClick={() => {
            handleBgImg(objectReplacerInfo.src)
            handleBrushToolTip(false)
            // @ts-ignore
            canvas.isDrawingMode = false
            // @ts-ignore
            canvas.clearHistory()
            // @ts-ignore
            canvas.getObjects().forEach((obj: any) => {
              obj.selectable = false
            })
            setSteps((prev) => ({
              ...prev,
              firstStep: false,
              secondStep: false,
              thirdStep: true,
              fourthStep: false,
              fifthStep: false,
            }))
            setStepsComplete((prev) => ({
              ...prev,
              secondStep: true,
              thirdStep: true,
              fourthStep: false,
              fifthStep: false,
            }))
            setObjectReplacerInfo((prev: any) => ({ ...prev, result: objectReplacerInfo.src }))
          }}
        />
      </div>
    </>
  )

  const Prompt = () => (
    <>
      <div className={classes.promptSection}>
        <p className={classes.prompt}>Prompt</p>
        <p className={classes.promptSub}>What do you want to see, you can use a single word or complete sentence.</p>
        <textarea
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="Write here.."
        ></textarea>
        <BaseButton
          borderRadius="10px"
          title={"Continue"}
          height="38px"
          margin={"8px 4px 4px 0px"}
          fontSize="14px"
          fontWeight="500"
          disabled={promptText.trim().length > 0 ? false : true}
          handleClick={() => {
            handleBgImg(objectReplacerInfo.src)
            setSteps((prev) => ({
              ...prev,
              firstStep: false,
              secondStep: false,
              thirdStep: false,
              fourthStep: true,
              fifthStep: false,
            }))
            setStepsComplete((prev) => ({
              ...prev,
              secondStep: true,
              thirdStep: true,
              fourthStep: true,
              fifthStep: false,
            }))
            setObjectReplacerInfo((prev: any) => ({ ...prev, prompt: promptText }))
          }}
        />
      </div>
    </>
  )

  const GenerateImages = () => (
    <>
      <div className={classes.promptSection}>
        <div className={classes.itemContainer}>
          <div className={classes.itemHeading}>How many images you want to generate?</div>
          <div className="d-flex justify-content-start flex-row">
            {[1, 2, 3, 4].map((each, idx) => {
              return (
                <div
                  key={idx}
                  className={clsx(
                    classes.ctBox,
                    "flex-center pointer",
                    idx === 0 && "ml-0",
                    imgGenerationCt === each && classes.selectedCtBox
                  )}
                  onClick={() => {
                    setImgGenerationCt(each)
                  }}
                >
                  {each}
                </div>
              )
            })}
          </div>
        </div>

        <BaseButton
          borderRadius="10px"
          title={"Continue"}
          height="38px"
          margin={"8px 4px 4px 0px"}
          fontSize="14px"
          fontWeight="500"
          handleClick={() => {
            handleBgImg(objectReplacerInfo.src)
            setSteps((prev) => ({
              ...prev,
              firstStep: false,
              secondStep: false,
              thirdStep: false,
              fourthStep: false,
              fifthStep: true,
            }))
            setStepsComplete((prev) => ({
              ...prev,
              secondStep: true,
              thirdStep: true,
              fourthStep: true,
              fifthStep: true,
            }))
          }}
        />
      </div>
    </>
  )

  const outputResult = () => (
    <>
      {" "}
      <div className={classes.resultImages}>
        <div className={clsx("pointer p-relative", classes.eachImg)}>
          {<img src={objectReplacerInfo.src} onClick={() => {}} />}

          <div className={classes.resultLabel}>{"Original"}</div>
        </div>

        {/* {resultLoading ? (
          <div className={classes.skeletonBox}>{<img className={classes.imagesLoader} src={LoaderSpinner} />} </div>
        ) : (
          <div className={clsx("pointer p-relative", classes.eachImg, classes.currentActiveImg)}>
            {<img src={objectReplacerInfo.src} onClick={() => {}} />}

            <div className={classes.resultLabel}>{"Result"}</div>
          </div>
        )} */}

        <div className={classes.skeletonBox}>{<img className={classes.imagesLoader} src={LoaderSpinner} />} </div>
      </div>
      {stepsComplete.firstStep && stepsComplete.secondStep && stepsComplete.thirdStep && (
        <BaseButton
          borderRadius="10px"
          title={"Generate 1 more"}
          height="38px"
          margin={"20px 4px 4px 0px"}
          width="320px"
          fontSize="16px"
          fontWeight="500"
          handleClick={() => {
            setSteps({
              firstStep: true,
              secondStep: false,
              thirdStep: false,
              fourthStep: false,
              fifthStep: false,
            })
            setObjectReplacerInfo((prev: any) => ({ ...prev, src: "", preview: "" }))
            setStepsComplete({
              firstStep: true,
              secondStep: false,
              thirdStep: false,
              fourthStep: false,
              fifthStep: false,
            })
          }}
        />
      )}
    </>
  )

  return (
    <div className={classes.mainPanel}>
      <div className={classes.heading}>
        <div className={classes.arrowIcon}>
          <Icons.ArrowLeft />
        </div>
        <p>Object Replacer</p>
      </div>
      <div className={classes.line}></div>

      <Accordian
        label={1}
        isOpen={steps.firstStep}
        isComplete={stepsComplete.firstStep}
        heading={"Upload / choose image"}
        children={upload()}
        handleClick={() => {
          if (stepsComplete.firstStep && !steps.firstStep) {
            setSteps((prev) => ({
              ...prev,
              firstStep: true,
              secondStep: false,
              thirdStep: false,
              fourthStep: false,
              fifthStep: false,
            }))
            setStepsComplete((prev) => ({ ...prev, thirdStep: false, fourthStep: false, fifthStep: false }))
          } else if (steps.firstStep) {
            setSteps((prev) => ({ ...prev, firstStep: false }))
          } else {
            {
            }
          }
        }}
      />
      <Accordian
        label={2}
        isOpen={steps.secondStep}
        isComplete={stepsComplete.secondStep}
        heading={"Brush over the image"}
        children={Brush()}
        handleClick={() => {
          if (stepsComplete.secondStep && !steps.secondStep) {
            setSteps((prev) => ({
              ...prev,
              secondStep: true,
              thirdStep: false,
              firstStep: false,
              fourthStep: false,
              fifthStep: false,
            }))
            setStepsComplete((prev) => ({ ...prev, thirdStep: false, fourthStep: false, fifthStep: false }))
          } else if (steps.secondStep) {
            setSteps((prev) => ({ ...prev, secondStep: false }))
          } else {
          }
        }}
      />
      <Accordian
        label={3}
        isOpen={steps.thirdStep}
        isComplete={stepsComplete.thirdStep}
        heading={"Write Prompt"}
        children={Prompt()}
        handleClick={() => {
          if (stepsComplete.thirdStep && !steps.thirdStep) {
            setSteps((prev) => ({
              ...prev,
              thirdStep: true,
              secondStep: false,
              firstStep: false,
              fourthStep: false,
              fifthStep: false,
            }))
            setStepsComplete((prev) => ({ ...prev, thirdStep: true, fourthStep: false, fifthStep: false }))
          } else if (steps.thirdStep) {
            setSteps((prev) => ({ ...prev, thirdStep: false }))
          } else {
          }
        }}
      />
      <Accordian
        label={4}
        isOpen={steps.fourthStep}
        isComplete={stepsComplete.fourthStep}
        heading={"Select number of outputs"}
        children={GenerateImages()}
        handleClick={() => {
          if (stepsComplete.fourthStep && !steps.fourthStep) {
            setSteps((prev) => ({ ...prev, fourthStep: true, thirdStep: false, firstStep: false,secondStep:false, fifthStep: false }))
            setStepsComplete((prev) => ({ ...prev, thirdStep: true, fourthStep: true, fifthStep: false }))
          } else if (steps.fourthStep) {
            setSteps((prev) => ({ ...prev, fourthStep: false }))
          } else {
          }
        }}
      />
      <Accordian
        isOpen={steps.fifthStep}
        isComplete={steps.fifthStep}
        label={5}
        heading={"Final output"}
        handleClick={() => {
          if (stepsComplete.fifthStep && !steps.fifthStep) {
            setSteps((prev) => ({ ...prev, fifthStep: true, firstStep: false, secondStep: false, fourthStep: false }))
          } else if (steps.fifthStep) {
            setSteps((prev) => ({ ...prev, fifthStep: false }))
            setStepsComplete((prev) => ({ ...prev, fifthStep: true }))
          }
        }}
        children={outputResult()}
      />
    </div>
  )
}

export default ObjectReplacer
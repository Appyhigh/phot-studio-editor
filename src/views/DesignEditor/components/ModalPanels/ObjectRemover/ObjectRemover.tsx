import Icons from "~/components/Icons"
import classes from "./style.module.css"
import React, { useContext, useEffect, useState } from "react"
import { MODAL_IMG_UPLOAD, OBJECT_REMOVER } from "~/constants/contants"
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
import ObjectRemoverContext from "~/contexts/ObjectRemoverContext"

const ObjectRemover = ({ handleBrushToolTip }: any) => {
  const { fabricEditor, setFabricEditor } = useFabricEditor()
  const { objectRemoverInfo, setObjectRemoverInfo } = useContext(ObjectRemoverContext)
  const [brushSize, setBrushSize] = useState(10)
  const { canvas, objects } = fabricEditor

  const [imageLoading, setImageLoading] = useState(false)
  const [resultLoading, setResultLoading] = useState(false)
  const [selectedSampleImg, setSelectedSampleImg] = useState(-1)
  const [steps, setSteps] = useState({
    firstStep: true,
    secondStep: false,
    thirdStep: false,
  })

  const [stepsComplete, setStepsComplete] = useState({
    firstStep: true,
    secondStep: false,
    thirdStep: false,
  })

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
      {objectRemoverInfo.preview ? (
        <Block>
          <UploadPreview
            discardHandler={() => {
              setObjectRemoverInfo((prev: any) => ({ ...prev, src: "", preview: "" }))
              setSelectedSampleImg(-1)
            }}
            previewHandle={() => {
              setObjectRemoverInfo((prev: any) => ({ ...prev, src: "", preview: "" }))
              setSelectedSampleImg(-1)
              setStepsComplete((prev) => ({ ...prev, firstStep: true, secondStep: false, thirdStep: false }))
            }}
            imgSrc={objectRemoverInfo.src}
            uploadType={OBJECT_REMOVER}
          />
          <div className={clsx("p-relative pointer", classes.discardBtn)}>
            <span
              onClick={() => {
                setObjectRemoverInfo((prev: any) => ({ ...prev, src: "", preview: "" }))
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
            fileInputType={"ObjectRemover"}
            uploadType={OBJECT_REMOVER}
            id={"ObjectRemover"}
          />
        </div>
      )}
      <div className={classes.sampleImagesLabel}>or try one of these for free</div>
      <div className={classes.sampleImages}>
        {sampleImg.map((image, index) => (
          <div
            key={index}
            className={clsx(classes.sampleImage, "flex-center")}
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => {
              setSelectedSampleImg(index)
              setObjectRemoverInfo((prev: any) => ({ ...prev, src: image, preview: image }))
            }}
          >
            {selectedSampleImg == index && <Icons.Selection size={"24"} />}
          </div>
        ))}
      </div>
      <BaseButton
        borderRadius="10px"
        title={"Continue"}
        margin={"8px 0 0 4px"}
        disabled={objectRemoverInfo.src ? false : true}
        width="315px"
        height="38px"
        fontSize="14px"
        handleClick={() => {
          handleBrushToolTip(true)
          // @ts-ignore
          canvas.isDrawingMode = true
          handleBgImg(objectRemoverInfo.src)
          setSteps((prev) => ({ ...prev, firstStep: false, secondStep: true, thirdStep: false }))
          setStepsComplete((prev) => ({ ...prev, firstStep: true, secondStep: true, thirdStep: false }))
        }}
      />
    </>
  )

  const Brush = () => (
    <>
      <UploadPreview imgSrc={objectRemoverInfo.src} uploadType={MODAL_IMG_UPLOAD} />

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
          disabled={canvas?.getObjects().length>=2?false:true}
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
            setStepsComplete((prev) => ({ ...prev, thirdStep: true }))
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
          disabled={canvas?.getObjects().length>=2?false:true}
          handleClick={() => {
            handleBgImg(objectRemoverInfo.src)
            handleBrushToolTip(false)
            // @ts-ignore
            canvas.isDrawingMode = false
            // @ts-ignore
            canvas.clearHistory()
            // @ts-ignore
            canvas.getObjects().forEach((obj: any) => {
              obj.selectable = false
            })
            setSteps((prev) => ({ ...prev, firstStep: false, secondStep: false, thirdStep: true }))
            setStepsComplete((prev) => ({ ...prev, secondStep: true, thirdStep: true }))
            setObjectRemoverInfo((prev:any)=>({...prev,result:objectRemoverInfo.src}))
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
          {<img src={objectRemoverInfo.src} onClick={() => {}} />}

          <div className={classes.resultLabel}>{"Original"}</div>
        </div>

        {resultLoading ? (
          <div className={classes.skeletonBox}>{<img className={classes.imagesLoader} src={LoaderSpinner} />} </div>
        ) : (
          <div className={clsx("pointer p-relative", classes.eachImg,classes.currentActiveImg)}>
            {<img src={objectRemoverInfo.src} onClick={() => {}} />}

            <div className={classes.resultLabel}>{"Result"}</div>
          </div>
        )}
      </div>
      {stepsComplete.firstStep && stepsComplete.secondStep && stepsComplete.thirdStep && (
        <BaseButton
          borderRadius="10px"
          title={"Remove more objects"}
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
            })
            setObjectRemoverInfo((prev: any) => ({ ...prev, src: "", preview: "" }))
            setStepsComplete({
              firstStep: true,
              secondStep: false,
              thirdStep: false,
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
        <p>Object Remover</p>
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
            setSteps((prev) => ({ ...prev, firstStep: true, secondStep: false, thirdStep: false }))
            setStepsComplete((prev) => ({ ...prev, thirdStep: false }))
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
            setSteps((prev) => ({ ...prev, secondStep: true, thirdStep: false, firstStep: false }))
            setStepsComplete((prev) => ({ ...prev, thirdStep: false }))
          } else if (steps.secondStep) {
            setSteps((prev) => ({ ...prev, secondStep: false }))
          } else {
          }
        }}
      />
      <Accordian
        isOpen={steps.thirdStep}
        isComplete={steps.thirdStep}
        label={3}
        heading={"Output"}
        handleClick={() => {
          if (stepsComplete.thirdStep && !steps.thirdStep) {
            setSteps((prev) => ({ ...prev, thirdStep: true, firstStep: false, secondStep: false }))
          } else if (steps.thirdStep) {
            setSteps((prev) => ({ ...prev, thirdStep: false }))
            setStepsComplete((prev) => ({ ...prev, thirdStep: true }))
          }
        }}
        children={outputResult()}
      />
    </div>
  )
}

export default ObjectRemover

import Icons from "~/components/Icons"
import classes from "./style.module.css"
import React, { useState } from "react"
import { MODAL_IMG_UPLOAD } from "~/constants/contants"
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
import { useCoreHandler } from "~/components/FabricCanvas/Canvas/handlers"
import { fabric } from "fabric"
import { setBgImgFabricCanvas } from "~/views/DesignEditor/utils/functions/setBgImgFabricCanvas"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"

const ObjectRemover = () => {
  const [imgUpload, setImgUpload] = React.useState<any>({
    src: "",
    preview: "",
  })
  const { fabricEditor, setFabricEditor } = useFabricEditor()

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

  const upload = () => (
    <>
      {imgUpload.preview ? (
        <Block>
          <UploadPreview
            discardHandler={() => {
              setImgUpload({ src: "", preview: "" })
              setSelectedSampleImg(-1)
            }}
            previewHandle={() => {
              setImgUpload({ src: "", preview: "" })
              setSelectedSampleImg(-1)
            }}
            imgSrc={imgUpload.src}
            uploadType={MODAL_IMG_UPLOAD}
          />
          <div className={clsx("p-relative pointer", classes.discardBtn)}>
            <span
              onClick={() => {
                setImgUpload({ src: "", preview: "" })
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
            imgUpload={imgUpload}
            setImgUpload={setImgUpload}
            fileInputType={"modalUpload"}
            uploadType={MODAL_IMG_UPLOAD}
            id={"modalUpload"}
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
              setImgUpload({
                src: image,
                preview: image,
              })
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
        disabled={imgUpload.src ? false : true}
        width="315px"
        handleClick={() => {
          // @ts-ignore
          canvas.isDrawingMode = true
          handleBgImg(imgUpload.src)
          setSteps((prev) => ({ ...prev, firstStep: false, secondStep: true, thirdStep: false }))
          setStepsComplete((prev) => ({ ...prev, firstStep: true, secondStep: true, thirdStep: false }))
        }}
      />
    </>
  )

  const Brush = () => (
    <>
      <UploadPreview imgSrc={imgUpload.src} uploadType={MODAL_IMG_UPLOAD} />

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
          handleClick={() => {
            canvas.getObjects().forEach(function (obj) {
              if (obj.type === "path") {
                canvas.remove(obj)
              }
            })
            canvas.clearHistory()
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
          handleClick={() => {
            // @ts-ignore
            canvas.isDrawingMode = false
            canvas.clearHistory()
            canvas.getObjects().forEach(function (obj) {
              obj.selectable = false
            })
            setSteps((prev) => ({ ...prev, firstStep: false, secondStep: false, thirdStep: true }))
            setStepsComplete((prev) => ({ ...prev, secondStep: true, thirdStep: true }))
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
          {<img src={imgUpload.src} onClick={() => {}} />}

          <div className={classes.resultLabel}>{"Original"}</div>
        </div>

        {resultLoading ? (
          <div className={classes.skeletonBox}>{<img className={classes.imagesLoader} src={LoaderSpinner} />} </div>
        ) : (
          <div className={clsx("pointer p-relative", classes.eachImg)}>
            {<img src={imgUpload.src} onClick={() => {}} />}

            <div className={classes.resultLabel}>{"Result"}</div>
          </div>
        )}
      </div>
      {stepsComplete.firstStep && stepsComplete.secondStep && stepsComplete.thirdStep && (
        <BaseButton
          borderRadius="10px"
          title={"Remove more objects"}
          height="38px"
          margin={"20px 4px 4px 30px"}
          width="300px"
          fontSize="14px"
          fontWeight="500"
          handleClick={() => {}}
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

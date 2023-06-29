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

const ObjectRemover = () => {
  const [imgUpload, setImgUpload] = React.useState<any>({
    src: "",
    preview: "",
  })
  const { fabricEditor, setFabricEditor } = useFabricEditor()

  const { canvas, objects } = fabricEditor

  const [brushSize, setBrushSize] = useState(10)

  const [imageLoading, setImageLoading] = useState(false)
  const [resultLoading, setResultLoading] = useState(false)

  const [steps, setSteps] = useState({
    firstStep: false,
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

  const upload = () => (
    <>
      {imgUpload.preview ? (
        <Block>
          <UploadPreview
            discardHandler={() => {
              setImgUpload({ src: "", preview: "" })
            }}
            previewHandle={() => {
              setImgUpload({ src: "", preview: "" })
            }}
            imgSrc={imgUpload.src}
            uploadType={MODAL_IMG_UPLOAD}
          />
        </Block>
      ) : (
        <Uploads
          imageLoading={imageLoading}
          setImageLoading={setImageLoading}
          imgUpload={imgUpload}
          setImgUpload={setImgUpload}
          fileInputType={"modalUpload"}
          uploadType={MODAL_IMG_UPLOAD}
          id={"modalUpload"}
        />
      )}
      <div className={classes.tryImages}>
        <div>
          <p>or try one of these for free</p>
          <div className={classes.sampleImg}>
            {Array.from(Array(5).keys()).map((each, idx) => {
              return (
                <div key={idx} className={clsx(classes.eachsampleImg, idx == 0 && classes.firstImg)}>
                  <img
                    src={
                      "https://images.pexels.com/photos/3493777/pexels-photo-3493777.jpeg?auto=compress&cs=tinysrgb&h=130"
                    }
                    key={idx}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <BaseButton
          borderRadius="10px"
          title={"Continue"}
          margin={"8px 0 0 4px"}
          disabled={imgUpload.src ? false : true}
          width="315px"
          handleClick={() => {
            setSteps((prev)=>({...prev,firstStep:true}))
          }}
        />
      </div>
    </>
  )

  const Brush = () => (
    <>
      <Block>
        <UploadPreview imgSrc={imgUpload.src} uploadType={MODAL_IMG_UPLOAD} />
      </Block>
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
          handleClick={() => {}}
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
          handleClick={() => {}}
        />
      </div>
    </>
  )

  const outputResult = () => (
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

      <Accordian isPrev={true} label={1} heading={"Upload / choose image"} isDone={steps.firstStep}  isopen={true} children={upload()} />
      <Accordian  isPrev={steps.firstStep} label={2} heading={"Brush over the image"} isDone={steps.secondStep}   children={Brush()} />
      <Accordian isPrev={steps.secondStep} label={3} heading={"Output"} 
      isopen={false}
      isDone={
        (steps.thirdStep?true:false)
      } children={outputResult()} />

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

    </div>
  )
}

export default ObjectRemover

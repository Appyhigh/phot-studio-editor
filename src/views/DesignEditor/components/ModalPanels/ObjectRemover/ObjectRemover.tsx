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
import { setBgTransparent } from "~/views/DesignEditor/utils/functions/setBgTransparent"
import { createMaskImage } from "~/views/DesignEditor/utils/functions/createMaskImg"
import { PathProps } from "~/utils/canvasUtils"
import { objectRemoverController } from "~/utils/objectRemoverController"
import LoginPopup from "../../LoginPopup/LoginPopup"
import { COOKIE_KEYS } from "~/utils/enum"
import { getCookie } from "~/utils/common"
import { useAuth } from "~/hooks/useAuth"
import ErrorContext from "~/contexts/ErrorContext"
import FileError from "~/components/UI/Common/FileError/FileError"
const ObjectRemover = ({ handleBrushToolTip }: any) => {
  const { fabricEditor, setFabricEditor } = useFabricEditor()
  const { objectRemoverInfo, setObjectRemoverInfo } = useContext(ObjectRemoverContext)
  const [brushSize, setBrushSize] = useState(10)
  const { canvas, objects } = fabricEditor
  const [paths, setPaths] = useState<PathProps[]>([])
  const [imageLoading, setImageLoading] = useState(false)
  const [resultLoading, setResultLoading] = useState(false)
  const [selectedSampleImg, setSelectedSampleImg] = useState(-1)
  const [autoCallAPI, setAutoCallAPI] = useState(false)
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const { authState } = useAuth()
  const [isError, setIsError] = useState({
    error: false,
    errorMsg: "",
  })
  const { user } = authState
  const { setErrorInfo } = useContext(ErrorContext)

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

  const extractPointsFromPath = (path: any) => {
    const points = []
    const pathArray = path.path
    for (let i = 0; i < pathArray.length; i++) {
      const point = pathArray[i]
      if (point[0] === "M" || point[0] === "L") {
        points.push({ x: point[1], y: point[2] })
      } else if (point[0] === "Q") {
        points.push({ x: point[1], y: point[2] })
        points.push({ x: point[3], y: point[4] })
      } else if (point[0] === "C") {
        points.push({ x: point[1], y: point[2] })
        points.push({ x: point[3], y: point[4] })
        points.push({ x: point[5], y: point[6] })
      }
    }
    return points
  }

  useEffect(() => {
    if (user && autoCallAPI) {
      getOutputImg()
      setAutoCallAPI(false)
    }
  }, [user, autoCallAPI])
  const getOutputImg = () => {
    if (getCookie(COOKIE_KEYS.AUTH) == "invalid_cookie_value_detected") {
      setShowLoginPopup(true)
      setAutoCallAPI(true)
    } else {
      setResultLoading(true)
      setIsError((prev: any) => ({ ...prev, error: false, errorMsg: "" }))
      objectRemoverController(objectRemoverInfo.preview, objectRemoverInfo.mask_img, objectRemoverInfo.file_name)
        .then((response) => {
          setObjectRemoverInfo((prev: any) => ({ ...prev, result: response[0] ,preview:response[0]}))
          setResultLoading(false)
          handleBgImg(response[0])
          setIsError((prev) => ({ ...prev, error: false }))
        })

        .catch((error) => {
          setIsError((prev) => ({
            ...prev,
            error: true,
            errorMsg: "Oops! unable to generate your image please try again.",
          }))
          setResultLoading(false)
          console.error("Error:", error)
        })
    }
  }

  // to get points of brush strokes

  // useEffect(() => {
  //   // @ts-ignore
  //   const points = canvas?.freeDrawingBrush._points
  //   // @ts-ignore

  //   console.log("points", canvas?.freeDrawingBrush._points)
  //   const coordinates = points?.map((point: any) => ({ x: point.x, y: point.y }))
  //   console.log(coordinates)
  //   console.log(objects)
  // }, [canvas, objects])

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
              setIsError((prev) => ({ ...prev, error: false, errorMsg: "" }))
              setObjectRemoverInfo((prev: any) => ({ ...prev, src: "", preview: "" }))
              setStepsComplete((prev) => ({ ...prev, firstStep: true, secondStep: false, thirdStep: false }))
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
                setIsError((prev) => ({ ...prev, error: false, errorMsg: "" }))
                setObjectRemoverInfo((prev: any) => ({ ...prev, src: "", preview: "", result: "" }))
                setStepsComplete((prev) => ({ ...prev, firstStep: true, secondStep: false, thirdStep: false }))
                setSteps((prev) => ({ ...prev, firstStep: true, secondStep: false, thirdStep: false }))
                setBgTransparent(canvas)
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

  useEffect(() => {
    if (steps.thirdStep) {
      getOutputImg()
    }
  }, [steps.thirdStep])

  const Brush = () => (
    <>
      <UploadPreview imgSrc={objectRemoverInfo.preview} uploadType={MODAL_IMG_UPLOAD} />

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

          disabled={canvas?.getObjects().length >= 2 ? false : true}
          handleClick={() => {
            // handleBgImg(objectRemoverInfo.src)
            handleBrushToolTip(false)
            let paths: any = []
            //  @ts-ignore
            canvas?.getObjects().forEach((obj: any, _idx: number) => {
              if (_idx >= 1) {
                const updatedPoint = extractPointsFromPath(obj)
                paths.push({ strokeWidth: obj.strokeWidth, paths: updatedPoint })
              }
            })

            const maskStr = createMaskImage({
              // @ts-ignore
              canvasWidth: canvas.getWidth(),
              // @ts-ignore
              canvasHeight: canvas.getHeight(),
              intrinsicHeight: objectRemoverInfo.height,
              intrinsicWidth: objectRemoverInfo.width,
              pathsArray: paths,
            })
            setObjectRemoverInfo((prev: any) => ({ ...prev, mask_img: maskStr }))
            // @ts-ignore
            canvas.isDrawingMode = false
            // @ts-ignore
            // canvas.clearHistory()
            // @ts-ignore
            canvas.getObjects().forEach((obj: any) => {
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
          {<img src={objectRemoverInfo.src} onClick={() => {}} />}

          <div className={classes.resultLabel}>{"Original"}</div>
        </div>

        {resultLoading ? (
          <div className={classes.skeletonBox}>{<img className={classes.imagesLoader} src={LoaderSpinner} />} </div>
        ) : isError.error ? (
          <div
            className={classes.skeletonBox}
            onClick={() => {
              setIsError((prev: any) => ({ ...prev, error: false, errorMsg: "" }))
              getOutputImg()
            }}
          >
            {
              <div className={classes.retry}>
                <Icons.Retry />
                <p>Retry</p>
              </div>
            }{" "}
          </div>
        ) : (
          <div className={clsx("pointer p-relative", classes.eachImg, classes.currentActiveImg)}>
            {<img src={objectRemoverInfo.result} onClick={() => {}} />}
            <div className={classes.resultLabel}>{"Result"}</div>
          </div>
        )}
      </div>
      {stepsComplete.firstStep &&
        stepsComplete.secondStep &&
        stepsComplete.thirdStep &&
        !resultLoading &&
        !isError.error && (
          <BaseButton
            borderRadius="10px"
            title={"Remove more objects"}
            height="38px"
            margin={"20px 4px 4px 0px"}
            width="320px"
            fontSize="16px"
            fontWeight="500"
            handleClick={() => {
              setObjectRemoverInfo((prev: any) => ({ ...prev, preview: prev.result }))
              setSteps((prev) => ({ ...prev, secondStep: true, firstStep: false, thirdStep: false }))
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
      <LoginPopup
        isOpen={showLoginPopup}
        loginPopupCloseHandler={() => {
          setShowLoginPopup(false)
        }}
      />
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
      {isError.error && (
        <div style={{ position: "relative" }}>
          <FileError ErrorMsg={isError.errorMsg} displayError={isError.error} />
        </div>
      )}
    </div>
  )
}

export default ObjectRemover

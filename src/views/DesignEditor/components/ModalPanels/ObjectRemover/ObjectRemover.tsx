import Icons from "~/components/Icons"
import classes from "./style.module.css"
import { useContext, useEffect, useState } from "react"
import { MODAL_IMG_UPLOAD, OBJECT_REMOVER, TOOL_NAMES } from "~/constants/contants"
import UploadPreview from "../../Panels/panelItems/UploadPreview/UploadPreview"
import Uploads from "../../Panels/panelItems/UploadDropzone/Uploads"
import BaseButton from "~/components/UI/Button/BaseButton"
import clsx from "clsx"
import Accordian from "~/components/UI/Accordian/Accordian"
import SliderBar from "~/components/UI/Common/SliderBar"
import useFabricEditor from "../../../../../../src/hooks/useFabricEditor"
import LoaderSpinner from "../../../../../views/Public/images/loader-spinner.svg"
import { setBgImgFabricCanvas } from "~/views/DesignEditor/utils/functions/setBgImgFabricCanvas"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"
import ObjectRemoverContext from "~/contexts/ObjectRemoverContext"
import { setBgTransparent } from "~/views/DesignEditor/utils/functions/setBgTransparent"
import { createMaskImage } from "~/views/DesignEditor/utils/functions/createMaskImg"
import { PathProps } from "~/utils/canvasUtils"
import { objectRemoverController } from "~/utils/objectRemoverController"
import { COOKIE_KEYS } from "~/utils/enum"
import { getCookie } from "~/utils/common"
import { useAuth } from "~/hooks/useAuth"
import ErrorContext from "~/contexts/ErrorContext"
import FileError from "~/components/UI/Common/FileError/FileError"
import useAppContext from "~/hooks/useAppContext"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import SampleImagesContext from "~/contexts/SampleImagesContext"
import CanvasLoaderContext from "~/contexts/CanvasLoaderContext"

const ObjectRemover = ({ handleBrushToolTip }: any) => {
  const { fabricEditor } = useFabricEditor()
  const { objectRemoverInfo, setObjectRemoverInfo } = useContext(ObjectRemoverContext)
  const [brushSize, setBrushSize] = useState(10)
  const { canvas } = fabricEditor
  const [paths, setPaths] = useState<PathProps[]>([])
  const [imageLoading, setImageLoading] = useState(false)
  const [resultLoading, setResultLoading] = useState(false)
  const [selectedSampleImg, setSelectedSampleImg] = useState(-1)
  const [autoCallAPI, setAutoCallAPI] = useState(false)
  const [callAPI, setCallAPI] = useState(false)
  const { setActivePanel } = useAppContext()
  const [currentActiveImg, setCurrentActiveImg] = useState(1)
  const { setCanvasLoader } = useContext(CanvasLoaderContext)

  // @ts-ignore
  const { authState, setAuthState } = useAuth()
  const [isError, setIsError] = useState({
    error: false,
    errorMsg: "",
  })
  const { user, showLoginPopUp } = authState
  const { setErrorInfo } = useContext(ErrorContext)
  const { sampleImages } = useContext(SampleImagesContext)

  const [steps, setSteps] = useState({
    firstStep: true,
    secondStep: false,
    thirdStep: false,
  })

  const [stepsComplete, setStepsComplete] = useState({
    firstStep: false,
    secondStep: false,
    thirdStep: false,
  })
  const [isVisited, setIsVisited] = useState({
    firstStep: true,
    secondStep: false,
    thirdStep: false,
  })

  const handleBrushSizeChange = (e: any) => {
    const cursor = `<svg width="${brushSize}" height="${brushSize}" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" ><circle cx="24" cy="24" r="23.5" fill="#429CB9" fill-opacity="0.43" stroke="#F8F8F8"/></svg>`
    const base64CursorString = btoa(cursor)

    setBrushSize(parseInt(e[0]))
      // @ts-ignore
      ; (canvas.freeDrawingCursor = `url('data:image/svg+xml;base64,${base64CursorString}') ${brushSize / 2} ${brushSize / 2
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

  useEffect(() => {
    if (objectRemoverInfo.src === "") {
      setSelectedSampleImg(-1)
    }
  }, [objectRemoverInfo.src])

  const getOutputImg = () => {
    if (getCookie(COOKIE_KEYS.AUTH) == "invalid_cookie_value_detected") {
      setAuthState((prev: any) => ({ ...prev, showLoginPopUp: true, toolName: TOOL_NAMES.objectRemover }))
      setAutoCallAPI(true)
    } else {
      setResultLoading(true)
      setCanvasLoader(true)
      setIsError((prev: any) => ({ ...prev, error: false, errorMsg: "" }))
      objectRemoverController(objectRemoverInfo.preview, objectRemoverInfo.mask_img, objectRemoverInfo.file_name)
        .then((response) => {
          if (response.output_urls.length === 0) {
            setIsError((prev) => ({
              ...prev,
              error: true,
              errorMsg: "Oops! unable to generate your image please try again.",
            }))
            setIsError((prev) => ({ ...prev, error: false }))
          } else {

            setObjectRemoverInfo((prev: any) => ({
              ...prev,
              result: response.output_urls[0],
              preview: response.output_urls[0],
            }))
            setCurrentActiveImg(1)
            handleBgImg(response.output_urls[0])
          }
          setResultLoading(false)
          setCallAPI(false)
          setStepsComplete((prev) => ({ ...prev, thirdStep: true }))
          setCanvasLoader(false)
          setIsError((prev) => ({ ...prev, error: false }))
        })

        .catch((error) => {
          setIsError((prev) => ({
            ...prev,
            error: true,
            errorMsg: "Oops! unable to generate your image please try again.",
          }))
          setResultLoading(false)
          setCanvasLoader(false)
          console.error("Error:", error)
        })
    }
  }

  const setDimensionOfSampleImg = async (img: any) => {
    if (img.width && img.height) {
      setObjectRemoverInfo((prev: any) => ({ ...prev, width: img.width, height: img.height }))
    } else {
      await getDimensions(img, (imgSrc: any) => {
        setObjectRemoverInfo((prev: any) => ({ ...prev, width: imgSrc.width, height: imgSrc.height }))
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

  useEffect(() => {
    return () => {
      setCanvasLoader(false)
      setObjectRemoverInfo((prev: any) => ({ ...prev, src: "", preview: "", mask_img: "", result: "" }))
    }
  }, [])

  const upload = () => (
    <>
      {objectRemoverInfo.preview ? (
        <div>
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
                setStepsComplete((prev) => ({ ...prev, firstStep: false, secondStep: false, thirdStep: false }))
                setSteps((prev) => ({ ...prev, firstStep: true, secondStep: false, thirdStep: false }))
                setBgTransparent(canvas)
                setCallAPI(false)
              }}
            >
              <Icons.Trash size={"32"} />
            </span>
          </div>
        </div>
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
      {!objectRemoverInfo.src && (
        <>
          <div className={classes.sampleImagesLabel}>or try one of these for free</div>
          <div className={classes.sampleImages}>
            <Swiper spaceBetween={15} slidesPerView={"auto"} navigation={true} modules={[Navigation]}>
              {sampleImages.objectRemover.map((image: any, index) => {
                return (
                  <SwiperSlide key={index} style={{ width: "auto", alignItems: "center" }}>
                    <div
                      key={index}
                      className={clsx(classes.sampleImage, "flex-center")}
                      style={{ backgroundImage: `url(${image.originalImage})` }}
                      onClick={() => {
                        setSelectedSampleImg(index)
                        console.log("hi", image.originalImageDimensions)
                        setDimensionOfSampleImg(image.originalImageDimensions)
                        setObjectRemoverInfo((prev: any) => ({
                          ...prev,
                          src: image.originalImage,
                          preview: image.originalImage,
                          file_name: image.file_name,
                        }))
                      }}
                    >
                      {selectedSampleImg == index && <Icons.Selection size={"24"} />}
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </>
      )}
      <BaseButton
        borderRadius="10px"
        title={"Continue"}
        margin={"0px 0 0 4px"}
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
          setStepsComplete((prev) => ({ ...prev, firstStep: true }))
          setIsVisited((prev) => ({ ...prev, secondStep: true }))
        }}
      />
    </>
  )

  useEffect(() => {
    if (steps.thirdStep && callAPI) {
      getOutputImg()
      setCallAPI(false)
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
          title={"Undo"}
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
            if (!user) return setAuthState((prev: any) => ({ ...prev, showLoginPopUp: true, toolName: TOOL_NAMES.objectRemover }))
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
            setIsVisited((prev) => ({ ...prev, thirdStep: true }))
            setStepsComplete((prev) => ({ ...prev, secondStep: true }))
            setCallAPI(true)
          }}
        />
      </div>
    </>
  )

  const outputResult = () => (
    <>
      {" "}
      <div className={classes.resultImages}>
        <div
          className={clsx("pointer p-relative", classes.eachImg, currentActiveImg === 0 && classes.currentActiveImg)}
        >
          {
            <img
              src={objectRemoverInfo.src}
              onClick={() => {
                if (currentActiveImg === 0) return
                setCurrentActiveImg(0)
                handleBgImg(objectRemoverInfo.src)
              }}
            />
          }

          <div className={classes.resultLabel}>{"Original"}</div>
        </div>

        {resultLoading ? (
          <div className={classes.skeletonBox}>{<img className={classes.imagesLoader} src={LoaderSpinner} />} </div>
        ) : isError.error ? (
          <div className={classes.skeletonBox}>
            {
              <div className={classes.retry}>
                <Icons.RetryImg />
              </div>
            }{" "}
          </div>
        ) : (
          <div
            className={clsx("pointer p-relative", classes.eachImg, currentActiveImg === 1 && classes.currentActiveImg)}
          >
            {
              <img
                src={objectRemoverInfo.result}
                onClick={() => {
                  if (currentActiveImg === 1) return
                  setCurrentActiveImg(1)
                  handleBgImg(objectRemoverInfo.result)
                }}
              />
            }
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
              setCallAPI(false)
              setSteps((prev) => ({ ...prev, secondStep: true, firstStep: false, thirdStep: false }))
            }}
          />
        )}
    </>
  )

  return (
    <div className={classes.mainPanel}>
      <div className={classes.heading}>
        <div
          onClick={() => {
            setActivePanel(null as any)
            setObjectRemoverInfo((prev: any) => ({ ...prev, src: "", preview: "", mask_img: "", result: [] }))
          }}
          className={classes.arrowIcon}
        >
          <Icons.ArrowLeft />
        </div>
        <p>Object Remover</p>
      </div>
      <div className={classes.line}></div>

      <div style={{ height: "75vh", overflowY: "scroll", paddingBottom: "40px" }}>
        <Accordian
          label={1}
          isVisited={isVisited.firstStep}
          isOpen={steps.firstStep}
          isComplete={stepsComplete.firstStep}
          heading={"Upload / choose image"}
          children={upload()}
          handleClick={() => {
            if (isVisited.firstStep && !steps.firstStep) {
              setSteps((prev) => ({ ...prev, firstStep: true, secondStep: false, thirdStep: false }))
            } else if (isVisited.firstStep && steps.firstStep) {
              setSteps((prev) => ({ ...prev, firstStep: false, secondStep: false, thirdStep: false }))
            }
          }}
        />
        <Accordian
          label={2}
          isVisited={isVisited.secondStep}
          isOpen={steps.secondStep}
          isComplete={stepsComplete.secondStep}
          heading={"Brush over the image"}
          children={Brush()}
          handleClick={() => {
            if (isVisited.secondStep && !steps.secondStep) {
              setSteps((prev) => ({ ...prev, secondStep: true, thirdStep: false, firstStep: false }))
            } else if (isVisited.secondStep && steps.secondStep) {
              setSteps((prev) => ({ ...prev, secondStep: false, thirdStep: false, firstStep: false }))
            }
          }}
        />
        <Accordian
          isOpen={steps.thirdStep}
          isVisited={isVisited.thirdStep}
          isComplete={stepsComplete.thirdStep}
          label={3}
          heading={"Output"}
          handleClick={() => {
            if (isVisited.thirdStep && !steps.thirdStep) {
              setSteps((prev) => ({ ...prev, thirdStep: true, firstStep: false, secondStep: false }))
            } else if (isVisited.thirdStep && steps.thirdStep) {
              setSteps((prev) => ({ ...prev, thirdStep: false, firstStep: false, secondStep: false }))
            }
          }}
          children={outputResult()}
        />
        {isError.error && steps.thirdStep && (
          <div style={{ position: "relative", marginTop: "12px" }}>
            <FileError ErrorMsg={isError.errorMsg} displayError={isError.error} />
          </div>
        )}
        {isError.error && steps.thirdStep && (
          <BaseButton
            disabled={imageLoading ? true : false}
            handleClick={() => {
              setIsError((prev: any) => ({ ...prev, error: false, errorMsg: "" }))
              getOutputImg()
            }}
            width="319px"
            margin="16px 0 0 20px"
            fontSize="16px"
          >
            Retry
          </BaseButton>
        )}
      </div>
    </div>
  )
}

export default ObjectRemover

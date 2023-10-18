import Icons from "~/components/Icons"
import classes from "./style.module.css"
import { useContext, useEffect, useState } from "react"
import { MODAL_IMG_UPLOAD, OBJECT_REPLACER, TOOL_NAMES } from "~/constants/contants"
import UploadPreview from "../../Panels/panelItems/UploadPreview/UploadPreview"
import { Block } from "baseui/block"
import Uploads from "../../Panels/panelItems/UploadDropzone/Uploads"
import BaseButton from "~/components/UI/Button/BaseButton"
import clsx from "clsx"
import Accordian from "~/components/UI/Accordian/Accordian"
import SliderBar from "~/components/UI/Common/SliderBar"
import useFabricEditor from "../../../../../../src/hooks/useFabricEditor"
import LoaderSpinner from "../../../../../views/Public/images/loader-spinner.svg"
import { setBgImgFabricCanvas } from "~/views/DesignEditor/utils/functions/setBgImgFabricCanvas"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"
import ObjectReplacerContext from "~/contexts/ObjectReplacerContext"
import { createMaskImage } from "~/views/DesignEditor/utils/functions/createMaskImg"
import { getCookie } from "~/utils/common"
import { objectRemoverController } from "~/utils/objectRemoverController"
import { COOKIE_KEYS } from "~/utils/enum"
import { useAuth } from "~/hooks/useAuth"
import FileError from "~/components/UI/Common/FileError/FileError"
import useAppContext from "~/hooks/useAppContext"
import { setBgTransparent } from "~/views/DesignEditor/utils/functions/setBgTransparent"
import { getPollingIntervals } from "~/services/pollingIntervals.service"
import { PollingInterval } from "~/contexts/PollingInterval"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import SampleImagesContext from "~/contexts/SampleImagesContext"
import CanvasLoaderContext from "~/contexts/CanvasLoaderContext"

const ObjectReplacer = ({ handleBrushToolTip }: any) => {
  const { fabricEditor, setFabricEditor } = useFabricEditor()
  const { objectReplacerInfo, setObjectReplacerInfo } = useContext(ObjectReplacerContext)
  const [brushSize, setBrushSize] = useState(10)
  const { canvas, objects } = fabricEditor
  const { activePanel, setActivePanel } = useAppContext()
  // @ts-ignore
  const { authState, setAuthState } = useAuth()
  const [imageLoading, setImageLoading] = useState(false)
  const [resultLoading, setResultLoading] = useState(false)
  const [selectedSampleImg, setSelectedSampleImg] = useState(-1)
  const [promptText, setPromptText] = useState("")
  const [imgGenerationCt, setImgGenerationCt] = useState(1)
  const [autoCallAPI, setAutoCallAPI] = useState(false)
  const [callAPI, setCallAPI] = useState(false)
  const { sampleImages } = useContext(SampleImagesContext)
  const { setCanvasLoader } = useContext(CanvasLoaderContext)

  const [activeResultId, setActiveResultId] = useState(-1)

  const { pollingIntervalInfo, setPollingIntervalInfo } = useContext(PollingInterval)
  const [isError, setIsError] = useState({
    error: false,
    errorMsg: "",
  })

  const setDimensionOfSampleImg = async (img: any) => {
    if (img.width && img.height) {
      setObjectReplacerInfo((prev: any) => ({ ...prev, width: img.width, height: img.height }))
    } else {
      await getDimensions(img, (imgSrc: any) => {
        setObjectReplacerInfo((prev: any) => ({ ...prev, width: imgSrc.width, height: imgSrc.height }))
      })
    }
  }

  const { user, showLoginPopUp } = authState
  const [steps, setSteps] = useState({
    firstStep: true,
    secondStep: false,
    thirdStep: false,
    fourthStep: false,
  })

  const [stepsComplete, setStepsComplete] = useState({
    firstStep: false,
    secondStep: false,
    thirdStep: false,
    fourthStep: false,
  })
  const [isVisited, setIsVisited] = useState({
    firstStep: true,
    secondStep: false,
    thirdStep: false,
    fourthStep: false,
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

  useEffect(() => {
    if (user) {
      getPollingIntervals()
        .then((res: any) => {
          // Store polling intervals
          setPollingIntervalInfo((prev: any) => ({ ...prev, objectReplacer: res.features.object_replacer }))
          // storePollingIntervalCookies(res)
        })
        .catch(() => {
          // an error occured so we rely on fallback polling intervals for each tool in this case
        })
    }
  }, [user])

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
    setIsError((prev) => ({
      ...prev,
      error: false,
      errorMsg: "",
    }))
    if (steps.fourthStep && callAPI) {
      getOutputImg()
      setCallAPI(false)
    }
  }, [steps.fourthStep])

  const getOutputImg = () => {
    if (getCookie(COOKIE_KEYS.AUTH) == "invalid_cookie_value_detected") {
      setAuthState((prev: any) => ({ ...prev, showLoginPopUp: true, toolName: TOOL_NAMES.objectReplacer }))
      setAutoCallAPI(true)
    } else {
      setResultLoading(true)
      setCanvasLoader(true)
      setIsError((prev: any) => ({ ...prev, error: false, errorMsg: "" }))
      objectRemoverController(
        objectReplacerInfo.preview,
        objectReplacerInfo.mask_img,
        objectReplacerInfo.file_name,
        objectReplacerInfo.prompt,
        pollingIntervalInfo.objectReplacer
      )
        .then((response) => {
          setCallAPI(false)
          if (response.output_urls.length === 0) {
            setIsError((prev) => ({
              ...prev,
              error: true,
              errorMsg: "Oops! unable to generate your image please try again.",
            }))
            setResultLoading(false)
            setCanvasLoader(false)
          } else {
            console.log("response0", response)
            setObjectReplacerInfo((prev: any) => ({ ...prev, result: response.output_urls, activeResult: 0 }))
            setResultLoading(false)
            handleBgImg(response.output_urls[0])
            setStepsComplete((prev) => ({ ...prev, fourthStep: true }))
            setActiveResultId(0)
            setCanvasLoader(false)
            setIsError((prev) => ({ ...prev, error: false }))
          }
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
      setObjectReplacerInfo((prev: any) => ({ ...prev, src: "", preview: "", mask_img: "", result: [] }))
    }
  }, [])

  useEffect(() => {
    if (objectReplacerInfo.src === "") {
      setSelectedSampleImg(-1)
    }
  }, [objectReplacerInfo.src])
  const upload = () => (
    <>
      {objectReplacerInfo.preview ? (
        <Block>
          <UploadPreview
            discardHandler={() => {
              setIsError((prev) => ({ ...prev, error: false, errorMsg: "" }))
              setStepsComplete((prev) => ({
                ...prev,
                firstStep: true,
                secondStep: false,
                thirdStep: false,
                fourthStep: false,
              }))
              setObjectReplacerInfo((prev: any) => ({ ...prev, src: "", preview: "" }))
              setSelectedSampleImg(-1)
            }}
            previewHandle={() => {
              setObjectReplacerInfo((prev: any) => ({ ...prev, src: "", preview: "" }))
              setSelectedSampleImg(-1)
              setStepsComplete((prev) => ({ ...prev, firstStep: true, secondStep: false, thirdStep: false }))
            }}
            imgSrc={objectReplacerInfo.src}
            uploadType={OBJECT_REPLACER}
          />
          <div className={clsx("p-relative pointer", classes.discardBtn)}>
            <span
              onClick={() => {
                setObjectReplacerInfo((prev: any) => ({ ...prev, src: "", preview: "" }))
                setBgTransparent(canvas)
                setIsError((prev) => ({ ...prev, error: false, errorMsg: "" }))
                setStepsComplete((prev) => ({
                  ...prev,
                  firstStep: false,
                  secondStep: false,
                  thirdStep: false,
                  fourthStep: false,
                }))
                setSteps((prev) => ({
                  ...prev,
                  firstStep: true,
                  secondStep: false,
                  thirdStep: false,
                  fourthStep: false,
                }))
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

      {!objectReplacerInfo.src && (
        <>
          <div className={classes.sampleImagesLabel}>or try one of these for free</div>
          <div className={classes.sampleImages}>
            <Swiper spaceBetween={15} slidesPerView={"auto"} navigation={true} modules={[Navigation]}>
              {sampleImages.objectReplacer.map((image: any, index) => (
                <SwiperSlide key={index} style={{ width: "auto", alignItems: "center" }}>
                  <div
                    key={index}
                    className={clsx(classes.sampleImage, "flex-center")}
                    style={{ backgroundImage: `url(${image.originalImage})` }}
                    onClick={() => {
                      setSelectedSampleImg(index)
                      setDimensionOfSampleImg(image.originalImageDimensions)
                      setObjectReplacerInfo((prev: any) => ({
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
              ))}
            </Swiper>
          </div>
        </>
      )}
      <BaseButton
        margin="0px"
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
          }))
          setStepsComplete((prev) => ({
            ...prev,
            firstStep: true,
            secondStep: false,
            thirdStep: false,
            fourthStep: false,
          }))
          setIsVisited((prev) => ({ ...prev, secondStep: true, }))
        }}
      />
    </>
  )

  const Brush = () => (
    <>
      <UploadPreview imgSrc={objectReplacerInfo.preview} uploadType={MODAL_IMG_UPLOAD} />

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
            setStepsComplete((prev) => ({ ...prev }))
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
            // handleBgImg(objectReplacerInfo.src)
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
              intrinsicHeight: objectReplacerInfo.height,
              intrinsicWidth: objectReplacerInfo.width,
              pathsArray: paths,
            })
            setObjectReplacerInfo((prev: any) => ({ ...prev, mask_img: maskStr }))
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
            }))
            setStepsComplete((prev) => ({
              ...prev,
              secondStep: true,
              thirdStep: false,
              fourthStep: false,
            }))
            setIsVisited((prev) => ({ ...prev, thirdStep: true, }))
            setCallAPI(true)
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
            if (!user) {
              return setAuthState((prev: any) => ({ ...prev, showLoginPopUp: true, toolName: TOOL_NAMES.objectReplacer }))
            }
            handleBgImg(objectReplacerInfo.src)
            setSteps((prev) => ({
              ...prev,
              firstStep: false,
              secondStep: false,
              thirdStep: false,
              fourthStep: true,
            }))
            setStepsComplete((prev) => ({
              ...prev,
              secondStep: true,
              thirdStep: true,
            }))
            setIsVisited((prev) => ({ ...prev, fourthStep: true, }))
            setCallAPI(true)
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
            }))
            setStepsComplete((prev) => ({
              ...prev,
              secondStep: true,
              thirdStep: true,
              fourthStep: true,
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
        <div
          className={clsx(
            "pointer p-relative",
            classes.eachImg,
            objectReplacerInfo.result.length === activeResultId && classes.currentActiveImg
          )}
        >
          {
            <img
              src={objectReplacerInfo.src}
              onClick={() => {
                if (activeResultId === objectReplacerInfo.result.length) return
                setActiveResultId(objectReplacerInfo.result.length)
                setObjectReplacerInfo((prev: any) => ({ ...prev, activeResult: objectReplacerInfo.result.length }))
                handleBgImg(objectReplacerInfo.src)
              }}
            />
          }

          <div className={classes.resultLabel}>{"Original"}</div>
        </div>

        {resultLoading
          ? Array.from(Array(4).keys()).map((each, _idx) => {
            return (
              <div key={_idx} className={classes.skeletonBox}>
                {<img className={classes.imagesLoader} src={LoaderSpinner} />}{" "}
              </div>
            )
          })
          : isError.error
            ? Array.from(Array(4).keys()).map((each, _idx) => {
              return (
                <div className={classes.skeletonBox}>
                  {
                    <div className={classes.retry}>
                      <Icons.RetryImg />
                    </div>
                  }{" "}
                </div>
              )
            })
            : objectReplacerInfo.result.map((each, _idx) => {
              return (
                <div
                  key={_idx}
                  className={clsx(
                    "pointer p-relative",
                    classes.eachImg,
                    activeResultId === _idx && classes.currentActiveImg
                  )}
                >
                  {
                    <img
                      src={each}
                      onClick={() => {
                        if (activeResultId != _idx) {
                          setActiveResultId(_idx)
                          setObjectReplacerInfo((prev: any) => ({ ...prev, activeResult: _idx }))
                          handleBgImg(each)
                        }
                      }}
                    />
                  }
                </div>
              )
            })}
      </div>
      {stepsComplete.firstStep &&
        stepsComplete.secondStep &&
        stepsComplete.thirdStep &&
        stepsComplete.fourthStep &&
        !resultLoading &&
        !isError.error && (
          <BaseButton
            borderRadius="10px"
            title={"Replace more objects"}
            height="38px"
            margin={"20px 4px 4px 0px"}
            width="320px"
            fontSize="16px"
            fontWeight="500"
            handleClick={() => {
              setPromptText((prev) => "")
              setObjectReplacerInfo((prev: any) => ({ ...prev, preview: prev.src, prompt: "" }))
              setCallAPI(false)
              setStepsComplete((prev) => ({ ...prev, thirdStep: false, fourthStep: false }))
              setSteps((prev) => ({ ...prev, secondStep: true, firstStep: false, thirdStep: false, fourthStep: false }))
            }}
          />
        )}
    </>
  )

  return (
    <div className={classes.mainPanel}>
      <div className={classes.heading}>
        <div
          className={classes.arrowIcon}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setActivePanel(null as any)
            setObjectReplacerInfo((prev: any) => ({ ...prev, src: "", preview: "", mask_img: "", result: [] }))
          }}
        >
          <Icons.ArrowLeft />
        </div>
        <p>Object Replacer</p>
      </div>
      <div className={classes.line}></div>

      <div className={classes.objRemoverCon} >
        <Accordian
          label={1}
          isVisited={isVisited.firstStep}
          isOpen={steps.firstStep}
          isComplete={stepsComplete.firstStep}
          heading={"Upload / choose image"}
          children={upload()}
          handleClick={() => {
            if (!steps.firstStep) {
              setSteps((prev) => ({
                ...prev,
                firstStep: true,
                secondStep: false,
                thirdStep: false,
                fourthStep: false,
              }))
            } else {
              setSteps((prev) => ({
                ...prev,
                firstStep: false,
                secondStep: false,
                thirdStep: false,
                fourthStep: false,
              }))
              {
              }
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
            if (isVisited.secondStep && steps.secondStep) {
              setSteps((prev) => ({
                ...prev,
                secondStep: false,
                thirdStep: false,
                firstStep: false,
                fourthStep: false,
              }))
            } else if (isVisited.secondStep && !steps.secondStep) {
              setSteps((prev) => ({
                ...prev,
                secondStep: true,
                thirdStep: false,
                firstStep: false,
                fourthStep: false,
              }))
            }
          }}
        />
        <Accordian
          label={3}
          isVisited={isVisited.thirdStep}
          isOpen={steps.thirdStep}
          isComplete={stepsComplete.thirdStep}
          heading={"Write Prompt"}
          children={Prompt()}
          handleClick={() => {
            if (isVisited.thirdStep && !steps.thirdStep) {
              setSteps((prev) => ({
                ...prev,
                thirdStep: true,
                secondStep: false,
                firstStep: false,
                fourthStep: false,
              }))
            } else if (isVisited.thirdStep && steps.thirdStep) {
              setSteps((prev) => ({
                ...prev, thirdStep: false,
                secondStep: false,
                firstStep: false,
                fourthStep: false,
              }))
            }
          }}
        />
        {/* <Accordian
        label={4}
        isOpen={steps.fourthStep}
        isComplete={stepsComplete.fourthStep}
        heading={"Select number of outputs"}
        children={GenerateImages()}
        handleClick={() => {
          if (stepsComplete.fourthStep && !steps.fourthStep) {
            setSteps((prev) => ({ ...prev, fourthStep: true, thirdStep: false, firstStep: false,secondStep:false}))
            setStepsComplete((prev) => ({ ...prev, thirdStep: true, fourthStep: true}))
          } else if (steps.fourthStep) {
            setSteps((prev) => ({ ...prev, fourthStep: false }))
          } else {
          }
        }}
      /> */}

        <Accordian
          isVisited={isVisited.fourthStep}
          isOpen={steps.fourthStep}
          isComplete={stepsComplete.fourthStep}
          label={4}
          heading={"Final output"}
          handleClick={() => {
            if (isVisited.fourthStep && steps.fourthStep) {
              setSteps((prev) => ({
                ...prev,
                fourthStep: false,
                thirdStep: false,
                firstStep: false,
                secondStep: false,
              }))
            } else if (isVisited.fourthStep && !steps.fourthStep) {
              setSteps((prev) => ({
                ...prev,
                fourthStep: true,
                thirdStep: false,
                firstStep: false,
                secondStep: false,
              }))
              // setStepsComplete((prev) => ({ ...prev, fourthStep: true }))
            }
          }}
          children={outputResult()}
        />
        {isError.error && (
          <div style={{ position: "relative", marginTop: "12px" }}>
            <FileError ErrorMsg={isError.errorMsg} displayError={isError.error} />
          </div>
        )}
        {isError.error && (
          <BaseButton
            disabled={imageLoading ? true : false}
            handleClick={() => {
              setIsError((prev: any) => ({ ...prev, error: false, errorMsg: "" }))
              getOutputImg()
            }}
            width="319px"
            margin="12px 0 0 20px"
            fontSize="16px"
          >
            Retry
          </BaseButton>
        )}
      </div>
    </div>
  )
}

export default ObjectReplacer

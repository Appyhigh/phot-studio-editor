import { useContext, useEffect, useRef, useState } from "react"
import { MODAL_IMG_UPLOAD } from "~/constants/contants"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import Accordian from "~/components/UI/Accordian/Accordian"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import BaseButton from "~/components/UI/Button/BaseButton"
import Prompt from "~/components/Prompt/Prompt"
import LoaderSpinner from "~/views/Public/images/loader-spinner.svg"
import Uploads from "~/views/DesignEditor/components/Panels/panelItems/UploadDropzone/Uploads"
import clsx from "clsx"
import UploadPreview from "~/views/DesignEditor/components/Panels/panelItems/UploadPreview/UploadPreview"
import { useCoreHandler } from "~/components/FabricCanvas/Canvas/handlers"
import ProductPhotoshootContext from "~/contexts/ProductPhotoshootContext"
import CanvasLoaderContext from "~/contexts/CanvasLoaderContext"
import { ID_MASK_CANVAS, ID_RESULT_CANVAS, ID_SRC_CANVAS, removeBackgroundController } from "~/utils/removeBackground"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"
import productPhotoshootController from "~/utils/productPhotoshootController"
import useFabricEditor from "~/hooks/useFabricEditor"
import { COOKIE_KEYS } from "~/utils/enum"
import { getCookie } from "~/utils/common"
import LoginPopup from "~/views/DesignEditor/components/LoginPopup/LoginPopup"
import ErrorContext from "~/contexts/ErrorContext"

const ProductPhotoshootLeftPanel = ({ handleClose }: any) => {
  const [steps, setSteps] = useState({
    1: true,
    2: false,
    3: false,
    4: false,
  })

  const [stepsComplete, setStepsComplete] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  })

  const sampleImages = [
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
  ]

  const { productPhotoshootInfo, setProductPhotoshootInfo } = useContext(ProductPhotoshootContext)
  const [imageLoading, setImageLoading] = useState(false)
  const [selectedSampleImg, setSelectedSampleImg] = useState(0)
  const [imageMoved, setImageMoved] = useState(false)

  const [currentActiveImg, setCurrentActiveImg] = useState(-1)
  const [resultLoading, setResultLoading] = useState(false)
  const { addImage, setBackgroundImage, clearCanvas, removeBackground } = useCoreHandler()
  const [showLoginPopup, setShowLoginPopup] = useState(false)

  useEffect(() => {
    if (!productPhotoshootInfo.src) {
      setSelectedSampleImg(-1)
    }
  }, [productPhotoshootInfo.src])

  const { setCanvasLoader } = useContext(CanvasLoaderContext)
  const virtualSrcImageRef = useRef<HTMLImageElement | null>(null)
  const virtualMaskImageRef = useRef<HTMLImageElement | null>(null)
  const virtualCanvasSrcImageRef = useRef<HTMLCanvasElement | null>(null)
  const virtualCanvasMaskImageRef = useRef<HTMLCanvasElement | null>(null)
  const virtualCanvasResultImageRef = useRef<HTMLCanvasElement | null>(null)
  const { fabricEditor } = useFabricEditor()
  const { canvas, activeObject }: any = fabricEditor
  const { setErrorInfo } = useContext(ErrorContext)

  useEffect(() => {
    if (!imageMoved) {
      if (canvas) {
        canvas.on("object:scaling", (e: any) => {
          setImageMoved(true)
        })
        canvas.on("object:moving", (e: any) => {
          setImageMoved(true)
        })
      }
    }
  }, [canvas])

  const handleRemoveBgAndAddObject = async (imageUrl: any) => {
    setCanvasLoader(true)
    try {
      await getDimensions(imageUrl, async (img: any) => {
        let response = await removeBackgroundController(
          imageUrl,
          (image: string) => {
            if (image) {
              removeBackground()
              addImage({
                type: "image",
                src: image,
              })
              setSteps((prev) => ({ ...prev, 1: false, 2: true, 3: false, 4: false }))
              setStepsComplete((prev) => ({ ...prev, 1: true, 2: false, 3: false, 4: false }))
              setProductPhotoshootInfo((prev: any) => ({
                ...prev,
                preview: productPhotoshootInfo.src,
                tooltip: true,
              }))
              setCanvasLoader(false)
            } else {
              setCanvasLoader(false)
              throw new Error("Something went wrong while removing background...")
            }
          },
          virtualSrcImageRef,
          virtualMaskImageRef,
          virtualCanvasSrcImageRef,
          virtualCanvasMaskImageRef,
          virtualCanvasResultImageRef,
          img.width,
          img.height
        )
        if (response) {
          setCanvasLoader(false)
          setErrorInfo((prev: any) => ({
            ...prev,
            showError: true,
            errorMsg: "Something went wrong while removing background...",
            retryFn: () => {
              setErrorInfo((prev: any) => ({ ...prev, showError: false }))
              handleRemoveBgAndAddObject(imageUrl)
            },
          }))
          setTimeout(() => {
            setErrorInfo((prev: any) => ({ ...prev, showError: false }))
          }, 5000)
        }
      })
    } catch (error: any) {
      setCanvasLoader(false)
      setErrorInfo((prev: any) => ({
        ...prev,
        showError: true,
        errorMsg: "Something went wrong while removing background...",
        retryFn: () => {
          // @ts-ignore
          setErrorInfo((prev) => ({ ...prev, showError: false }))
          handleRemoveBgAndAddObject(imageUrl)
        },
      }))
      setTimeout(() => {
        // @ts-ignore
        setErrorInfo((prev) => ({ ...prev, showError: false }))
      }, 5000)
    }
  }

  const getCurrentCanvasBase64Image = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        width: canvas.width,
        height: canvas.height,
        left: 0,
        top: 0,
        format: "png",
      })

      return dataURL
    }
    return undefined
  }

  const generateResult = () => {
    if (getCookie(COOKIE_KEYS.AUTH) == "invalid_cookie_value_detected") {
      setShowLoginPopup(true)
    } else {
      setResultLoading(true)
      setCanvasLoader(true)
      productPhotoshootController(getCurrentCanvasBase64Image(), productPhotoshootInfo.prompt)
        .then((response) => {
          clearCanvas()
          setProductPhotoshootInfo((prev: any) => ({
            ...prev,
            result: [...prev.result, ...response],
            finalImage: response[0],
          }))
          setBackgroundImage(response[0])
          setSteps((prev: any) => ({ ...prev, 1: false, 2: false, 3: false, 4: true }))
          setStepsComplete((prev: any) => ({ ...prev, 3: true, 4: false }))
          setResultLoading(false)
          setCanvasLoader(false)
        })
        .catch((error) => {
          setResultLoading(false)
          setCanvasLoader(false)
          setSteps((prev: any) => ({ ...prev, 1: false, 2: false, 3: true, 4: false }))
          setStepsComplete((prev: any) => ({ ...prev, 3: false, 4: false }))
          setErrorInfo((prev: any) => ({
            ...prev,
            showError: true,
            errorMsg: "Some error has occurred",
            retryFn: () => {
              setErrorInfo((prev: any) => ({ ...prev, showError: false }))
              generateResult()
            },
          }))
          setTimeout(() => {
            setErrorInfo((prev: any) => ({ ...prev, showError: false }))
          }, 5000)
          console.log("error", error)
        })
    }
  }

  const UploadImage = () => {
    return (
      <>
        {productPhotoshootInfo.src ? (
          <div>
            <UploadPreview
              discardHandler={() => {
                setProductPhotoshootInfo((prev: any) => ({ ...prev, src: "", preview: "" }))
              }}
              previewHandle={() => {
                setProductPhotoshootInfo((prev: any) => ({ ...prev, src: "", preview: "" }))
              }}
              imgSrc={productPhotoshootInfo.src}
              uploadType={MODAL_IMG_UPLOAD}
            />
            <div className={clsx("p-relative pointer", classes.discardBtn)}>
              <span
                onClick={() => {
                  setProductPhotoshootInfo((prev: any) => ({ ...prev, src: "" }))
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
              imgUpload={productPhotoshootInfo}
              setImgUpload={setProductPhotoshootInfo}
              fileInputType={"modalUpload"}
              id={"modalUpload"}
            />
          </div>
        )}
        <div className={classes.sampleImagesLabel}>or try one of these for free</div>
        <div className={classes.sampleImages}>
          <Swiper spaceBetween={15} slidesPerView={"auto"} navigation={true} modules={[Navigation]}>
            {sampleImages.map((image, index) => (
              <SwiperSlide key={index} style={{ width: "auto" }}>
                <div
                  key={index}
                  className={clsx(classes.sampleImage, "flex-center")}
                  style={{ backgroundImage: `url(${image})` }}
                  onClick={() => {
                    setSelectedSampleImg(index)
                    setProductPhotoshootInfo((prev: any) => ({ ...prev, src: image }))
                  }}
                >
                  {selectedSampleImg == index && <Icons.Selection size={"24"} />}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <BaseButton
          title="Continue"
          borderRadius="10px"
          width="20.25rem"
          height="2.375rem"
          fontSize="0.75rem"
          fontFamily="Poppins"
          fontWeight="600"
          handleClick={() => {
            if (productPhotoshootInfo.src) {
              handleRemoveBgAndAddObject(productPhotoshootInfo.src)
            }
          }}
          disabled={!productPhotoshootInfo.src}
        />
      </>
    )
  }

  const ResizeImage = () => {
    return (
      <>
        {productPhotoshootInfo.src && (
          <UploadPreview imgSrc={productPhotoshootInfo.src} uploadType={MODAL_IMG_UPLOAD} />
        )}
        <div className={classes.resizeLabel}>*The output will depend on the size of the input images.</div>
        <div className={classes.resizeButtons}>
          <BaseButton
            title="Skip"
            borderRadius="10px"
            width="9.6875rem"
            height="2.375rem"
            fontSize="0.75rem"
            fontFamily="Poppins"
            fontWeight="600"
            bgColor="#F1F1F5"
            txtColor="#44444F"
            handleClick={() => {
              setSteps((prev) => ({ ...prev, 1: false, 2: false, 3: true, 4: false }))
              setStepsComplete((prev) => ({ ...prev, 2: true, 3: false, 4: false }))
              setProductPhotoshootInfo((prev: any) => ({ ...prev, tooltip: false }))
              canvas.discardActiveObject().renderAll()
            }}
          />
          <BaseButton
            title="Continue"
            borderRadius="10px"
            width="9.6875rem"
            height="2.375rem"
            fontSize="0.75rem"
            fontFamily="Poppins"
            fontWeight="600"
            disabled={!imageMoved}
            handleClick={() => {
              setSteps((prev) => ({ ...prev, 1: false, 2: false, 3: true, 4: false }))
              setStepsComplete((prev) => ({ ...prev, 2: true, 3: false, 4: false }))
              setProductPhotoshootInfo((prev: any) => ({ ...prev, tooltip: false }))
              canvas.discardActiveObject().renderAll()
            }}
          />
        </div>
        {imageMoved && <div className={classes.resizeNote}>Clicking Continue will save the changes automatically.</div>}
      </>
    )
  }

  const SelectOutput = () => {
    return (
      <>
        <div className={classes.resultImages}>
          {productPhotoshootInfo.result &&
            productPhotoshootInfo.result.map((each, idx) => (
              <div
                className={clsx("pointer", classes.eachImg, idx === currentActiveImg && classes.currentActiveImg)}
                key={idx}
              >
                {
                  <img
                    src={each}
                    onClick={() => {
                      setCurrentActiveImg(idx)
                      clearCanvas()
                      setBackgroundImage(each)
                      setProductPhotoshootInfo((prev: any) => ({ ...prev, finalImage: each }))
                    }}
                  />
                }
              </div>
            ))}
          {resultLoading &&
            Array.from(Array(4).keys()).map((each, idx) => (
              <div className={classes.skeletonBox} key={idx}>
                {<img className={classes.imagesLoader} src={LoaderSpinner} />}
              </div>
            ))}
        </div>
        <div className="pb-2">
          <BaseButton
            title="Generate 4 more"
            borderRadius="10px"
            width="20.25rem"
            height="2.375rem"
            fontSize="0.75rem"
            fontFamily="Poppins"
            fontWeight="600"
            disabled={resultLoading ? true : false}
            handleClick={() => {
              !resultLoading && generateResult()
            }}
          />
        </div>
      </>
    )
  }

  return (
    // <Scrollable>
    <div className={classes.leftPanel}>
      <div className={classes.heading}>
        <div className={classes.arrowIcon} onClick={handleClose}>
          <Icons.ArrowLeft />
        </div>
        Product Photoshoot
      </div>
      <div className={classes.headingDivider}></div>
      <div className="d-flex flex-1 flex-column">
        <img src="" ref={virtualSrcImageRef} style={{ display: "none" }} crossOrigin="anonymous" />
        <img src="" ref={virtualMaskImageRef} style={{ display: "none" }} crossOrigin="anonymous" />
        <canvas className={ID_SRC_CANVAS} ref={virtualCanvasSrcImageRef} style={{ display: "none" }} />
        <canvas className={ID_MASK_CANVAS} ref={virtualCanvasMaskImageRef} style={{ display: "none" }} />
        <canvas className={ID_RESULT_CANVAS} ref={virtualCanvasResultImageRef} style={{ display: "none" }} />
        <Accordian
          label={"1"}
          heading={"Upload / choose image"}
          isOpen={steps[1]}
          isComplete={stepsComplete[1]}
          children={<UploadImage />}
          handleClick={() => {
            if (stepsComplete[1] && !steps[1]) {
              setSteps((prev) => ({ ...prev, 1: true, 2: false, 3: false, 4: false }))
              // setStepsComplete((prev) => ({ ...prev, 4: false }))
            } else if (steps[1]) {
              setSteps((prev) => ({ ...prev, 1: false }))
            } else {
            }
          }}
        />
        <Accordian
          label={"2"}
          heading={"Resize your image"}
          isOpen={steps[2]}
          isComplete={stepsComplete[2]}
          children={<ResizeImage />}
          handleClick={() => {
            if (stepsComplete[2] && !steps[2]) {
              setSteps((prev) => ({ ...prev, 2: true, 1: false, 3: false, 4: false }))
              // setStepsComplete((prev) => ({ ...prev, 4: false }))
            } else if (steps[2]) {
              setSteps((prev) => ({ ...prev, 2: false }))
            } else {
            }
          }}
        />
        <Accordian
          label={"3"}
          heading={"Select background"}
          isOpen={steps[3]}
          isComplete={stepsComplete[3]}
          children={
            <SelectBackground setSteps={setSteps} setStepsComplete={setStepsComplete} generateResult={generateResult} />
          }
          handleClick={() => {
            if (stepsComplete[3] && !steps[3]) {
              setSteps((prev) => ({ ...prev, 3: true, 1: false, 2: false, 4: false }))
              // setStepsComplete((prev) => ({ ...prev, 4: false }))
            } else if (steps[3]) {
              setSteps((prev) => ({ ...prev, 3: false }))
            } else {
            }
          }}
        />
        <Accordian
          label={"4"}
          heading={"Select output"}
          isOpen={steps[4]}
          isComplete={stepsComplete[4]}
          children={<SelectOutput />}
          handleClick={() => {
            if (stepsComplete[4] && !steps[4]) {
              setSteps((prev) => ({ ...prev, 4: true, 1: false, 2: false, 3: false }))
            } else if (steps[4]) {
              setSteps((prev) => ({ ...prev, 4: false }))
              setStepsComplete((prev) => ({ ...prev, 4: true }))
            }
          }}
        />
        <LoginPopup
          isOpen={showLoginPopup}
          loginPopupCloseHandler={() => {
            setShowLoginPopup(false)
          }}
        />
      </div>
    </div>
    // </Scrollable>
  )
}

const SelectBackground = ({ generateResult }: any) => {
  const [showPrompt, setShowPrompt] = useState(false)
  const { productPhotoshootInfo, setProductPhotoshootInfo } = useContext(ProductPhotoshootContext)
  const [selectedImg, setSelectedImg] = useState(-1)
  const [selectedCategory, setSelectedCategory] = useState("Mood")

  const categories: any = {
    Mood: [
      { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "Flower" },
      { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "Flower" },
      { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "Flower" },
      { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "Flower" },
    ],
    Colors: [
      { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "Red" },
      { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "Green" },
      { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "Blue" },
      { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "Orange" },
    ],
    Nature: [
      {
        image:
          "https://media.istockphoto.com/id/1093110112/photo/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-of-green-forest-with-pure.jpg?s=612x612&w=0&k=20&c=lpQ1sQI49bYbTp9WQ_EfVltAqSP1DXg0Ia7APTjjxz4=",
        label: "Tree",
      },
      {
        image:
          "https://media.istockphoto.com/id/1093110112/photo/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-of-green-forest-with-pure.jpg?s=612x612&w=0&k=20&c=lpQ1sQI49bYbTp9WQ_EfVltAqSP1DXg0Ia7APTjjxz4=",
        label: "Tree",
      },
      {
        image:
          "https://media.istockphoto.com/id/1093110112/photo/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-of-green-forest-with-pure.jpg?s=612x612&w=0&k=20&c=lpQ1sQI49bYbTp9WQ_EfVltAqSP1DXg0Ia7APTjjxz4=",
        label: "Tree",
      },
      {
        image:
          "https://media.istockphoto.com/id/1093110112/photo/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-of-green-forest-with-pure.jpg?s=612x612&w=0&k=20&c=lpQ1sQI49bYbTp9WQ_EfVltAqSP1DXg0Ia7APTjjxz4=",
        label: "Tree",
      },
    ],
    Texture: [
      { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "Abstract" },
      { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "Abstract" },
      { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "Abstract" },
      { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "Abstract" },
    ],
  }
  return (
    <div className={classes.selectBg}>
      {showPrompt ? (
        <>
          <div className={classes.inputSection}>
            <Prompt stateInfo={productPhotoshootInfo} setStateInfo={setProductPhotoshootInfo} />
          </div>
          <div className={classes.defaultBgLabel} onClick={() => setShowPrompt(false)}>
            Select default backgrounds.
          </div>
        </>
      ) : (
        <>
          <Swiper spaceBetween={5} slidesPerView={"auto"} navigation={true} modules={[Navigation]}>
            {Object.keys(categories).map((each: any, index) => (
              <SwiperSlide key={index}>
                <div
                  className={classes.bgTab}
                  style={{
                    background: selectedCategory == each ? "#6729f3" : "#fff",
                    color: selectedCategory == each ? "#fafafb" : "#92929D",
                  }}
                  onClick={() => {
                    setSelectedCategory(each)
                  }}
                >
                  {each}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper spaceBetween={20} slidesPerView={"auto"} navigation={true} modules={[Navigation]} className="mt-2">
            {categories[selectedCategory].map((each: any, index: any) => (
              <SwiperSlide key={index}>
                <img
                  className="pointer"
                  style={{
                    width: "6rem",
                    height: "4rem",
                    background: "#FFFFFF",
                    borderRadius: "8px",
                  }}
                  src={each.image}
                  onClick={() => {
                    setSelectedImg(index)
                    setProductPhotoshootInfo((prev: any) => ({
                      ...prev,
                      prompt: each.label,
                    }))
                  }}
                />
                <div className={classes.imageLabel}>{each.label}</div>
                {selectedImg == index && (
                  <div className={classes.selected}>
                    <Icons.Selection size={"28"} />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={classes.promptLabel} onClick={() => setShowPrompt(true)}>
            Want a more customized background? <span>Generate with a prompt.</span>
          </div>
          {/* {productPhotoshootInfo.result.length > 0 && (
            <div className={classes.prevOutputNote}>Your previous output will not be discarded.</div>
          )} */}
        </>
      )}
      <BaseButton
        title="Continue"
        borderRadius="10px"
        width="20.25rem"
        height="2.375rem"
        fontSize="0.75rem"
        fontFamily="Poppins"
        fontWeight="600"
        handleClick={() => {
          if (productPhotoshootInfo.prompt.length > 0) {
            generateResult()
          }
        }}
        disabled={productPhotoshootInfo.prompt.length == 0}
      />
    </div>
  )
}
export default ProductPhotoshootLeftPanel

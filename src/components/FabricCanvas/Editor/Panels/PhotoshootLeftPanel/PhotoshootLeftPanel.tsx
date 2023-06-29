import { useEffect, useState } from "react"
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

const PhotoshootLeftPanel = ({ handleClose }: any) => {
  const [done, setDone] = useState({ 1: false, 2: false, 3: false, 4: false })
  const sampleImages = [
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
  ]
  const [imgUpload, setImgUpload] = useState<any>({
    src: "",
    preview: "",
  })
  const [imageLoading, setImageLoading] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Mood")
  const [selectedImg, setSelectedImg] = useState(-1)
  const [selectedSampleImg, setSelectedSampleImg] = useState(-1)
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
  const resultImages = [
    "https://sepetjian.files.wordpress.com/2011/10/nasa1r3107_1000x1000.jpg",
    "https://sepetjian.files.wordpress.com/2011/10/nasa1r3107_1000x1000.jpg",
    "https://sepetjian.files.wordpress.com/2011/10/nasa1r3107_1000x1000.jpg",
    "https://sepetjian.files.wordpress.com/2011/10/nasa1r3107_1000x1000.jpg",
  ]
  const [currentActiveImg, setCurrentActiveImg] = useState(-1)
  const [imagesLoading, setImagesLoading] = useState(false)
  const { addImage } = useCoreHandler()

  useEffect(() => {
    if (!imgUpload.src) {
      setSelectedSampleImg(-1)
    }
  }, [imgUpload.src])

  const handleAddObject = (imageUrl: any) => {
    console.log("IMG URL", imageUrl)
    addImage({
      type: "image",
      src: imageUrl,
    })
  }

  const UploadImage = ({ setDone }: any) => {
    return (
      <>
        {imgUpload.preview ? (
          <div>
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
            <div className={clsx("p-relative pointer", classes.discardBtn)}>
              <span
                onClick={() => {
                  console.log("THIS")
                  setImgUpload({ src: "", preview: "" })
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
              imgUpload={imgUpload}
              setImgUpload={setImgUpload}
              fileInputType={"modalUpload"}
              uploadType={"a"}
              id={"modalUpload"}
            />
          </div>
        )}
        <div className={classes.sampleImagesLabel}>or try one of these for free</div>
        <div className={classes.sampleImages}>
          {sampleImages.map((image, index) => (
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
          title="Continue"
          borderRadius="10px"
          width="20.25rem"
          height="2.375rem"
          fontSize="0.75rem"
          fontFamily="Poppins"
          fontWeight="600"
          handleClick={() => {
            if (imgUpload.src) {
              console.log("IMG", imgUpload.src)
              handleAddObject(imgUpload.src)
              setDone((prev: any) => ({ ...prev, 1: true }))
            }
          }}
          disabled={!imgUpload.src}
        />
      </>
    )
  }

  const ResizeImage = ({ setDone }: any) => {
    return (
      <>
        {imgUpload.src && <UploadPreview imgSrc={imgUpload.src} uploadType={MODAL_IMG_UPLOAD} />}
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
              setDone((prev: any) => ({ ...prev, 2: true }))
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
            // disabled={true}
            handleClick={() => {
              setDone((prev: any) => ({ ...prev, 2: true }))
            }}
          />
        </div>
      </>
    )
  }
  const SelectBackground = ({ setDone }: any) => {
    return (
      <div className={classes.selectBg}>
        {showPrompt ? (
          <>
            <div className={classes.inputSection}>
              <Prompt />
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
            setDone((prev: any) => ({ ...prev, 3: true }))
          }}
          // disabled={}
        />
      </div>
    )
  }

  const SelectOutput = ({ setDone }: any) => {
    return (
      <>
        <div className={classes.resultImages}>
          {resultImages.map((each, idx) => (
            <div
              className={clsx("pointer", classes.eachImg, idx === currentActiveImg && classes.currentActiveImg)}
              key={idx}
            >
              {
                <img
                  src={each}
                  onClick={() => {
                    setCurrentActiveImg(idx)
                  }}
                />
              }
            </div>
          ))}
          {imagesLoading &&
            Array.from(
              Array([1, 2, 3, 4]).map((each, idx) => (
                <div className={classes.skeletonBox} key={idx}>
                  {<img className={classes.imagesLoader} src={LoaderSpinner} />}
                </div>
              ))
            )}
        </div>
        <BaseButton
          title="Generate 4 more"
          borderRadius="10px"
          width="20.25rem"
          height="2.375rem"
          fontSize="0.75rem"
          fontFamily="Poppins"
          fontWeight="600"
          disabled={imagesLoading ? true : false}
          handleClick={() => {
            setDone((prev: any) => ({ ...prev, 3: true }))
          }}
        />
      </>
    )
  }

  return (
    <div className={classes.leftPanel}>
      <div className={classes.heading}>
        <div className={classes.arrowIcon} onClick={handleClose}>
          <Icons.ArrowLeft />
        </div>
        Product Photoshoot
      </div>
      <div className={classes.headingDivider}></div>
      {/* <Scrollable> */}
      <div className="d-flex flex-1 flex-column">
        <Accordian
          label={"1"}
          heading={"Upload / choose image"}
          isDone={done[1]}
          children={<UploadImage setDone={setDone} />}
        />
        <Accordian
          label={"2"}
          heading={"Resize your image"}
          isDone={done[2]}
          children={<ResizeImage setDone={setDone} />}
        />
        <Accordian
          label={"3"}
          heading={"Select background"}
          isDone={done[3]}
          children={<SelectBackground setDone={setDone} />}
        />
        <Accordian
          label={"4"}
          heading={"Select output"}
          isDone={done[4]}
          children={<SelectOutput setDone={setDone} />}
        />
      </div>
      {/* </Scrollable>  */}
    </div>
  )
}

export default PhotoshootLeftPanel

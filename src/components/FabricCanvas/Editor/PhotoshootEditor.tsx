import { useEffect, useState } from "react"
import useFabricEditor from "src/hooks/useFabricEditor"
import CanvasArea from "./CanvasArea/CanvasArea"
import ImagesPanel from "./Panels/ImagesPanel/ImagesPanel"
import classes from "./style.module.css"
import ModalBasePanel from "./Panels/ModalBasePanel/ModalBasePanel"
import PointerIcon from "~/components/Icons/PointerIcon"
import Icons from "~/components/Icons"
import Accordian from "~/components/UI/Accordian/Accordian"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import BaseButton from "~/components/UI/Button/BaseButton"
import Prompt from "~/components/Prompt/Prompt"
import { set } from "lodash"
import LoaderSpinner from "../../../views/Public/images/loader-spinner.svg"
import Uploads from "~/views/DesignEditor/components/Panels/panelItems/UploadDropzone/Uploads"
import clsx from "clsx"
import Scrollable from "~/components/Scrollable"

function Editor({ handleClose }: any) {
  const [dimension, setDimension] = useState({
    width: 800,
    height: 800,
  })
  const [isDoneBtnDisabled, setIsDoneBtnDisabled] = useState(false)

  const { fabricEditor } = useFabricEditor()

  const { canvas, objects }: any = fabricEditor

  const [done, setDone] = useState({ 1: false, 2: false, 3: false, 4: false })

  return (
    <div>
      <div className={"d-flex flex-row"}>
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
            <div className={"p-1"}>
              <Accordian
                label={"1"}
                heading={"Upload / choose image"}
                isDone={done[1]}
                children={<UploadImage setDone={setDone} />}
              />
            </div>
            <div className={"p-1"}>
              <Accordian
                label={"2"}
                heading={"Resize your image"}
                isDone={done[2]}
                children={<ResizeImage setDone={setDone} />}
              />
            </div>
            <div className={"p-1"}>
              <Accordian
                label={"3"}
                heading={"Select background"}
                isDone={done[3]}
                children={<SelectBackground setDone={setDone} />}
              />
            </div>
            <div className={"p-1"}>
              <Accordian
                label={"4"}
                heading={"Select output"}
                isDone={done[4]}
                children={<SelectOutput setDone={setDone} />}
              />
            </div>
          </div>
          {/* </Scrollable> */}
        </div>

        <div className={classes.editor}>
          <ModalBasePanel handleClose={handleClose} isDoneBtnDisabled={isDoneBtnDisabled} />
          <div className={classes.three}>
            <CanvasArea width={dimension.width} height={dimension.height} />
          </div>
        </div>
      </div>

      <div className={classes.chevronIcon} style={{ bottom: "0.5rem" }}>
        <PointerIcon />
      </div>
    </div>
  )
}

const UploadImage = ({ setDone }: any) => {
  const sampleImages = [
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
  ]
  return (
    <>
      <Uploads
      // activePanel={activePanel}
      // uploadType={PHOTO_EDITOR}
      // fileInputType={"photoEditor"}
      // id={"PhotoEditor"}
      // mainHeading={"Add Image"}
      // imageLoading={imageLoading}
      // setImageLoading={setImageLoading}
      />
      <div className={classes.sampleImagesLabel}>or try one of these for free</div>
      <div className={classes.sampleImages}>
        {sampleImages.map((image, index) => (
          <div key={index} className={classes.sampleImage} style={{ backgroundImage: `url(${image})` }}></div>
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
          setDone((prev: any) => ({ ...prev, 1: true }))
        }}
      />
    </>
  )
}

const ResizeImage = ({ setDone }: any) => {
  return (
    <>
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
  const [showPrompt, setShowPrompt] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(-1)
  const [selectedImg, setSelectedImg] = useState(-1)
  const categories = ["Mood", "Texture", "Color", "Pattern", "Shape", "Object"]
  const images = [
    { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "Flower" },
    { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "Flower" },
    { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "Flower" },
    { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "Flower" },
    {
      image:
        "https://media.istockphoto.com/id/1093110112/photo/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-of-green-forest-with-pure.jpg?s=612x612&w=0&k=20&c=lpQ1sQI49bYbTp9WQ_EfVltAqSP1DXg0Ia7APTjjxz4=",
      label: "Nature",
    },
  ]
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
          <Swiper spaceBetween={5} slidesPerView={"auto"} navigation={true} modules={[Navigation]} className="mt-1">
            {Array.from(categories).map((each: any, index) => (
              <SwiperSlide key={index}>
                <div
                  className={classes.bgTab}
                  style={{
                    background: selectedCategory == index ? "#6729f3" : "#fff",
                    color: selectedCategory == index ? "#fafafb" : "#92929D",
                  }}
                  onClick={() => {
                    setSelectedCategory(index)
                  }}
                >
                  {each}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper spaceBetween={20} slidesPerView={"auto"} navigation={true} modules={[Navigation]} className="mt-1">
            {Array.from(images).map((each: any, index) => (
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
      />
    </div>
  )
}

const SelectOutput = ({ setDone }: any) => {
  const resultImages = [
    "https://sepetjian.files.wordpress.com/2011/10/nasa1r3107_1000x1000.jpg",
    "https://sepetjian.files.wordpress.com/2011/10/nasa1r3107_1000x1000.jpg",
    "https://sepetjian.files.wordpress.com/2011/10/nasa1r3107_1000x1000.jpg",
    "https://sepetjian.files.wordpress.com/2011/10/nasa1r3107_1000x1000.jpg",
  ]
  const [currentActiveImg, setCurrentActiveImg] = useState(-1)
  const [imagesLoading, setImagesLoading] = useState(false)

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
export default Editor

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

function Editor({ handleClose }: any) {
  const [dimension, setDimension] = useState({
    width: 800,
    height: 800,
  })
  const [isDoneBtnDisabled, setIsDoneBtnDisabled] = useState(false)

  const { fabricEditor } = useFabricEditor()

  const { canvas, objects }: any = fabricEditor

  const [selectedCategory, setSelectedCategory] = useState(-1)
  const [selectedImg, setSelectedImg] = useState(-1)
  const categories = ["Mood", "Texture", "Color", "Pattern", "Shape", "Object"]
  const images = [
    { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "flower" },
    { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "flower" },
    { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "flower" },
    { image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg", label: "flower" },
    {
      image:
        "https://media.istockphoto.com/id/1093110112/photo/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-of-green-forest-with-pure.jpg?s=612x612&w=0&k=20&c=lpQ1sQI49bYbTp9WQ_EfVltAqSP1DXg0Ia7APTjjxz4=",
      label: "nature",
    },
  ]

  return (
    <div>
      <div className={"d-flex flex-row"}>
        <div className={classes.leftPanel}>
          <div className={classes.heading}>
            <div className={classes.arrowIcon}>
              <Icons.ArrowLeft />
            </div>
            Product Photoshoot
          </div>
          <div className={classes.headingDivider}></div>
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

export default Editor

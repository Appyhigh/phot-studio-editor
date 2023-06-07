import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import "swiper/css"
import classes from "./style.module.css"
import Cross from "~/components/Icons/Cross"
import { HandleStyleImageClick } from "~/views/DesignEditor/utils/functions/HandleStyleImageClick"

const StyleSwiper = ({ styleImage, setStyleImage, textToArtInputInfo, setTextToArtInputInfo }: any) => {
  return (
    <Swiper spaceBetween={10} slidesPerView={"auto"} navigation={true} modules={[Navigation]} className="mt-1">
      {Array.from(styleImage).map((image: any, index) => (
        <SwiperSlide key={index}>
          <img
            style={{
              width: "5.5rem",
              height: "5.5rem",
              background: "#FFFFFF",
              borderRadius: "0.5rem",
            }}
            src={image.image_link}
          />
          <div
            className={classes.cross}
            onClick={() =>
              HandleStyleImageClick(styleImage, setStyleImage, textToArtInputInfo, setTextToArtInputInfo, index, image)
            }
          >
            <Cross />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default StyleSwiper

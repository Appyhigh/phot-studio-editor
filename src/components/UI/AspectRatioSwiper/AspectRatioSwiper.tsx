import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import { Autoplay, Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import classes from "./style.module.css"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/autoplay"
import { useSwiper } from "swiper/react"

import clsx from "clsx"

const AspectRatioSwiper = ({ data, aspectRatioSelected, handleChange }: any) => {
  const [css, theme] = useStyletron()
  const swiper = useSwiper()
  const values = aspectRatioSelected.split(":")
  return (
    <Block
      className="aspect-ratio-slider"
      $style={{
        width: "270px",
        height: "40px",
        [theme.mediaQuery.large]: {
          width: "310px",
          height: "40px",
        },
      }}
    >
      <Swiper
        spaceBetween={6}
        slidesPerView={5}
        loop={true}
        centeredSlides={true}
        autoplay={false}
        navigation={true}
        modules={[Navigation, Autoplay]}
        onReachEnd={() => {
          swiper?.slideNext()
        }}
      >
        {data.map((each: any, idx: any) => (
          <SwiperSlide key={idx}>
            <div
              key={idx}
              className={clsx(
                classes.ctBox,
                "flex-center pointer",
                idx === 0 && "ml-0",
                values[0] == each.x && values[1] == each.y && classes.selectedCtBox
              )}
              onClick={() => {
                handleChange(each.x, each.y)
              }}
            >
              <div
                className={clsx(classes.shapes, values[0] == each.x && values[1] == each.y && classes.selectedShape)}
                style={{ width: `${each.xWid + "px"}`, height: `${each.yWid + "px"}` }}
              ></div>
              {each.x + ":" + each.y}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Block>
  )
}

export default AspectRatioSwiper

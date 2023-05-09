import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/autoplay"
const SwiperWrapper = ({ data }: any) => {
  return (
    <section style={{ width: "340px", height: "120px", marginLeft: "20px" }}>
      <Swiper
        spaceBetween={8}
        slidesPerView={3.4}
        loop={true}
        centeredSlides={true}
        navigation={true}
        modules={[Navigation, Autoplay]}
      >
        {data.map((each: any, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              <div style={{ width: "96px", height: "96px", background: each.each?each.each:`url(${each.img})` , borderRadius: "8px" }}></div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </section>
  )
}

export default SwiperWrapper

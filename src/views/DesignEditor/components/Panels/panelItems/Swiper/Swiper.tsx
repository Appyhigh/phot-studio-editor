import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/autoplay"
import { backgroundLayerType } from "~/constants/contants"
import { useEditor } from "@layerhub-io/react"
import Icons from "~/components/Icons"

const SwiperWrapper = ({ type, data, key, handleBgChangeOption, selectedBgOption }: any) => {
  const editor = useEditor()

  const handleChangeBg = (each:any) => {
    const bgObject = editor.frame.background.canvas._objects.filter(
      (el: any) => el.metadata?.type === backgroundLayerType
    )[0]


    if (bgObject) {
      editor.objects.remove(bgObject.id)
      editor.objects.unsetBackgroundImage()
    }
    if (each.color) {
      editor.frame.setBackgroundColor(each.color)
    } else if (each.img) {
      const options = {
        type: "StaticImage",
        src: each.img,
        preview: each.img,
        metadata: { generationDate: new Date().getTime(), type: backgroundLayerType },
      }
      editor.objects.add(options).then(() => {
        editor.objects.setAsBackgroundImage()
      })
    } else if (each.gradient) {
    }
  }

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
              <div
                className="pointer flex-center"
                onClick={() => {
                  handleChangeBg(each)                  
                  handleBgChangeOption({type,idx});

                }}
                key={idx}
                style={{
                  width: "96px",
                  height: "96px",
                  background: each.color || each.gradient ? each.color || each.gradient : `url(${each.img})`,
                  borderRadius: "8px",
                }}
              >
                {selectedBgOption.type === type && selectedBgOption.id === idx && <Icons.Selection size={"24"} />}
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </section>
  )
}

export default SwiperWrapper

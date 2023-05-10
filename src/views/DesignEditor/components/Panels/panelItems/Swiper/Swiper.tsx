import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/autoplay"
import { backgroundLayerType } from "~/constants/contants"
import { useEditor } from "@layerhub-io/react"
import Icons from "~/components/Icons"
import { useStyletron } from "baseui"
import { Block } from "baseui/block"

const SwiperWrapper = ({ type, data, handleBgChangeOption, selectedBgOption }: any) => {
  const editor = useEditor()
  const [css, theme] = useStyletron()

  const handleChangeBg = (each: any) => {
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
        editor.frame.setBackgroundColor("#ffffff")
        editor.objects.setAsBackgroundImage()
      })
    } else if (each.gradient) {
    }
  }

  return (
    <Block
      $style={{
        width: "280px",
        height: "96px",
        margin: "0px 10px",
        [theme.mediaQuery.large]: {
          width: "340px",
          height: "96px",
          marginLeft: "20px",
        },
      }}
    >
      <Swiper
        spaceBetween={8}
        slidesPerView={"auto"}
        loop={true}
        centeredSlides={true}
        navigation={true}
        modules={[Navigation, Autoplay]}
      >
        {data.map((each: any, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              <Block
                className="pointer flex-center"
                onClick={() => {
                  handleChangeBg(each)
                  handleBgChangeOption({ type, idx })
                }}
                key={idx}
                $style={{
                  width: "80px",
                  height: "80px",
                  position: "relative",
                  zIndex: 5,
                  background: each.color || each.gradient ? each.color || each.gradient : `url(${each.img})`,
                  borderRadius: "8px",
                  [theme.mediaQuery.large]: {
                    width: "96px",
                    height: "96px",
                  },
                }}
              >
                {selectedBgOption.type === type && selectedBgOption.id === idx && <Icons.Selection size={"24"} />}
              </Block>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Block>
  )
}

export default SwiperWrapper

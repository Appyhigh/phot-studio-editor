import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/autoplay"
import { useActiveObject, useEditor, useObjects } from "@layerhub-io/react"
import Icons from "~/components/Icons"
import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import { changeLayerBackgroundImage, changeLayerFill, changeLayerFillWithGradient } from "~/utils/updateLayerBackground"
import { useCallback, useContext } from "react"
import { toDataURL } from "~/utils/export"
import MainImageContext from "~/contexts/MainImageContext"
import { nanoid } from "nanoid"

const SwiperWrapper = ({ type, data, handleBgChangeOption, selectedBgOption }: any) => {
  const editor = useEditor()
  const [css, theme] = useStyletron()
  const activeObject: any = useActiveObject()
  const { mainImgInfo, setMainImgInfo } = useContext(MainImageContext)
  const objects = useObjects()
  const handleChangeBg = useCallback(
    async (each: any) => {
      const activeMainObject = editor.objects.findById(mainImgInfo.id)[0]
      if (each.color) {
        const previewWithUpdatedBackground: any = await changeLayerFill(
          activeMainObject?.metadata?.originalLayerPreview ?? activeMainObject.preview,
          each.color
        )
        const options = {
          type: "StaticImage",
          src: previewWithUpdatedBackground,
          preview: previewWithUpdatedBackground,
          original: mainImgInfo.original,
          id: nanoid(),
          metadata: {
            generationDate: new Date().getTime(),
            originalLayerPreview: activeMainObject?.metadata?.originalLayerPreview ?? activeMainObject.preview,
          },
        }
        editor.objects.removeById(mainImgInfo.id)
        editor.objects.add(options).then(() => {
          //@ts-ignore
          setMainImgInfo((prev) => ({ ...prev, ...options }))
        })
      } else if (each.gradient) {
        const previewWithUpdatedBackground: any = await changeLayerFillWithGradient(
          activeMainObject?.metadata?.originalLayerPreview ?? activeMainObject?.preview,
          each.gradient
        )
        const options = {
          type: "StaticImage",
          src: previewWithUpdatedBackground,
          preview: previewWithUpdatedBackground,
          original: mainImgInfo.original,
          id: nanoid(),
          metadata: {
            generationDate: new Date().getTime(),
            originalLayerPreview: activeMainObject?.metadata?.originalLayerPreview ?? activeMainObject?.preview,
          },
        }
        editor.objects.removeById(mainImgInfo.id)
        editor.objects.add(options).then(() => {
          //@ts-ignore
          setMainImgInfo((prev) => ({ ...prev, ...options }))
        })
      } else if (each.img) {
        toDataURL(each.img, async function (dataUrl: string) {
          const previewWithUpdatedBackground: any = await changeLayerBackgroundImage(
            activeMainObject?.metadata?.originalLayerPreview ?? activeMainObject.preview,
            dataUrl
          )
          const options = {
            type: "StaticImage",
            src: previewWithUpdatedBackground,
            preview: previewWithUpdatedBackground,
            original: mainImgInfo.original,

            id: nanoid(),
            metadata: {
              generationDate: new Date().getTime(),
              originalLayerPreview: activeMainObject?.metadata?.originalLayerPreview ?? activeMainObject.preview,
            },
          }
          editor.objects.removeById(mainImgInfo.id)
          editor.objects.add(options).then(() => {
          //@ts-ignore
          setMainImgInfo((prev) => ({ ...prev, ...options }))
        })
        })
      }
    },
    [mainImgInfo, handleBgChangeOption, selectedBgOption, type]
  )

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
                className="pointer flex-center p-relative"
                onClick={() => {
                  handleChangeBg(each)
                  handleBgChangeOption({ type, idx })
                }}
                key={idx}
                $style={{
                  width: "80px",
                  height: "80px",
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

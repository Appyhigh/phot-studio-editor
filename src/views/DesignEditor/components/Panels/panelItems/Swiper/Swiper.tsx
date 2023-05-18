import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/autoplay"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import Icons from "~/components/Icons"
import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import { changeLayerBackgroundImage, changeLayerFill, changeLayerFillWithGradient } from "~/utils/updateLayerBackground"
import { useCallback } from "react"
import { toDataURL } from "~/utils/export"
const SwiperWrapper = ({ type, data, handleBgChangeOption, selectedBgOption }: any) => {
  const editor = useEditor()
  const [css, theme] = useStyletron()
  const activeObject: any = useActiveObject()

  const handleChangeBg = useCallback(
    async (each: any) => {
      if (each.color) {
        const previewWithUpdatedBackground: any = await changeLayerFill(
          activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
          each.color
        )
        let topPosition = activeObject?.top
        let leftPosition = activeObject?.left

        const options = {
          type: "StaticImage",
          src: previewWithUpdatedBackground,
          preview: previewWithUpdatedBackground,
          metadata: {
            generationDate: new Date().getTime(),
            originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
          },
        }
        editor.objects.remove(activeObject?.id)

        editor.objects.add(options)
        setTimeout(() => {
          editor?.objects.update({ top: topPosition + 280, left: leftPosition + 30})
        }, 20)
      } else if (each.gradient) {
        const previewWithUpdatedBackground: any = await changeLayerFillWithGradient(
          activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
          each.gradient
        )
        let topPosition = activeObject?.top
        let leftPosition = activeObject?.left

        const options = {
          type: "StaticImage",
          src: previewWithUpdatedBackground,
          preview: previewWithUpdatedBackground,
          metadata: {
            generationDate: new Date().getTime(),
            originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
          },
        }
        editor.objects.remove(activeObject?.id)

        editor.objects.add(options)
        setTimeout(() => {
          editor?.objects.update({ top: topPosition + 280, left: leftPosition + 30 })
        }, 20)
      } else if (each.img) {
        toDataURL(each.img, async function (dataUrl: string) {
          const previewWithUpdatedBackground: any = await changeLayerBackgroundImage(
            activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
            dataUrl
          )
          let topPosition = activeObject?.top
          let leftPosition = activeObject?.left

          const options = {
            type: "StaticImage",
            src: previewWithUpdatedBackground,
            preview: previewWithUpdatedBackground,
            metadata: {
              generationDate: new Date().getTime(),
              originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
            },
          }
          editor.objects.remove(activeObject?.id)

          editor.objects.add(options)
          setTimeout(() => {
            editor?.objects.update({ top: topPosition + 280, left: leftPosition + 30})
          }, 20)
        })
      }
      editor.objects.removeById(activeObject?.id)
    },
    [activeObject]
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

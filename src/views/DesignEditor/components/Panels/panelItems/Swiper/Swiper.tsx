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
import { useCallback, useContext, useState, useEffect } from "react"
import { toDataURL } from "~/utils/export"
import MainImageContext from "~/contexts/MainImageContext"
import { HandleBgChangeOption } from "~/views/DesignEditor/utils/functions/HandleBgChangeFunc"
import classes from "./style.module.css"
import LoaderSpinner from "../../../../../Public/images/loader-spinner.svg"

const SwiperWrapper = ({ type, data, handleBgChangeOption, selectedBgOption }: any) => {
  const editor = useEditor()
  const [css, theme] = useStyletron()
  const activeObject: any = useActiveObject()
  const { mainImgInfo, setMainImgInfo } = useContext(MainImageContext)
  const objects = useObjects()
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeBg = useCallback(
    async (each: any) => {
      if (each.color) {
        HandleBgChangeOption(editor, mainImgInfo, setMainImgInfo, each.color, changeLayerFill)
      } else if (each.gradient) {
        HandleBgChangeOption(editor, mainImgInfo, setMainImgInfo, each.gradient, changeLayerFillWithGradient)
      } else if (each.img) {
        toDataURL(each.img, async function (dataUrl: string) {
          HandleBgChangeOption(
            editor,
            mainImgInfo,
            setMainImgInfo,
            dataUrl,
            changeLayerBackgroundImage,
            activeObject,
            null,
            setIsLoading,
            true
          )
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
      <Swiper spaceBetween={22} slidesPerView={"auto"} loop={true} navigation={true} modules={[Navigation, Autoplay]}>
        {data.map((each: any, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              <Block
                className="pointer flex-center p-relative"
                onClick={() => {
                  handleChangeBg(each)
                  handleBgChangeOption({ type, idx })
                  // @ts-ignore
                  setMainImgInfo((prev) => ({
                    ...prev,
                    swiper_option_selected: true,
                    color: each.color ? each.gradient : `url(${each.img})`,
                  }))
                }}
                key={idx}
                $style={{
                  width: "80px",
                  height: "80px",
                  zIndex: 5,
                  background: each.color || each.gradient ? each.color || each.gradient : `url(${each.img})`,
                  backgroundSize: "cover !important",
                  borderRadius: "8px",
                  [theme.mediaQuery.large]: {
                    width: "96px",
                    height: "96px",
                  },
                  pointerEvents: isLoading ? "none" : "auto",
                }}
              >
                {selectedBgOption.type === type &&
                  mainImgInfo.swiper_option_selected &&
                  selectedBgOption.id === idx && <Icons.Selection size={"24"} />}
                {selectedBgOption.type === type && selectedBgOption.id === idx && isLoading && (
                  <img className={classes.stockImagesLoading} src={LoaderSpinner} />
                )}
              </Block>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Block>
  )
}

export default SwiperWrapper

import { Block } from "baseui/block"
import PanelItem from "./PanelItem/PanelItem"
import PanelsList from "./PanelsList/PanelsList"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import Icons from "~/components/Icons"
import useIsSidebarOpen from "~/hooks/useIsSidebarOpen"
import classes from "./style.module.css"
import clsx from "clsx"
import { useContext, useEffect } from "react"
import useAppContext from "~/hooks/useAppContext"
import { PanelType } from "~/constants/app-options"
import SampleImagesContext from "~/contexts/SampleImagesContext"
import { SampleImagesApi } from "~/services/SampleImagesApi"
import { SAMPLE_IMAGES, TOOL_NAMES } from "~/constants/contants"
import ErrorContext from "~/contexts/ErrorContext"
import { BgOptions } from "~/views/DesignEditor/utils/BgOptions"
import { getStockImages } from "~/services/stockApi"

const Panels = () => {
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const isSidebarOpen = useIsSidebarOpen()
  const { activePanel } = useAppContext()

  useEffect(() => {
    if (!activePanel || !Object.values(PanelType).includes(activePanel)) {
      setIsSidebarOpen(false)
    }
  }, [activePanel])

  const { setSampleImages } = useContext(SampleImagesContext)
  const { setErrorInfo } = useContext(ErrorContext)
  let ErrortimeOut: any

  const fetchSampleImages = () => {
    const sampleImageKeys = Object.keys(SAMPLE_IMAGES)
    Promise.all(sampleImageKeys.map((key: string) => SampleImagesApi(SAMPLE_IMAGES[key])))
      .then((results) => {
        const updatedSampleImages = sampleImageKeys.reduce((prev: any, key: string, index: number) => {
          prev[key] = results[index]
          return prev
        }, {})

        setSampleImages((prev: any) => ({
          ...prev,
          ...updatedSampleImages,
          bgRemoverBgOptions: BgOptions,
        }))

        const categories = ["Nature", "Flowers", "Textures"]
        const addCategoryOptions = async (category: any) => {
          const res = await getStockImages(category)
          const newOptions = res.map((image: any) => ({ img: image.image_url_list[0] }))

          setSampleImages((prev: any) => {
            return {
              ...prev,
              bgRemoverBgOptions: [
                ...prev.bgRemoverBgOptions,
                {
                  heading: category,
                  options: newOptions,
                },
              ],
            }
          })
        }
        categories.forEach((category) => {
          addCategoryOptions(category)
        })
      })
      .catch((error) => {
        setErrorInfo((prev: any) => ({
          ...prev,
          showError: true,
          errorMsg: `Failed to load Sample Images for ${Object.values(TOOL_NAMES).join(", ")} panels`,
          retryFn: () => {
            if (ErrortimeOut) {
              clearTimeout(ErrortimeOut)
            }
            setErrorInfo((prev: any) => ({ ...prev, showError: false }))
            fetchSampleImages()
          },
        }))
        ErrortimeOut = setTimeout(() => {
          setErrorInfo((prev: any) => ({ ...prev, showError: false }))
        }, 5000)
        console.error("Error:", error)
      })
  }

  useEffect(() => {
    fetchSampleImages()
    return () => {
      clearTimeout(ErrortimeOut)
    }
  }, [])

  return (
    <>
      <PanelsList />
      <Block className="d-flex">
        <PanelItem />
        <Block
          className={clsx("m-auto pointer p-absolute", classes.sliderBtnWrapper, isSidebarOpen && classes.sliderOpen)}
        >
          {activePanel && Object.values(PanelType).includes(activePanel) && (
            <Block
              className={clsx("p-relative", classes.sliderBtn)}
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen)
              }}
            >
              <div>
                <Icons.SliderBtn size={106} />
              </div>

              <Block className={clsx("p-absolute", classes.sliderIcon, isSidebarOpen && classes.sliderIconTransform)}>
                <Icons.SliderIcon size={15} />
              </Block>
            </Block>
          )}
        </Block>
      </Block>
    </>
  )
}

export default Panels

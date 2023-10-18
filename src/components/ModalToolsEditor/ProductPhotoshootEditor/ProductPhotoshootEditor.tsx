import { useContext, useEffect, useState } from "react"
import useFabricEditor from "src/hooks/useFabricEditor"
import CanvasArea from "~/components/FabricCanvas/Editor/CanvasArea/CanvasArea"
import classes from "./style.module.css"
import ModalBasePanel from "~/components/FabricCanvas/Editor/Panels/ModalBasePanel/ModalBasePanel"
import "swiper/css"
import "swiper/css/navigation"
import ProductPhotoshootContext from "~/contexts/ProductPhotoshootContext"
import Resize from "~/components/Icons/Resize"
import { useEditor, useFrame } from "@layerhub-io/react"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"
import ImagesContext from "~/contexts/ImagesCountContext"
import { AddObjectFunc } from "~/views/DesignEditor/utils/functions/AddObjectFunc"
import CanvasLoaderContext from "~/contexts/CanvasLoaderContext"
import ProductPhotoshoot from "./../../../views/DesignEditor/components/ModalPanels/ProductPhotoShoot/ProductPhotoShoot"
import { useNavigate } from "react-router-dom"
import { SAMPLE_IMAGES } from "~/constants/contants"
import { SampleImagesApi } from "~/services/SampleImagesApi"
import SampleImagesContext from "~/contexts/SampleImagesContext"
import { getStockImages } from "~/services/stockApi"
import ErrorContext from "~/contexts/ErrorContext"

function ProductPhotoshootEditor({ handleClose }: any) {
  const [dimension, setDimension] = useState({
    width: 400,
    height: 400,
  })

  const { fabricEditor } = useFabricEditor()

  const { canvas, objects }: any = fabricEditor
  const editor = useEditor()
  const { productPhotoshootInfo, setProductPhotoshootInfo } = useContext(ProductPhotoshootContext)
  const { setImagesCt } = useContext(ImagesContext)
  const frame = useFrame()
  const { canvasLoader } = useContext(CanvasLoaderContext)
  const navigate = useNavigate()
  const { setSampleImages } = useContext(SampleImagesContext)
  const { setErrorInfo } = useContext(ErrorContext)
  let ErrortimeOut: any

  const handleDone = async () => {
    await getDimensions(productPhotoshootInfo.finalImage, (img: any) => {
      let latest_ct = 0
      setImagesCt((prev: any) => {
        latest_ct = prev + 1
        AddObjectFunc(productPhotoshootInfo.finalImage, editor, img.width, img.height, frame, (latest_ct = latest_ct))
        return prev + 1
      })
    })
    handleClose()
    navigate('/')
  }


  // Fetching Sample images data on /product-photoshoot
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
    <div
      style={{
        cursor: canvasLoader ? "not-allowed" : "pointer",
        height: '100%',
      }}
    >
      <div className={"d-flex flex-row"} style={{ pointerEvents: canvasLoader ? "none" : "auto", height: '100%' }}>
        <ProductPhotoshoot handleClose={handleClose} />

        <div className={classes.editor}>
          <ModalBasePanel handleDone={handleDone} handleClose={handleClose} />
          <div className={classes.three}>
            {productPhotoshootInfo.tooltip && (
              <div className={classes.toolTip}>
                <div className={classes.resizeIcon}>
                  <Resize />
                </div>
                {productPhotoshootInfo.result.length > 0 ? (
                  <>
                    <p>Not getting desired output? Try resizing your image</p>
                    <div
                      className={classes.toolTipBtn}
                      onClick={() => {
                        setProductPhotoshootInfo({
                          ...productPhotoshootInfo,
                          again: true,
                        })
                      }}
                    >
                      Resize
                    </div>
                  </>
                ) : (
                  <p>Click on image to resize & drag to canvas</p>
                )}
              </div>
            )}
            <CanvasArea width={dimension.width} height={dimension.height} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPhotoshootEditor

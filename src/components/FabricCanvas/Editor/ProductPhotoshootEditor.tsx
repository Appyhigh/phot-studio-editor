import { useContext, useState } from "react"
import useFabricEditor from "src/hooks/useFabricEditor"
import CanvasArea from "./CanvasArea/CanvasArea"
import classes from "./style.module.css"
import ModalBasePanel from "./Panels/ModalBasePanel/ModalBasePanel"
import PointerIcon from "~/components/Icons/PointerIcon"
import "swiper/css"
import "swiper/css/navigation"
import ProductPhotoshootLeftPanel from "./Panels/ProductPhotoshootLeftPanel/ProductPhotoshootLeftPanel"
import ProductPhotoshootContext from "~/contexts/ProductPhotoshootContext"
import Resize from "~/components/Icons/Resize"
import { useEditor, useFrame } from "@layerhub-io/react"
import { getDimensions } from "~/views/DesignEditor/utils/functions/getDimensions"
import ImagesContext from "~/contexts/ImagesCountContext"
import { AddObjectFunc } from "~/views/DesignEditor/utils/functions/AddObjectFunc"
import CanvasLoaderContext from "~/contexts/CanvasLoaderContext"

function ProductPhotoshootEditor({ handleClose }: any) {
  const [dimension, setDimension] = useState({
    width: 800,
    height: 800,
  })

  const { fabricEditor } = useFabricEditor()

  const { canvas, objects }: any = fabricEditor
  const editor = useEditor()
  const { productPhotoshootInfo, setProductPhotoshootInfo } = useContext(ProductPhotoshootContext)
  const { setImagesCt } = useContext(ImagesContext)
  const frame = useFrame()
  const { canvasLoader } = useContext(CanvasLoaderContext)

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
  }

  return (
    <div
      style={{
        cursor: canvasLoader ? "not-allowed" : "pointer",
      }}
    >
      <div className={"d-flex flex-row"} style={{ pointerEvents: canvasLoader ? "none" : "auto" }}>
        <ProductPhotoshootLeftPanel handleClose={handleClose} />

        <div className={classes.editor}>
          <ModalBasePanel handleDone={handleDone} isDoneBtnDisabled={!productPhotoshootInfo.finalImage} />
          <div className={classes.three}>
            {productPhotoshootInfo.tooltip && (
              <div className={classes.toolTip}>
                <div className={classes.resizeIcon}>
                  <Resize />
                </div>
                {productPhotoshootInfo.result.length > 0 ? (
                  <p>Not getting desired output? Try resizing your image</p>
                ) : (
                  <p>Click on image to resize & drag to canvas</p>
                )}
                <div
                  className={classes.toolTipBtn}
                  onClick={() => {
                    setProductPhotoshootInfo({ ...productPhotoshootInfo, tooltip: false })
                  }}
                >
                  Resize
                </div>
              </div>
            )}
            <CanvasArea width={dimension.width} height={dimension.height} />
          </div>
        </div>
      </div>

      <div className={classes.chevronIcon} style={{ bottom: "0.5rem" }}>
        <PointerIcon />
      </div>
    </div>
  )
}

export default ProductPhotoshootEditor

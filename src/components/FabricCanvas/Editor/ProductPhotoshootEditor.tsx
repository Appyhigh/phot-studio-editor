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

function ProductPhotoshootEditor({ handleClose }: any) {
  const [dimension, setDimension] = useState({
    width: 800,
    height: 800,
  })

  const { fabricEditor } = useFabricEditor()

  const { canvas, objects }: any = fabricEditor
  const { productPhotoshootInfo, setProductPhotoshootInfo } = useContext(ProductPhotoshootContext)

  return (
    <div>
      <div className={"d-flex flex-row"}>
        <ProductPhotoshootLeftPanel handleClose={handleClose} />
        {/* <ImagesPanel /> */}

        <div className={classes.editor}>
          <ModalBasePanel handleClose={handleClose} isDoneBtnDisabled={productPhotoshootInfo.result} />
          <div className={classes.three}>
            {productPhotoshootInfo.tooltip && (
              <div className={classes.toolTip}>
                <div className={classes.resizeIcon}>
                  <Resize />
                </div>
                <p>Click on image to resize & drag to canvas</p>
                <div
                  className={classes.toolTipBtn}
                  onClick={() => {
                    setProductPhotoshootInfo({ ...productPhotoshootInfo, tooltip: false })
                  }}
                >
                  Got it
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

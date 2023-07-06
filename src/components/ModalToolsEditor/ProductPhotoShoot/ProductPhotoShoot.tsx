import clsx from "clsx"
import { useState } from "react"
import useFabricEditor from "src/hooks/useFabricEditor"
import CanvasArea from "~/components/FabricCanvas/Editor/CanvasArea/CanvasArea"
import ModalBasePanel from "~/components/FabricCanvas/Editor/Panels/ModalBasePanel/ModalBasePanel"
import PointerIcon from "~/components/Icons/PointerIcon"
import classes from "./style.module.css"
import ObjectReplacer from "~/views/DesignEditor/components/ModalPanels/ObjectReplacer/ObjectReplacer"
function ProductPhotoShoot({ handleClose }: any) {
  const [dimension, setDimension] = useState({
    width: 800,
    height: 800,
  })
  const [isDoneBtnDisabled, setIsDoneBtnDisabled] = useState(false)

  const { fabricEditor } = useFabricEditor()

  const { canvas, objects }: any = fabricEditor

  return (
    <div className={"d-flex flex-column "}>
      <div className="d-flex">
        <div>photo Shoot</div>
        <div className="flex-1 d-flex flex-column p-relative">
          <ModalBasePanel handleClose={handleClose} isDoneBtnDisabled={isDoneBtnDisabled} />
          <div className={clsx(classes.canvasStyling)}>
            <CanvasArea width={dimension.width} height={dimension.height} />
          </div>
        </div>
        <div className={classes.chevronIcon} style={{ bottom: "0.5rem" }}>
          <PointerIcon />
        </div>
      </div>
    </div>
  )
}

export default ProductPhotoShoot

import { useEffect, useState } from "react"
import useFabricEditor from "src/hooks/useFabricEditor"
import classes from "./style.module.css"
import clsx from "clsx"
import PointerIcon from "~/components/Icons/PointerIcon"
import ModalBasePanel from "../../FabricCanvas/Editor/Panels/ModalBasePanel/ModalBasePanel"
import CanvasArea from "../../FabricCanvas/Editor/CanvasArea/CanvasArea"
import ObjectRemoverPanel from "~/views/DesignEditor/components/ModalPanels/ObjectRemover/ObjectRemover"
import ObjectReplacer from "~/views/DesignEditor/components/ModalPanels/ObjectReplacer/ObjectReplacer"

function ObjectReplacerEditor({ handleClose }: any) {
  const [dimension, setDimension] = useState({
    width: 400,
    height: 400,
  })
  const [isDoneBtnDisabled, setIsDoneBtnDisabled] = useState(false)
  const [brushTooltipShow, setBrushToolTip] = useState(false)

  const { fabricEditor } = useFabricEditor()

  const { canvas, objects }: any = fabricEditor

  const changeBrushToolTip = (value: boolean) => {
    setBrushToolTip(value)
  }

  return (
    <div className={"d-flex flex-column "}>
      <div className="d-flex">
        <div>
          <ObjectReplacer handleBrushToolTip={changeBrushToolTip} />
          {/* <ObjectRemoverPanel handleBrushToolTip={changeBrushToolTip} /> */}
        </div>
        <div className="flex-1 d-flex flex-column p-relative">
          <ModalBasePanel handleClose={handleClose} isDoneBtnDisabled={isDoneBtnDisabled} />
          <div className={clsx(classes.canvasStyling)}>
            <CanvasArea
              brushTooltipShow={brushTooltipShow}
              width={dimension.width}
              height={dimension.height}
              handleBrush={() => {
                setBrushToolTip(false)
              }}
            />
          </div>
        </div>
        <div className={classes.chevronIcon} style={{ bottom: "0.5rem" }}>
          <PointerIcon />
        </div>
      </div>
    </div>
  )
}

export default ObjectReplacerEditor

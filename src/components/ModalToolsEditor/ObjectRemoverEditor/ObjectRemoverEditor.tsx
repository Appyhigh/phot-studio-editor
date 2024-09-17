import { useContext, useState } from "react"
import useFabricEditor from "src/hooks/useFabricEditor"
import classes from "./style.module.css"
import clsx from "clsx"
import ModalBasePanel from "../../FabricCanvas/Editor/Panels/ModalBasePanel/ModalBasePanel"
import CanvasArea from "../../FabricCanvas/Editor/CanvasArea/CanvasArea"
import ObjectRemoverPanel from "~/views/DesignEditor/components/ModalPanels/ObjectRemover/ObjectRemover"

import CanvasLoaderContext from "~/contexts/CanvasLoaderContext"
import LoaderSpinner from "../../../views/Public/images/loader-spinner.svg"
function ObjectRemoverEditor({ handleClose }: any) {
  const [dimension, setDimension] = useState({
    width: 400,
    height: 400,
  })
  const [isDoneBtnDisabled, setIsDoneBtnDisabled] = useState(false)
  const [brushTooltipShow, setBrushToolTip] = useState(false)
  const { canvasLoader } = useContext(CanvasLoaderContext)

  const { fabricEditor } = useFabricEditor()

  const { canvas, objects }: any = fabricEditor

  const changeBrushToolTip = (value: boolean) => {
    setBrushToolTip(value)
  }

  return (
    <div className={"d-flex flex-column "}>
      <div className="d-flex">
        <div>
          <ObjectRemoverPanel handleBrushToolTip={changeBrushToolTip} />
        </div>
        <div className="flex-1 d-flex flex-column p-relative">
          <ModalBasePanel handleClose={handleClose} isDoneBtnDisabled={isDoneBtnDisabled} />
          <div className={clsx(classes.canvasStyling)}>
            {canvasLoader && (
              <div className={classes.loaderContainerRemover}>
                <img src={LoaderSpinner} />
              </div>
            )}
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
      </div>
    </div>
  )
}

export default ObjectRemoverEditor

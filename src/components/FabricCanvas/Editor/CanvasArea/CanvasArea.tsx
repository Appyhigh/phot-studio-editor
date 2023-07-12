import useAppContext from "~/hooks/useAppContext"
import Canvas from "../../../FabricCanvas/Canvas"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import { useEffect, useContext } from "react"
import LoaderSpinner from "../../../../views/Public/images/loader-spinner.svg"
import CanvasLoaderContext from "~/contexts/CanvasLoaderContext"

import useFabricEditor from "src/hooks/useFabricEditor"
function CanvasArea({ width, height, brushTooltipShow, handleBrush }: any) {
  const { activePanel } = useAppContext()
  const { canvasLoader } = useContext(CanvasLoaderContext)

  const { fabricEditor, setFabricEditor } = useFabricEditor()
  useEffect(() => {
    setTimeout(() => {
      handleBrush && handleBrush()
    }, 5000)
  }, [brushTooltipShow])

  return (
    <div className={classes.canvasarea}>
      {canvasLoader && (
        <div className={classes.loaderContainer}>
          <img src={LoaderSpinner} />
        </div>
      )}
      {brushTooltipShow && (
        <div className={classes.toolTip}>
          <div className={classes.brushIcon}>
            <Icons.Brush />
          </div>
          <p>Brush over the image</p>
        </div>
      )}
      <Canvas width={width} height={height} />
    
    </div>
  )
}

export default CanvasArea

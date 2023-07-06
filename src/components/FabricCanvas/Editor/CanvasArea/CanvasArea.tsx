import useAppContext from "~/hooks/useAppContext"
import Canvas from "../../../FabricCanvas/Canvas"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import { useEffect } from "react"

import useFabricEditor from "src/hooks/useFabricEditor"
function CanvasArea({ width, height, brushTooltipShow, handleBrush }: any) {
  const { activePanel } = useAppContext()

  const { fabricEditor, setFabricEditor } = useFabricEditor()
  useEffect(() => {
    setTimeout(() => {
      handleBrush()
    }, 5000)
  }, [brushTooltipShow])

  // @ts-ignore
  return (
    <div className={classes.cavasarea}>
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

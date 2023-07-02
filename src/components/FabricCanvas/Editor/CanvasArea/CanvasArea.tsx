import Canvas from "../../../FabricCanvas/Canvas"
import classes from "./style.module.css"
import LoaderSpinner from "../../../../views/Public/images/loader-spinner.svg"
import { useContext } from "react"
import CanvasLoaderContext from "~/contexts/CanvasLoaderContext"

function CanvasArea({ width, height }: any) {
  const { canvasLoader } = useContext(CanvasLoaderContext)
  return (
    <div className={classes.cavasarea}>
      {canvasLoader && (
        <div className={classes.loaderContainer}>
          <img src={LoaderSpinner} />
        </div>
      )}
      <Canvas width={width} height={height} />
    </div>
  )
}

export default CanvasArea

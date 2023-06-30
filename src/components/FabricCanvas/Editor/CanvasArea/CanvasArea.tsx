import useAppContext from "~/hooks/useAppContext"
import Canvas from "../../../FabricCanvas/Canvas"
import classes from "./style.module.css"
import Icons from "~/components/Icons"

function CanvasArea({ width, height,brushTooltipShow ,handleBrush}: any) {
  const { activePanel } = useAppContext()
  // @ts-ignore 
  return (
    <div className={classes.cavasarea}>
      {brushTooltipShow && (
        <div className={classes.toolTip}>
          <div className={classes.brushIcon}>
            <Icons.Brush />
          </div>
          <p>Brush over the image</p>
          <div className={classes.gotItBtn}
          onClick={()=>{
            handleBrush()
          }}
          >Got it</div>
        </div>
      )}
      <Canvas width={width} height={height} />
    </div>
  )
}

export default CanvasArea

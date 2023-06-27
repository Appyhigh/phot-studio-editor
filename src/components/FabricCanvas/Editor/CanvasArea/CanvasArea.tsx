import Canvas from "../../../FabricCanvas/Canvas"
import classes from "./style.module.css";

function CanvasArea({width,height}:any) {
  return (
    <div className={classes.cavasarea} 
    
    >
      <Canvas width={width} height={height} />
    </div>
  )
}

export default CanvasArea

import { TransformOptions } from "~/views/DesignEditor/utils/TransformOption"
import BaseSlider from "./BaseSlider"
import classes from "./style.module.css"

const Transform = () => {

  return (
    <div className={classes.adjustState}>
      {TransformOptions.map((each, idx) => (
        <BaseSlider  {...each} key={idx} />
      ))}
    </div>
  )
}

export default Transform

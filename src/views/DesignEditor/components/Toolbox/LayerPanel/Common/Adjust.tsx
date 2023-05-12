import { AdjustOptions } from "~/views/DesignEditor/utils/AdjustOptions"
import BaseSlider from "./BaseSlider"
import classes from "./style.module.css"
const Adjust = () => {
  return (
    <div className={classes.adjustState}>
      {AdjustOptions.map((each, idx) => (
        <BaseSlider {...each}  key={idx}/>
      ))}
    </div>
  )
}

export default Adjust

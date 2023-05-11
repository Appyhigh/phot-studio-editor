import clsx from "clsx"
import { useState } from "react"
import SliderBar from "~/components/UI/Common/SliderBar"
import classes from "./style.module.css";

const BaseSlider = ({ name }: { name: string }) => {
  const [inputVal, setInputVal] = useState(50)
  const minQuality = 10
  const maxQuality = 100

  const handleInputChange = (e: any) => {
    setInputVal(e[0])
  }
  return (
    <div className="my-1">
      <div className={"d-flex"}>
        <div className={classes.baseSliderHeading}>{name}</div>
        <div className="flex-1"></div>
        <div className={classes.percentageVal}>{inputVal} %</div>
      </div>
      <SliderBar
        width="200px"
        minVal={minQuality}
        maxVal={maxQuality}
        thumbSize={"14px"}
        val={[inputVal]}
        handleChange={handleInputChange}
      />
    </div>
  )
}

export default BaseSlider

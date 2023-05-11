import { Block } from "baseui/block"
import { useState } from "react"
import SliderBar from "~/components/UI/Common/SliderBar"
import classes from "./style.module.css"

const Blur = () => {
  const [blurVal, setBlurVal] = useState(50)
  const minQuality = 10
  const maxQuality = 100

  const handleBlurChange = (e: any) => {
    setBlurVal(e[0])
  }
  return (
    <div className={classes.blurState}>
      <Block>
        <SliderBar
          width="200px"
          minVal={minQuality}
          maxVal={maxQuality}
          thumbSize={"14px"}
          val={[blurVal]}
          handleChange={handleBlurChange}
        />
      </Block>
    </div>
  )
}

export default Blur

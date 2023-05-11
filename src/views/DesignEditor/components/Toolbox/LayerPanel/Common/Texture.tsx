import clsx from "clsx"
import classes from "./style.module.css"
import SliderBar from "~/components/UI/Common/SliderBar"
import { Block } from "baseui/block"
import { useState } from "react"

const Texture = () => {
  const [textureVal, setTextureVal] = useState(50)
  const minQuality = 10
  const maxQuality = 100
  const handleTextureChange = (e: any) => {
    setTextureVal(e[0])
  }
  return (
    <div className={classes.textureState}>
      <div className="d-flex  mt-2">
        <div className={clsx(classes.threadOption, classes.selectedTexture, "flex-center mr-2")}>
          <span>Thread</span>
        </div>
        <div className={clsx(classes.threadOption, "flex-center")}>
          <span>Lines</span>
        </div>
      </div>
      <Block>
        <SliderBar
          width="200px"
          minVal={minQuality}
          maxVal={maxQuality}
          thumbSize={"14px"}
          val={[textureVal]}
          handleChange={handleTextureChange}
        />
      </Block>
    </div>
  )
}

export default Texture

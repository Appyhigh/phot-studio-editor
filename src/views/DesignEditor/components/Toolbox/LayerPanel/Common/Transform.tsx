import { TransformOptions } from "~/views/DesignEditor/utils/TransformOption"
import BaseSlider from "./BaseSlider"
import classes from "./style.module.css"
import { useActiveObject } from "@layerhub-io/react"

const Transform = () => {
  const activeObject: any = useActiveObject()

  return (
    <div className={classes.adjustState}>
      {TransformOptions.map((each, idx) => (
        <BaseSlider
          {...each}
          value={
            each.type == "size"
              ? activeObject.fontSize
              : each.type == "lineHeight"
              ? activeObject.lineHeight
              : each.type == "letterSpacing"
              ? activeObject.charSpacing
              : null
          }
          key={idx}
        />
      ))}
    </div>
  )
}

export default Transform

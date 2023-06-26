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
            each.type == "size" && activeObject && activeObject.fontSize
              ? activeObject.fontSize > 400
                ? 100
                : activeObject.fontSize / 4
              : each.type == "lineHeight" && activeObject && activeObject.lineHeight
              ? activeObject.lineHeight > 1.5
                ? 100
                : activeObject.lineHeight <= 0.5
                ? 1
                : activeObject.lineHeight * 100 - 50
              : each.type == "letterSpacing" && activeObject && activeObject.charSpacing
              ? activeObject.charSpacing > 100
                ? 100
                : activeObject.charSpacing
              : 0
          }
          key={idx}
        />
      ))}
    </div>
  )
}

export default Transform

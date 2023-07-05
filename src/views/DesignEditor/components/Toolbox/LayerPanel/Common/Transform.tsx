import { TransformOptions } from "~/views/DesignEditor/utils/TransformOption"
import BaseSlider from "./BaseSlider"
import classes from "./style.module.css"
import { useActiveObject } from "@layerhub-io/react"

const Transform = () => {
  const activeObject: any = useActiveObject()

  const getValue = (each: any) => {
    if (each.type === "size" && activeObject && activeObject.fontSize) {
      if (activeObject.fontSize > 400) {
        return 100
      } else {
        return activeObject.fontSize / 4
      }
    } else if (each.type === "lineHeight" && activeObject && activeObject.lineHeight) {
      if (activeObject.lineHeight > 1.5) {
        return 100
      } else if (activeObject.lineHeight <= 0.5) {
        return 0
      } else {
        return activeObject.lineHeight * 100 - 50
      }
    } else if (each.type === "letterSpacing" && activeObject && activeObject.charSpacing) {
      if (activeObject.charSpacing > 1000) {
        return 100
      } else {
        return activeObject.charSpacing / 10
      }
    } else {
      return 0
    }
  }

  return (
    <div className={classes.adjustState}>
      {TransformOptions.map((each, idx) => (
        <BaseSlider {...each} value={getValue(each)} key={idx} />
      ))}
    </div>
  )
}

export default Transform

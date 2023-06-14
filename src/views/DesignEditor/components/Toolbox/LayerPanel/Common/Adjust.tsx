import { AdjustOptions } from "~/views/DesignEditor/utils/AdjustOptions"
import BaseSlider from "./BaseSlider"
import classes from "./style.module.css"
import { useActiveObject } from "@layerhub-io/react"
import { SLIDER_TYPE } from "~/views/DesignEditor/utils/enum"
import { IsFilterPresent } from "~/views/DesignEditor/utils/functions/FilterFunc"

const Adjust = () => {
  const activeObject: any = useActiveObject()

  const findVal = (type: any) => {
    let defaultValue = 0
    if (SLIDER_TYPE.BRIGHTNESS === type) {
      let index = IsFilterPresent(activeObject, "Brightness")
      if (index != -1) defaultValue = activeObject?.filters[index]?.brightness * 100
    } else if (SLIDER_TYPE.CONTRAST === type) {
      let index = IsFilterPresent(activeObject, "Contrast")
      if (index != -1) defaultValue = activeObject?.filters[index]?.contrast * 100
    } else if (SLIDER_TYPE.SATURATION === type) {
      let index = IsFilterPresent(activeObject, "Saturation")
      if (index != -1) defaultValue = activeObject?.filters[index]?.saturation * 100
    } else if (SLIDER_TYPE.HUE === type) {
      let index = IsFilterPresent(activeObject, "HueRotation")
      if (index != -1) defaultValue = activeObject?.filters[index]?.rotation * 100
    }

    return defaultValue
  }

  return (
    <div className={classes.adjustState}>
      {AdjustOptions.map((each, idx) => {
        let defaultVal = findVal(each.type)
        return (
          <BaseSlider
            {...each}
            value={
              each.type === SLIDER_TYPE.OPACITY
                ? (activeObject?.opacity * 100).toFixed(0)
                : defaultVal
                ? defaultVal
                : activeObject?.filters?.general
                ? activeObject?.metadata?.general[each.type] ?? each.defaultValue
                : each.defaultValue
            }
            key={idx}
          />
        )
      })}
    </div>
  )
}

export default Adjust

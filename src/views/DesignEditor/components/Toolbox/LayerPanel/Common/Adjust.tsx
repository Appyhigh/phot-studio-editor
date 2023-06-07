import { AdjustOptions } from "~/views/DesignEditor/utils/AdjustOptions"
import BaseSlider from "./BaseSlider"
import classes from "./style.module.css"
import { useActiveObject } from "@layerhub-io/react"
import { SLIDER_TYPE } from "~/views/DesignEditor/utils/enum"

const Adjust = () => {
  const activeObject: any = useActiveObject()
  return (
    <div className={classes.adjustState}>
      {AdjustOptions.map((each, idx) => (
        <BaseSlider
          {...each}
          value={
            each.type === SLIDER_TYPE.OPACITY
              ? (activeObject?.opacity * 100).toFixed(0)
              : activeObject?.metadata?.general
              ? activeObject?.metadata?.general[each.type] ?? each.defaultValue
              : each.defaultValue
          }
          key={idx}
        />
      ))}
    </div>
  )
}

export default Adjust

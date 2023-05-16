import clsx from "clsx"
import React, { useState } from "react"
import SliderBar from "~/components/UI/Common/SliderBar"
import classes from "./style.module.css"
import { SLIDER_TYPE } from "~/views/DesignEditor/utils/enum"
import { useActiveObject, useEditor } from "@layerhub-io/react"

const BaseSlider = ({
  name,
  minVal,
  maxVal,
  percentage,
  type,
  step,
}: {
  name: string
  minVal: number
  maxVal: number
  percentage: boolean
  type: string
  step: number
}) => {
  const [inputVal, setInputVal] = useState(minVal + 10)
  const minQuality = minVal
  const maxQuality = maxVal
  const activeObject = useActiveObject()

  // const handleInputChange = (e: any) => {
  //   setInputVal(e[0])
  // }

  React.useEffect(() => {
    // @ts-ignore
    if (activeObject && activeObject.type === "StaticText" && type == SLIDER_TYPE.SIZE) {
      // @ts-ignore
      if (type === SLIDER_TYPE.size) setInputVal(activeObject.fontSize)
      //  @ts-ignore
      else if (type === SLIDER_TYPE.LETTER_SPACING) setInputVal(activeObject.charSpacing)
      //  @ts-ignore
      else if (type === SLIDER_TYPE.LINE_HEIGHT) setInputVal(activeObject.lineHeight)
    }
  }, [activeObject])
  const editor = useEditor()
  const handleInputChange = (e: any) => {
    if (type === SLIDER_TYPE.SIZE) {
      editor.objects.update({ fontSize: e[0] })
      setInputVal(e[0])
    } else if (type === SLIDER_TYPE.LINE_HEIGHT) {
      editor.objects.update({
        [type]: e[0] / 10,
      })
      setInputVal(e[0])

    } else if (type === SLIDER_TYPE.LETTER_SPACING) {
      editor.objects.update({
        ["charSpacing"]: e[0] * 10,
      })
      setInputVal(e[0])

    } else setInputVal(e[0])
  }

  return (
    <div className="my-1">
      <div className={"d-flex"}>
        <div className={classes.baseSliderHeading}>{name}</div>
        <div className="flex-1"></div>
        <div className={classes.percentageVal}>
          {inputVal}
          {percentage && "%"}
        </div>
      </div>
      <SliderBar
        width="200px"
        minVal={minQuality}
        maxVal={maxQuality}
        thumbSize={"14px"}
        val={[inputVal]}
        step={step}
        handleChange={handleInputChange}
      />
    </div>
  )
}

export default BaseSlider

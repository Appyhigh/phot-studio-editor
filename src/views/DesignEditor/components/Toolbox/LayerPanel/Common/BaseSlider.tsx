import clsx from "clsx"
import React, { useContext, useState } from "react"
import SliderBar from "~/components/UI/Common/SliderBar"
import classes from "./style.module.css"
import { SLIDER_TYPE } from "~/views/DesignEditor/utils/enum"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { applyLightImageEffect, getModifiedImage } from "~/utils/canvasUtils"
import { DesignEditorContext } from "~/contexts/DesignEditor"

const BaseSlider = ({
  name,
  minVal,
  maxVal,
  percentage,
  type,
  step,
  value,
}: {
  name: string
  minVal: number
  maxVal: number
  percentage: boolean
  type: string
  step: number
  value: number
}) => {
  const [inputVal, setInputVal] = useState(value)
  const minQuality = minVal
  const maxQuality = maxVal
  const activeObject: any = useActiveObject()

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
  const handleInputChange = async (e: any) => {
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
    } else if (type === SLIDER_TYPE.BRIGHTNESS) {
      const data: any = await getModifiedImage(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.BRIGHTNESS
      )
      console.log(data)
      setInputVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          general: { BRIGHTNESS: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (type === SLIDER_TYPE.CONTRAST) {
      const data = await getModifiedImage(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.CONTRAST
      )
      console.log(data)
      setInputVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          general: { CONTRAST: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (type === SLIDER_TYPE.SATURATION) {
      const data = await getModifiedImage(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.SATURATION
      )
      console.log(data)
      setInputVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          general: { SATURATION: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (type === SLIDER_TYPE.HUE) {
      const data = await getModifiedImage(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.HUE
      )
      console.log(data)
      setInputVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          general: { HUE: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (type === SLIDER_TYPE.OPACITY) {
      setInputVal(e[0])
      editor.objects.update({ opacity: e[0] / 100 })
    } else if (type === SLIDER_TYPE.HIGHLIGHT) {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.HIGHLIGHT
      )
      console.log(data)
      setInputVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          general: { HIGHLIGHT: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (type === SLIDER_TYPE.LOWLIGHT) {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.LOWLIGHT
      )
      console.log(data)
      setInputVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          general: { LOWLIGHT: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (type === SLIDER_TYPE.TEMPERATURE) {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.TEMPERATURE
      )
      console.log(data)
      setInputVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          general: { TEMPERATURE: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else {
      setInputVal(e[0])
    }
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

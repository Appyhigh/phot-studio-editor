import React, { useEffect, useState } from "react"
import SliderBar from "~/components/UI/Common/SliderBar"
import classes from "./style.module.css"
import { SLIDER_TYPE } from "~/views/DesignEditor/utils/enum"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { applyLightImageEffect, getModifiedImage } from "~/utils/canvasUtils"
import { fabric } from "fabric"
import { IsFilterPresent } from "~/views/DesignEditor/utils/functions/FilterFunc"
import { UpdatedImgFunc } from "~/views/DesignEditor/utils/functions/UpdatedImgFunc"
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
      editor.objects.update({ fontSize: e[0] * 4 })
      setInputVal(e[0])
    } else if (type === SLIDER_TYPE.LINE_HEIGHT) {
      editor.objects.update({
        [type]: (e[0] / 100) * 1 + 0.5,
      })
      setInputVal(e[0])
    } else if (type === SLIDER_TYPE.LETTER_SPACING) {
      editor.objects.update({
        ["charSpacing"]: e[0] * 10,
      })
      setInputVal(e[0])
    } else if (type === SLIDER_TYPE.BRIGHTNESS) {
      let index = IsFilterPresent(activeObject, "Brightness")
      if (index != -1) {
        activeObject.filters[index]["brightness"] = e[0] / 100

        editor.objects.findById(activeObject?.id)[0].applyFilters()
        let base64 = activeObject?._filteredEl?.toDataURL()
        editor.objects.update({
          src: base64,
          preview: base64,
        })
        setInputVal(e[0])
      } else {
        var filter = new fabric.Image.filters.Brightness({
          brightness: e[0] / 100,
        })
        setInputVal(e[0])
        editor.objects.update({
          // @ts-ignore
          filters: [...activeObject?.filters, filter],
        })

        editor.objects.findById(activeObject?.id)[0].applyFilters()
        let base64 = activeObject?._filteredEl?.toDataURL()

        editor.objects.update({
          src: base64,
          preview: base64,
        })
      }
      editor.canvas.requestRenderAll()
    } else if (type === SLIDER_TYPE.CONTRAST) {
      let index = IsFilterPresent(activeObject, "Contrast")

      if (index != -1) {
        activeObject.filters[index]["contrast"] = e[0] / 100
        editor.objects.findById(activeObject?.id)[0].applyFilters()
        let base64 = activeObject?._filteredEl?.toDataURL()

        editor.objects.update({
          src: base64,
          preview: base64,
        })
        setInputVal(e[0])
      } else {
        var filter = new fabric.Image.filters.Contrast({
          contrast: e[0] / 100,
        })
        setInputVal(e[0])

        editor.objects.update({
          // @ts-ignore
          filters: [...activeObject?.filters, filter],
        })
        editor.objects.findById(activeObject?.id)[0].applyFilters()
        let base64 = activeObject?._filteredEl?.toDataURL()

        editor.objects.update({
          src: base64,
          preview: base64,
        })
      }
      editor.canvas.requestRenderAll()
    } else if (type === SLIDER_TYPE.SATURATION) {
      let index = IsFilterPresent(activeObject, "Saturation")

      if (index != -1) {
        activeObject.filters[index]["saturation"] = e[0] / 100
        editor.objects.findById(activeObject?.id)[0].applyFilters()
        let base64 = activeObject?._filteredEl?.toDataURL()

        editor.objects.update({
          src: base64,
          preview: base64,
        })
        setInputVal(e[0])
      } else {
        var filter = new fabric.Image.filters.Saturation({
          saturation: e[0] / 100,
        })
        setInputVal(e[0])
        editor.objects.update({
          // @ts-ignore
          filters: [...activeObject?.filters, filter],
        })
        editor.objects.findById(activeObject?.id)[0].applyFilters()
        let base64 = activeObject?._filteredEl?.toDataURL()

        editor.objects.update({
          src: base64,
          preview: base64,
        })
      }
      editor.canvas.requestRenderAll()
    } else if (type === SLIDER_TYPE.HUE) {
      let index = IsFilterPresent(activeObject, "HueRotation")
      if (index != -1) {
        activeObject.filters[index]["rotation"] = e[0] / 100
        let base64 = activeObject?._filteredEl?.toDataURL()
        editor.objects.update({
          src: base64,
          preview: base64,
        })
        editor.objects.findById(activeObject?.id)[0].applyFilters()

        setInputVal(e[0])
      } else {
        var filter = new fabric.Image.filters.HueRotation({
          rotation: e[0] / 100,
        })
        setInputVal(e[0])
        editor.objects.update({
          // @ts-ignore
          filters: [...activeObject?.filters, filter],
        })
        editor.objects.findById(activeObject?.id)[0].applyFilters()

        let base64 = activeObject?._filteredEl?.toDataURL()

        editor.objects.update({
          src: base64,
          preview: base64,
        })
      }
      editor.canvas.requestRenderAll()
    } else if (type === SLIDER_TYPE.OPACITY) {
      setInputVal(e[0])
      editor.objects.update({ opacity: e[0] / 100 })
    } else if (type === SLIDER_TYPE.HIGHLIGHT) {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.HIGHLIGHT
      )

      setInputVal(e[0])

      UpdatedImgFunc(data, editor, activeObject, e[0], "Highlight")
    } else if (type === SLIDER_TYPE.LOWLIGHT) {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.LOWLIGHT
      )
      setInputVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "Lowlight")
    } else if (type === SLIDER_TYPE.TEMPERATURE) {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.TEMPERATURE
      )
      setInputVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "Temperature")
    } else if (type === SLIDER_TYPE.VIBRANCE) {
      let index = IsFilterPresent(activeObject, "Vibrance")

      if (index != -1) {
        activeObject.filters[index]["vibrance"] = e[0] / 100
        editor.objects.findById(activeObject?.id)[0].applyFilters()
        let base64 = activeObject?._filteredEl?.toDataURL()

        editor.objects.update({
          src: base64,
          preview: base64,
        })
        setInputVal(e[0])
      } else {
        // @ts-ignore
        var filter = new fabric.Image.filters.Vibrance({
          vibrance: e[0] / 100,
        })
        setInputVal(e[0])
        editor.objects.update({
          // @ts-ignore
          filters: [...activeObject?.filters, filter],
        })
        editor.objects.findById(activeObject?.id)[0].applyFilters()
        let base64 = activeObject?._filteredEl?.toDataURL()

        editor.objects.update({
          src: base64,
          preview: base64,
        })
      }
      editor.canvas.requestRenderAll()
    } else if (type === SLIDER_TYPE.PIXELATE) {
      let index = IsFilterPresent(activeObject, "Pixelate")

      if (index != -1) {
        activeObject.filters[index]["blocksize"] = e[0]
        editor.objects.findById(activeObject?.id)[0].applyFilters()
        let base64 = activeObject?._filteredEl?.toDataURL()

        editor.objects.update({
          src: base64,
          preview: base64,
        })

        setInputVal(e[0])
      } else {
        var filter = new fabric.Image.filters.Pixelate({
          blocksize: e[0],
        })

        setInputVal(e[0])
        editor.objects.update({
          // @ts-ignore
          filters: [...activeObject?.filters, filter],
        })
        editor.objects.findById(activeObject?.id)[0].applyFilters()
        let base64 = activeObject?._filteredEl?.toDataURL()

        editor.objects.update({
          src: base64,
          preview: base64,
        })
      }
      editor.canvas.requestRenderAll()
    } else if (SLIDER_TYPE.NOISE) {
      let index = IsFilterPresent(activeObject, "Noise")

      if (index != -1) {
        activeObject.filters[index]["noise"] = e[0] * 10
        let base64 = activeObject?._filteredEl?.toDataURL()

        editor.objects.update({
          src: base64,
          preview: base64,
        })
        setInputVal(e[0])
        editor.objects.findById(activeObject?.id)[0].applyFilters()
      } else {
        var filter = new fabric.Image.filters.Noise({
          noise: e[0] * 10,
        })
        setInputVal(e[0])
        editor.objects.update({
          // @ts-ignore
          filters: [...activeObject?.filters, filter],
        })
        editor.objects.findById(activeObject?.id)[0].applyFilters()
        let base64 = activeObject?._filteredEl?.toDataURL()

        editor.objects.update({
          src: base64,
          preview: base64,
        })
      }
      editor.canvas.requestRenderAll()
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

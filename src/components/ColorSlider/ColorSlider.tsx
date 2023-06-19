import classes from "./style.module.css"
import { IsFilterPresent } from "~/views/DesignEditor/utils/functions/FilterFunc"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { fabric } from "fabric"
import { useState } from "react"
import { HexColorPicker } from "react-colorful"
const ColorSlider = ({ minVal, maxVal, value }: any) => {
  const activeObject: any = useActiveObject()
  const editor = useEditor()
  const [inputVal, setInputVal] = useState(value)

  const handleInputChange = (e: any) => {
    let index = IsFilterPresent(activeObject, "HueRotation")
    if (index != -1) {
      activeObject.filters[index]["rotation"] = e.target.value / 100
      let base64 = activeObject?._filteredEl?.toDataURL()
      editor.objects.update({
        src: base64,
        preview: base64,
      })
      editor.objects.findById(activeObject?.id)[0].applyFilters()

      setInputVal(e.target.value)
    } else {
      var filter = new fabric.Image.filters.HueRotation({
        rotation: e.target.value / 100,
      })
      setInputVal(e.target.value)
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
  }

  return (
    <div className="hex-color-slider">
      {/* hex color picker  */}
      {/* <HexColorPicker
        onChange={(color) => {
          console.log(color)
        }}
      /> */}

      {/* background gradient input type   */}
      <div className={"d-flex"}>
        <div className={classes.baseSliderHeading}>{"Hue"}</div>
        <div className="flex-1"></div>
      </div>
      <input
        className={classes.range}
        type="range"
        min={-100}
        max={100}
        value={value}
        onChange={(e) => {
          handleInputChange(e)
        }}
        style={{ background: "linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)" }}
      ></input>
    </div>
  )
}

export default ColorSlider

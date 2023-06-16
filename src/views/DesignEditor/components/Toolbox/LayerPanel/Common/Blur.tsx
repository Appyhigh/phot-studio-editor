import { Block } from "baseui/block"
import { useCallback, useEffect, useState } from "react"
import SliderBar from "~/components/UI/Common/SliderBar"
import classes from "./style.module.css"
import { useActiveObject, useEditor, useObjects } from "@layerhub-io/react"
import { IsFilterPresent } from "~/views/DesignEditor/utils/functions/FilterFunc"
import { fabric } from "fabric"
const Blur = () => {
  const [blurVal, setBlurVal] = useState(1)
  const minQuality = 0
  const maxQuality = 100
  const objects = useObjects()
  const editor = useEditor()
  const activeObject: any = useActiveObject()

  useEffect(() => {
    let index = IsFilterPresent(activeObject, "Blur")
    if (index != -1) setBlurVal(activeObject?.filters[index]?.blur*100)
  }, [activeObject])

  const handleBlurChange = useCallback(
    async (e: any) => {
      let index = IsFilterPresent(activeObject, "Blur")
      if (index != -1) {
        activeObject.filters[index]["blur"] = e[0] / 100
        let base64 = activeObject?._filteredEl?.toDataURL()
        editor.objects.update({
          src: base64,
          preview: base64,
        })
        setBlurVal(e[0])
        editor.objects.findById(activeObject?.id)[0].applyFilters()
      } else {
        var filter = new fabric.Image.filters.Blur({
          blur: e[0] / 100,
        })
        editor.objects.update({
          // @ts-ignore
          filters: [...activeObject?.filters, filter],
        })
        let base64 = activeObject?._filteredEl?.toDataURL()

        editor.objects.update({
          src: base64,
          preview: base64,
        })
      }
    },
    [objects]
  )

  return (
    <div className={classes.blurState}>
      <Block>
        <SliderBar
          width="200px"
          minVal={minQuality}
          maxVal={maxQuality}
          thumbSize={"14px"}
          val={blurVal}
          handleChange={handleBlurChange}
        />
      </Block>
    </div>
  )
}

export default Blur

import { Block } from "baseui/block"
import { useCallback, useState } from "react"
import SliderBar from "~/components/UI/Common/SliderBar"
import classes from "./style.module.css"
import { useActiveObject, useEditor, useObjects } from "@layerhub-io/react"
import { getModifiedImage } from "~/utils/canvasUtils"
import { SLIDER_TYPE } from "~/views/DesignEditor/utils/enum"
// import { getBlurImage } from "~/utils/canvasUtils"

const Blur = () => {
  const [blurVal, setBlurVal] = useState(1)
  const minQuality = 0
  const maxQuality = 100
  const objects = useObjects()
  const editor = useEditor()
  const activeObject: any = useActiveObject()

  const handleBlurChange = useCallback(
    async (e: any) => {
      const data: any = await getModifiedImage(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.BLUR
      )
      console.log(data)
      setBlurVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          general: { BLUR: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
      // editor.objects.remove(activeObject?.id)
      // editor.objects.add({
      //   src: data,
      //   // id: nanoid(),
      //   preview: data,
      //   original: data,
      //   type: "StaticImage",
      //   name: activeObject.name,
      // })
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
          val={[activeObject?.metadata?.general ? activeObject?.metadata?.general[SLIDER_TYPE.BLUR] ?? 0 : 0]}
          handleChange={handleBlurChange}
        />
      </Block>
    </div>
  )
}

export default Blur

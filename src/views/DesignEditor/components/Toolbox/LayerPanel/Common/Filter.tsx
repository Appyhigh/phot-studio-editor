import { filterOptions } from "~/views/DesignEditor/utils/FilterOptions"
import classes from "./style.module.css"
import clsx from "clsx"
import { useEffect, useState } from "react"
import SliderBar from "~/components/UI/Common/SliderBar"
import { Block } from "baseui/block"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { applyLightImageEffect } from "~/utils/canvasUtils"
import { SLIDER_TYPE } from "~/views/DesignEditor/utils/enum"

const Filter = () => {
  const activeObject: any = useActiveObject()
  const editor = useEditor()
  const [selectedFilter, setSelectedFilter] = useState<string>("City")
  const [filterVal, setfilterVal] = useState(
    activeObject?.metadata?.filter ? activeObject?.metadata?.filter["City"] : 0
  )
  const minQuality = 0
  const maxQuality = 100

  useEffect(() => {
    setfilterVal(activeObject?.metadata?.filter ? activeObject?.metadata?.filter[selectedFilter] : 0)
  }, [selectedFilter])

  const handleFilterChange = async (e: any) => {
    if (selectedFilter === "B&W") {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.BANDW
      )
      console.log(data)
      setfilterVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          filter: { "B&W": e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (selectedFilter === "Noir") {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.NOIR
      )
      console.log(data)
      setfilterVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          filter: { Noir: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (selectedFilter === "Fade") {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.FADE
      )
      console.log(data)
      setfilterVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          filter: { Fade: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (selectedFilter === "Mono") {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.MONO
      )
      console.log(data)
      setfilterVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          filter: { Mono: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (selectedFilter === "A2I") {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.A2I
      )
      console.log(data)
      setfilterVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          filter: { A2I: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (selectedFilter === "City") {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.CITY
      )
      console.log(data)
      setfilterVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          filter: { City: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (selectedFilter === "Bliss") {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.BLISS
      )
      console.log(data)
      setfilterVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          filter: { Bliss: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (selectedFilter === "Tonal") {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.TONAL
      )
      console.log(data)
      setfilterVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          filter: { Tonal: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (selectedFilter === "Vintage") {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.VINTAGE
      )
      console.log(data)
      setfilterVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          filter: { Vintage: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (selectedFilter === "HDR") {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.HDR
      )
      console.log(data)
      setfilterVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          filter: { HDR: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (selectedFilter === "LOMO") {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.LOMO
      )
      console.log(data)
      setfilterVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          filter: { LOMO: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (selectedFilter === "Matte") {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.MATTE
      )
      console.log(data)
      setfilterVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          filter: { Matte: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (selectedFilter === "Film") {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.FILM
      )
      console.log(data)
      setfilterVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          filter: { Film: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (selectedFilter === "Vibrant") {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.VIBRANT
      )
      console.log(data)
      setfilterVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          filter: { Vibrant: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    } else if (selectedFilter === "Cool") {
      const data = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.COOLTONE
      )
      console.log(data)
      setfilterVal(e[0])
      editor.objects.update({
        preview: data,
        src: data,
        fill: data,
        metadata: {
          filter: { Cool: e[0] },
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      })
    }
  }

  return (
    <div className={classes.filterState}>
      <div className={classes.filterOptions}>
        {filterOptions.map((each, idx) => (
          <div
            onClick={() => {
              setSelectedFilter(each.name)
            }}
            key={idx}
            className={clsx(
              classes.filterOption,
              "flex-center pointer",
              selectedFilter === each.name && classes.selectedFilter
            )}
          >
            <span className={classes.filterName}>{each.name}</span>
          </div>
        ))}
      </div>

      <Block className="mb-1">
        <SliderBar
          width="200px"
          minVal={minQuality}
          maxVal={maxQuality}
          thumbSize={"14px"}
          val={[filterVal]}
          handleChange={handleFilterChange}
        />
      </Block>
    </div>
  )
}

export default Filter

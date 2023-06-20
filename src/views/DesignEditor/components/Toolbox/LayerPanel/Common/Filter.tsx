import { filterOptions } from "~/views/DesignEditor/utils/FilterOptions"
import classes from "./style.module.css"
import clsx from "clsx"
import { useEffect, useState } from "react"
import SliderBar from "~/components/UI/Common/SliderBar"
import { Block } from "baseui/block"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { applyLightImageEffect } from "~/utils/canvasUtils"
import { SLIDER_TYPE } from "~/views/DesignEditor/utils/enum"
import { UpdatedImgFunc } from "~/views/DesignEditor/utils/functions/UpdatedImgFunc"

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
    if (selectedFilter === "B&W") {
      setfilterVal(activeObject?.metadata?.general?.BlackWhite ? activeObject?.metadata?.general?.BlackWhite : 0)
    } else if (selectedFilter === "Noir") {
      setfilterVal(activeObject?.metadata?.general?.Noir ? activeObject?.metadata?.general?.Noir : 0)
    } else if (selectedFilter === "Fade") {
      setfilterVal(activeObject?.metadata?.general?.Fade ? activeObject?.metadata?.general?.Fade : 0)
    } else if (selectedFilter === "Mono") {
      setfilterVal(activeObject?.metadata?.general?.Mono ? activeObject?.metadata?.general?.Mono : 0)
    } else if (selectedFilter === "A2I") {
      setfilterVal(activeObject?.metadata?.general?.A2I ? activeObject?.metadata?.general?.A2I : 0)
    } else if (selectedFilter === "City") {
      setfilterVal(activeObject?.metadata?.general?.City ? activeObject?.metadata?.general?.City : 0)
    } else if (selectedFilter === "Bliss") {
      setfilterVal(activeObject?.metadata?.general?.Bliss ? activeObject?.metadata?.general?.Bliss : 0)
    } else if (selectedFilter === "Tonal") {
      setfilterVal(activeObject?.metadata?.general?.Tonal ? activeObject?.metadata?.general?.Tonal : 0)
    } else if (selectedFilter === "Vintage") {
      setfilterVal(activeObject?.metadata?.general?.Vintage ? activeObject?.metadata?.general?.Vintage : 0)
    } else if (selectedFilter === "HDR") {
      setfilterVal(activeObject?.metadata?.general?.HDR ? activeObject?.metadata?.general?.HDR : 0)
    } else if (selectedFilter === "LOMO") {
      setfilterVal(activeObject?.metadata?.general?.LOMO ? activeObject?.metadata?.general?.LOMO : 0)
    } else if (selectedFilter === "Matte") {
      setfilterVal(activeObject?.metadata?.general?.Matte ? activeObject?.metadata?.general?.Matte : 0)
    } else if (selectedFilter === "Film") {
      setfilterVal(activeObject?.metadata?.general?.Film ? activeObject?.metadata?.general?.Film : 0)
    } else if (selectedFilter === "Vibrant") {
      setfilterVal(activeObject?.metadata?.general?.Vibrant ? activeObject?.metadata?.general?.Vibrant : 0)
    } else if (selectedFilter === "Cool") {
      setfilterVal(activeObject?.metadata?.general?.Cool ? activeObject?.metadata?.general?.Cool : 0)
    } else setfilterVal(activeObject?.metadata?.filter ? activeObject?.metadata?.filter[selectedFilter] : 0)
  }, [selectedFilter])

  const handleFilterChange = async (e: any) => {
    if (selectedFilter === "B&W") {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.BANDW
      )
      setfilterVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "B&W")
    } else if (selectedFilter === "Noir") {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.NOIR
      )
      setfilterVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "Noir")
    } else if (selectedFilter === "Fade") {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.FADE
      )
      setfilterVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "Fade")
    } else if (selectedFilter === "Mono") {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.MONO
      )
      setfilterVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "Mono")
    } else if (selectedFilter === "A2I") {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.A2I
      )
      setfilterVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "A2I")
    } else if (selectedFilter === "City") {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.CITY
      )
      setfilterVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "City")
    } else if (selectedFilter === "Bliss") {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.BLISS
      )
      setfilterVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "Bliss")
    } else if (selectedFilter === "Tonal") {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.TONAL
      )
      setfilterVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "Tonal")
    } else if (selectedFilter === "Vintage") {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.VINTAGE
      )
      setfilterVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "Vintage")
    } else if (selectedFilter === "HDR") {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.HDR
      )
      setfilterVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "HDR")
    } else if (selectedFilter === "LOMO") {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.LOMO
      )
      setfilterVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "LOMO")
    } else if (selectedFilter === "Matte") {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.MATTE
      )
      setfilterVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "Matte")
    } else if (selectedFilter === "Film") {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.FILM
      )
      setfilterVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "Film")
    } else if (selectedFilter === "Vibrant") {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.VIBRANT
      )
      setfilterVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "Vibrant")
    } else if (selectedFilter === "Cool") {
      const data: any = await applyLightImageEffect(
        activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        e[0],
        SLIDER_TYPE.COOLTONE
      )
      setfilterVal(e[0])
      UpdatedImgFunc(data, editor, activeObject, e[0], "Cool")
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

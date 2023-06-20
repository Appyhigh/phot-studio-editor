import { applyLightImageEffect } from "~/utils/canvasUtils"
import { UpdatedImgFunc } from "../UpdatedImgFunc"
import { SLIDER_TYPE } from "../../enum"

export const applyExtraFilter = async (layer: any,editor:any) => {
    if (layer?.metadata?.general?.Highlight) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Highlight,
        SLIDER_TYPE.HIGHLIGHT
      )
       UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Highlight, "Highlight")
    }
    if (layer?.metadata?.general?.Lowlight) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Lowlight,
        SLIDER_TYPE.LOWLIGHT
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Lowlight, "Lowlight")
    }
    if (layer?.metadata?.general?.Temperature) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Temperature,
        SLIDER_TYPE.TEMPERATURE
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Temperature, "Temperature")
    }
    if (layer?.metadata?.general?.BlackWhite) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.BlackWhite,
        SLIDER_TYPE.BANDW
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.BlackWhite, "B&W")
    }
    if (layer?.metadata?.general?.Noir) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Noir,
        SLIDER_TYPE.NOIR
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Noir, "Noir")
    }
    if (layer?.metadata?.general?.Fade) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Fade,
        SLIDER_TYPE.FADE
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Fade, "Fade")
    }
    if (layer?.metadata?.general?.Mono) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Mono,
        SLIDER_TYPE.MONO
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Mono, "Mono")
    }

    if (layer?.metadata?.general?.A2I) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.A2I,
        SLIDER_TYPE.A2I
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.A2I, "A2I")
    }
    if (layer?.metadata?.general?.City) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.City,
        SLIDER_TYPE.CITY
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.City, "City")
    }
    if (layer?.metadata?.general?.Bliss) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Bliss,
        SLIDER_TYPE.BLISS
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Bliss, "Bliss")
    }

    if (layer?.metadata?.general?.Tonal) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Tonal,
        SLIDER_TYPE.TONAL
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Tonal, "Tonal")
    }
    if (layer?.metadata?.general?.Vintage) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Vintage,
        SLIDER_TYPE.VINTAGE
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Vintage, "Vintage")
    }
    if (layer?.metadata?.general?.HDR) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.HDR,
        SLIDER_TYPE.HDR
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.HDR, "HDR")
    }
    if (layer?.metadata?.general?.LOMO) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.LOMO,
        SLIDER_TYPE.LOMO
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.LOMO, "LOMO")
    }
    if (layer?.metadata?.general?.Matte) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Matte,
        SLIDER_TYPE.MATTE
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Matte, "Matte")
    }
    if (layer?.metadata?.general?.Film) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Film,
        SLIDER_TYPE.FILM
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Film, "Film")
    }

    if (layer?.metadata?.general?.Vibrant) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Vibrant,
        SLIDER_TYPE.VIBRANT
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Vibrant, "Vibrant")
    }
    if (layer?.metadata?.general?.Cool) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Cool,
        SLIDER_TYPE.COOLTONE
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Cool, "Cool")
    }
  }
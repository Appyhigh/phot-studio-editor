import { IsFilterPresentMetadata } from "../FilterFunc"
import { fabric } from "fabric"
export const applyFilterFunc = async (layer: any, editor: any) => {
  let filters: any = []
  let idx = IsFilterPresentMetadata(layer, "brightness")
  if (idx != -1) {
    var filter = new fabric.Image.filters.Brightness({
      // @ts-ignore
      brightness: layer?.filters[idx].brightness,
    })
    filters = [...filters, filter]
  }
  idx = IsFilterPresentMetadata(layer, "contrast")
  if (idx != -1) {
    var filter = new fabric.Image.filters.Contrast({
      // @ts-ignore
      contrast: layer?.filters[idx].contrast,
    })
    filters = [...filters, filter]
  }
  idx = IsFilterPresentMetadata(layer, "saturation")
  if (idx != -1) {
    var filter = new fabric.Image.filters.Saturation({
      // @ts-ignore
      saturation: layer?.filters[idx].saturation,
    })
    filters = [...filters, filter]
  }
  idx = IsFilterPresentMetadata(layer, "rotation")
  if (idx != -1) {
    var filter = new fabric.Image.filters.HueRotation({
      // @ts-ignore
      rotation: layer?.filters[idx].rotation,
    })
    filters = [...filters, filter]
  }

  idx = IsFilterPresentMetadata(layer, "vibrance")
  if (idx != -1) {
    // @ts-ignore
    var filter = new fabric.Image.filters.Vibrance({
      // @ts-ignore
      vibrance: layer?.filters[idx].vibrance,
    })
    filters = [...filters, filter]
  }
  idx = IsFilterPresentMetadata(layer, "blocksize")
  if (idx != -1) {
    var filter = new fabric.Image.filters.Pixelate({
      // @ts-ignore
      blocksize: layer?.filters[idx].blocksize,
    })
    filters = [...filters, filter]
  }
  idx = IsFilterPresentMetadata(layer, "noise")
  if (idx != -1) {
    var filter = new fabric.Image.filters.Noise({
      // @ts-ignore
      noise: layer?.filters[idx].noise,
    })
    filters = [...filters, filter]
  }

  editor.objects.update({ top: layer.top, left: layer.left, filters: filters })
  editor.objects.findById(layer.id)[0].applyFilters()
}

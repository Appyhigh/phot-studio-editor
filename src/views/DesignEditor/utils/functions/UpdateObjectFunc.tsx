import { AddObjectFunc } from "./AddObjectFunc"
import { getDimensions } from "./getDimensions"

export const UpdateObjectFunc = (url: string, editor: any, frame?: any, stateInfo?: any, setImgScalerInfo?: any, setImagesCt?: any) => {
  getDimensions(url, (img: any) => {
    let scale = 1
    if (img.width && img.height && frame) {
      if (img.width > frame.width || img.height > frame.height) {
        if (img.width / frame.width > img.height / frame.height) {
          scale = frame.width / img.width
        } else {
          scale = frame.height / img.height
        }
      }
    }
    var imageElement = document.createElement("img")
    imageElement.setAttribute("crossorigin", "Anonymous")
    imageElement.setAttribute("class", "canvas-img")
    imageElement.setAttribute("src", url)
    if (editor) {
      const options = {
        src: url,
        preview: url,
        metadata: { generationDate: new Date().getTime(), originalLayerPreview: url },
        width: img.width,
        height: img.height,
        _element: imageElement,
        scaleX: scale,
        scaleY: scale,
        _originalElement: imageElement,
      }
      setTimeout(() => {
        editor.objects.update(options, stateInfo.id)
      }, 500)
      setTimeout(() => {
        editor.canvas.requestRenderAll()
      }, 1000)
    }
  })
}

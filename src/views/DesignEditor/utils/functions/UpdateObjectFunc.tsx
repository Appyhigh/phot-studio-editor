import { getDimensions } from "./getDimensions"

export const UpdateObjectFunc = (url: string, editor: any, frame?: any) => {
  let scale = 1
  getDimensions(url, (img: any) => {
    console.log("scale", scale, img.width)
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
        _originalElement: imageElement,
      }
      setTimeout(() => {
        editor.objects.update(
          options,
          editor.canvas.canvas.getObjects()[editor.canvas.canvas.getObjects().length - 1].id
        )
      }, 100)
    }
  })
}

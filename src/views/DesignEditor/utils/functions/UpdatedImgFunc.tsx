export const UpdatedImgFunc = (data: string, editor: any, activeObject: any, inputVal: number, type: any) => {
  var imageElement = document.createElement("img")
  // Set the crossorigin attribute
  imageElement.setAttribute("crossorigin", "Anonymous")

  // Set the class attribute
  imageElement.setAttribute("class", "canvas-img")

  // Set the src attribute
  imageElement.setAttribute("src", data)
  if (type === "Highlight") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, Highlight: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
    })
  } else if (type === "Lowlight") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, Lowlight: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
    })
  } else if (type === "Temperature") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, Temperature: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
    })
  }
}

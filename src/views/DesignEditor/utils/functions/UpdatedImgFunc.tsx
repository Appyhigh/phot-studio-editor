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
      _originalElement: imageElement,
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
      _originalElement: imageElement,
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
      _originalElement: imageElement,
    })
  } else if (type === "B&W") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, BlackWhite: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
      _originalElement: imageElement,
    })
  } else if (type === "Noir") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, Noir: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
      _originalElement: imageElement,
    })
  } else if (type === "Fade") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, Fade: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
      _originalElement: imageElement,
    })
  } else if (type === "Mono") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, Mono: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
      _originalElement: imageElement,
    })
  } else if (type === "A2I") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, AI: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
      _originalElement: imageElement,
    })
  } else if (type === "City") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, City: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
      _originalElement: imageElement,
    })
  } else if (type === "Bliss") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, Bliss: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
      _originalElement: imageElement,
    })
  } else if (type === "Tonal") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, Tonal: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
      _originalElement: imageElement,
    })
  } else if (type === "Vintage") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, Vintage: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
      _originalElement: imageElement,
    })
  } else if (type === "HDR") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, HDR: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
      _originalElement: imageElement,
    })
  } else if (type === "LOMO") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, LOMO: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
      _originalElement: imageElement,
    })
  } else if (type === "Matte") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, Matte: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
      _originalElement: imageElement,
    })
  } else if (type === "Film") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, Film: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
      _originalElement: imageElement,
    })
  } else if (type === "Vibrant") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, Vibrant: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
      _originalElement: imageElement,
    })
  } else if (type === "Cool") {
    editor.objects.update({
      preview: data,
      src: data,
      metadata: {
        general: { ...activeObject?.metadata?.general, Cool: inputVal },
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
      },
      _element: imageElement,
      _originalElement: imageElement,
    })
  }
}

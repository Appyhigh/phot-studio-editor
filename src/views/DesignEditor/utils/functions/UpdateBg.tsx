import { backgroundLayerType, deviceUploadType } from "~/constants/contants"

const UpdateBg = (imageUrl: string, editor: any, frame: any) => {
  const bgObject = editor?.frame?.background?.canvas?._objects.filter(
    (el: any) => el.metadata?.type === backgroundLayerType || el.metadata?.type === deviceUploadType
  )[0]
  editor?.frame?.setBackgroundColor("#FFF")

  var imageElement = document.createElement("img")
  imageElement.setAttribute("crossorigin", "Anonymous")
  imageElement.setAttribute("class", "canvas-img")
  imageElement.setAttribute("src", imageUrl)
  const options = {
    type: "BackgroundImage",
    src: imageUrl,
    preview: imageUrl,
    metadata: { generationDate: new Date().getTime(), type: deviceUploadType },
    _element: imageElement,
    _originalElement: imageElement,
  }

  if (bgObject) {
    editor.objects.update(options, bgObject.id)
  } else {
    editor.objects.add(options).then(() => {
      setTimeout(() => {
        editor.objects.setAsBackgroundImage()
      }, 100)
    })
  }
}

export default UpdateBg

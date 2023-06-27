import { nanoid } from "nanoid"

const UpdateImg = (
  imageUrl: string,
  editor: any,
  mainImgInfo: any,
  setMainImgInfo: any,
  setPanelInfo: any,
  activeOb: any,
  width: any,
  height: any,
  frame: any
) => {
  const inputType = "StaticImage"

  let scale = 1
  if (width && height && frame) {
    if (width > frame.width || height > frame.height) {
      if (width / frame.width > height / frame.height) {
        scale = frame.width / width
      } else {
        scale = frame.height / height
      }
    }
  }
  let topPosition = activeOb?.top
  let leftPosition = activeOb?.left
  const activeMainObject = editor.objects.findById(mainImgInfo.id)[0]
  let preview = imageUrl
  var imageElement = document.createElement("img")
  imageElement.setAttribute("crossorigin", "Anonymous")
  imageElement.setAttribute("class", "canvas-img")
  imageElement.setAttribute("src", preview)
  const upload = {
    src: preview,
    id: nanoid(),
    preview: preview,
    original: preview,
    type: inputType,
    name: activeOb.name,
    metadata: { generationDate: new Date().getTime(), originalLayerPreview: preview },
    scaleX: scale,
    scaleY: scale,
    width: width,
    height: height,
    _element: imageElement,
    _originalElement: imageElement,
  }
  // to replace the object removing the previous active object first
  if (activeOb.id === mainImgInfo?.id) {
    setMainImgInfo((prev: any) => ({ ...prev, ...upload }))
    setPanelInfo((prev: any) => ({ ...prev, uploadPreview: true, bgOptions: false, bgRemoverBtnActive: true }))
  }
  editor.objects.update(upload)
}

export default UpdateImg

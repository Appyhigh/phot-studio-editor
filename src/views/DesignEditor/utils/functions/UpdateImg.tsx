import { nanoid } from "nanoid"

const UpdateImg = (
  imageUrl: string,
  editor: any,
  mainImgInfo: any,
  setMainImgInfo: any,
  setPanelInfo: any,
  activeOb: any,
  activeObject: any
) => {
  const inputType = "StaticImage"

  let topPosition = activeOb?.top
  let leftPosition = activeOb?.left
  const activeMainObject = editor.objects.findById(mainImgInfo.id)[0]
  let preview = imageUrl
  const upload = {
    src: preview,
    id: nanoid(),
    preview: preview,
    original: preview,
    type: inputType,
    name: activeOb.name,
    metadata: { generationDate: new Date().getTime(),originalLayerPreview:preview },
  }
  // to replace the object removing the previous active object first
  if (activeOb.id === mainImgInfo?.id) {
    setMainImgInfo((prev: any) => ({ ...prev, ...upload }))
    setPanelInfo((prev: any) => ({ ...prev, uploadPreview: true, bgOptions: false, bgRemoverBtnActive: true }))
  }
  editor.objects.remove(activeObject.id)
  editor.objects.add(upload)

  setTimeout(() => {
    editor?.objects.update({ top: topPosition + 280, left: leftPosition + 30 })
  }, 20)
}

export default UpdateImg

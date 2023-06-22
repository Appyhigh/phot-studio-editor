import { nanoid } from "nanoid"

export const AddObjectFunc = (
  url: string,
  editor: any,
  width?: number,
  height?: number,
  frame?: any,
  setRejectedFileUpload?: any,
  setAddImgInfo?: any,
  setImagesCt?: any
) => {
  let latest_ct = 0
  setImagesCt((prev: any) => {
    latest_ct = prev + 1
    return prev + 1
  })
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
  if (editor) {
    const options = {
      type: "StaticImage",
      id: nanoid(),
      src: url,

      preview: url,
      metadata: { generationDate: new Date().getTime(), originalLayerPreview: url },
      scaleX: scale,
      scaleY: scale,
      name: latest_ct.toString(),
    }
    editor.objects.add(options).then(() => {
      setRejectedFileUpload ? setRejectedFileUpload(false) : null
      setAddImgInfo ? setAddImgInfo((prev: any) => ({ ...prev, showPreview: false, url: "" })) : null
    })
  }
}

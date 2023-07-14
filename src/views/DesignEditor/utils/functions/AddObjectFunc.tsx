import { nanoid } from "nanoid"

export const AddObjectFunc = (
  url: string,
  editor: any,
  width?: number,
  height?: number,
  frame?: any,
  latest_ct?: any,
  setRejectedFileUpload?: any,
  setAddImgInfo?: any,
  setStateInfo?: any
) => {
  let scale = 1
  const id = nanoid()
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
      id: id,
      src: url,
      preview: url,
      metadata: { generationDate: new Date().getTime(), originalLayerPreview: url },
      scaleX: scale,
      scaleY: scale,
      name: latest_ct.toString(), 
    } 
    editor.objects.add(options).then(() => {
      setRejectedFileUpload ? setRejectedFileUpload(false) : null

      setAddImgInfo && setAddImgInfo((prev: any) => ({ ...prev, showPreview: false, url: "" }))
      setStateInfo && setStateInfo((prev: any) => ({ ...prev, id: id }))
    }).then(()=>{
      editor.objects.alignCenter()
    }) 
  }
}
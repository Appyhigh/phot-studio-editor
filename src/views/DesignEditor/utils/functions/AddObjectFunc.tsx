import { nanoid } from "nanoid"

export const AddObjectFunc = (url: string, editor: any, width?: number, height?: number, frame?: any) => {
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
      metadata: { generationDate: new Date().getTime() },
      scaleX: scale,
      scaleY: scale,
    }
    editor.objects.add(options)
  }
}

import { backgroundLayerType, deviceUploadType } from "~/constants/contants"

const UpdateBg = (imageUrl: string, editor: any, frame: any) => {
  const bgObject = editor?.frame?.background?.canvas?._objects.filter(
    (el: any) => el.metadata?.type === backgroundLayerType || el.metadata?.type === deviceUploadType
  )[0]
  editor.frame.resize({ width: frame.width, height: frame.height })

  if (bgObject) {
    editor.frame.resize({ width: frame.width, height: frame.height })
    editor.objects.remove(bgObject.id)
    editor.objects.unsetBackgroundImage()
  }

  editor?.frame?.setBackgroundColor("#FFF")

  const options = {
    type: "BackgroundImage",
    src: imageUrl,
    preview: imageUrl,
    metadata: { generationDate: new Date().getTime(), type: deviceUploadType },
  }
  editor.objects.add(options).then(() => {
    setTimeout(() => {
      editor.objects.setAsBackgroundImage()
    }, 100)
  })
}

export default UpdateBg

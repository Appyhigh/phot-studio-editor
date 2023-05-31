import { useFrame } from "@layerhub-io/react"
import { backgroundLayerType, checkboxBGUrl, deviceUploadType } from "~/constants/contants"

export const EraseBgFunc = ({ editor }: any) => {
  const frame = useFrame()
  const bgObject = editor?.frame?.background?.canvas?._objects.filter(
    (el: any) => el.metadata?.type === backgroundLayerType
  )[0]

  editor?.frame.resize({ width: frame.width, height: frame.height })

  const deviceUploadImg = editor?.frame?.background?.canvas?._objects.filter(
    (el: any) => el.metadata?.type === deviceUploadType
  )[0]

  const backgroundImage = editor?.frame?.background?.canvas?._objects.filter(
    (el: any) => el?.type === "BackgroundImage"
  )[0]

  editor?.frame?.setBackgroundColor("#FFF")

  if (!bgObject && !deviceUploadImg) {
    const options = {
      type: "BackgroundImage",
      src: checkboxBGUrl,
      preview: checkboxBGUrl,
      metadata: { generationDate: new Date().getTime(), type: backgroundLayerType },
    }

    editor.objects.add(options).then(() => {
      setTimeout(() => {
        editor.objects.setAsBackgroundImage()
      }, 100)
    })
  } else if (deviceUploadImg || backgroundImage) {
    if (deviceUploadImg) editor.objects.removeById(deviceUploadImg.id)
    else if (backgroundImage) editor.objects.removeById(backgroundImage.id)
    const options = {
      type: "BackgroundImage",
      src: checkboxBGUrl,
      preview: checkboxBGUrl,
      metadata: { generationDate: new Date().getTime(), type: backgroundLayerType },
    }

    editor.objects.add(options).then(() => {
      setTimeout(() => {
        editor.objects.setAsBackgroundImage()
      }, 100)
    })
  }
}

import { useFrame } from "@layerhub-io/react"
import { deviceUploadType } from "~/constants/contants"

export const SetBgFunc = ({ editor }: any) => {
  const frame = useFrame()
  // handleAsComponentHandler()
  editor.frame.resize({ width: frame.width, height: frame.height })
  const bgObject = editor?.frame?.background?.canvas?._objects.filter((el: any) => el.type === "BackgroundImage")[0]

  const deviceUploadImg = editor?.frame?.background?.canvas?._objects.filter(
    (el: any) => el.metadata?.type === deviceUploadType
  )[0]
  if (bgObject) {
    editor.objects.removeById(bgObject.id)
  } else if (deviceUploadImg) {
    editor.objects.removeById(deviceUploadImg.id)
  }
  editor.objects.unsetBackgroundImage()
  const options = {
    type: "BackgroundImage",
    metadata: { generationDate: new Date().getTime(), type: deviceUploadType },
  }

  editor.objects.setAsBackgroundImage()
  editor.objects.update({ ...options })
}

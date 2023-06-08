import { nanoid } from "nanoid"

export const HandleBgChangeOption = async (
  editor: any,
  mainImgInfo: any,
  setMainImgInfo: any,
  bg: string,
  changeLayer: any,
  activeObject?: any,
  inputImg?: any,
  setIsLoading?: any
) => {
  const activeMainObject = editor.objects.findById(mainImgInfo.id)[0]
  if (setIsLoading) setIsLoading(true)
  const previewWithUpdatedBackground: any = await changeLayer(
    activeMainObject ? activeMainObject?.metadata?.originalLayerPreview ?? activeMainObject.preview : inputImg,
    bg,
    activeMainObject ? activeMainObject?.width * activeMainObject?.scaleX : activeObject?.width * activeObject?.scaleX,
    activeMainObject ? activeMainObject?.height * activeMainObject?.scaleY : activeObject?.height * activeObject?.scaleY
  )
  const options = {
    type: "StaticImage",
    src: previewWithUpdatedBackground,
    preview: previewWithUpdatedBackground,
    original: mainImgInfo.original,
    name: activeObject ? activeObject.name : mainImgInfo.name,
    id: nanoid(),
    metadata: {
      generationDate: new Date().getTime(),
      originalLayerPreview: mainImgInfo? (activeMainObject?.metadata?.originalLayerPreview ?? activeMainObject.preview):inputImg,
    },
  }
  if (mainImgInfo) {
    editor.objects.removeById(mainImgInfo.id)
  } else editor.objects.removeById(activeObject?.id)
  editor.objects.add(options).then(() => {
    if (mainImgInfo) {
      //@ts-ignore
      setMainImgInfo((prev: any) => ({ ...prev, ...options }))
    }
    editor.objects.position("top", activeMainObject ? activeMainObject.top : activeObject.top)
    editor.objects.position("left", activeMainObject ? activeMainObject.left : activeObject.left)
  })
  if (setIsLoading) setIsLoading(false)
}

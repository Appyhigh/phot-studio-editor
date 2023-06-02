import { nanoid } from "nanoid"

export const HandleBgChangeOption = async (
  editor: any,
  mainImgInfo: any,
  setMainImgInfo: any,
  bg: string,
  changeLayer: any
) => {
  const activeMainObject = editor.objects.findById(mainImgInfo.id)[0]
  const previewWithUpdatedBackground: any = await changeLayer(
    activeMainObject?.metadata?.originalLayerPreview ?? activeMainObject.preview,
    bg,
    activeMainObject?.width * activeMainObject?.scaleX,
    activeMainObject?.height * activeMainObject?.scaleY
  )
  const options = {
    type: "StaticImage",
    src: previewWithUpdatedBackground,
    preview: previewWithUpdatedBackground,
    original: mainImgInfo.original,
    id: nanoid(),
    metadata: {
      generationDate: new Date().getTime(),
      originalLayerPreview: activeMainObject?.metadata?.originalLayerPreview ?? activeMainObject.preview,
    },
  }
  editor.objects.removeById(mainImgInfo.id)
  editor.objects.add(options).then(() => {
    //@ts-ignore
    setMainImgInfo((prev) => ({ ...prev, ...options }))
    editor.objects.position("top", activeMainObject.top)
    editor.objects.position("left", activeMainObject.left)
  })
}

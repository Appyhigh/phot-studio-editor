import { nanoid } from "nanoid"

export const HandleBgChangeOption = async (
  editor: any,
  mainImgInfo: any,
  setMainImgInfo: any,
  bg: string,
  changeLayer: any,
  activeObject?: any,
  inputImg?: any,
  setIsLoading?: any,
  isImage?: true
) => {
  if (setIsLoading) setIsLoading(true)
  const activeMainObject = editor.objects.findById(mainImgInfo.id)[0]
  const previewWithUpdatedBackground: any = await changeLayer(
    activeMainObject
      ? activeMainObject?.metadata?.originalLayerPreview ?? activeMainObject.preview ?? inputImg
      : inputImg,
    bg,
    activeMainObject ? activeMainObject?.width : activeObject?.width,
    activeMainObject ? activeMainObject?.height : activeObject?.height
  ).catch((err: any) => {
    if (setIsLoading) setIsLoading(false)
  })
  var imageElement = document.createElement("img")
  imageElement.setAttribute("crossorigin", "Anonymous")
  imageElement.setAttribute("class", "canvas-img")
  imageElement.setAttribute("src", previewWithUpdatedBackground)
  const options = {
    type: "StaticImage",
    src: previewWithUpdatedBackground,
    original: mainImgInfo.original,
    name: activeObject ? activeObject.name : mainImgInfo.name,
    id: nanoid(),
    metadata: {
      generationDate: new Date().getTime(),
      originalLayerPreview: mainImgInfo
        ? activeMainObject?.metadata?.originalLayerPreview ?? activeMainObject.preview
        : inputImg,
    },
    _element: imageElement,
    _originalElement: imageElement,
  }

  editor.objects.update(options)
  if (mainImgInfo) {
    setMainImgInfo((prev: any) => ({ ...prev, ...options }))
  }
  if (setIsLoading) setIsLoading(false)
}

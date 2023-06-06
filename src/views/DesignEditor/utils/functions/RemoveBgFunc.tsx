import { nanoid } from "nanoid"
import { useContext } from "react"
import { removeBackgroundController } from "~/utils/removeBackground"

export const RemoveBGFunc = async (
  editor: any,
  setLoaderPopup: any,
  setPanelInfo: any,
  mainImgInfo: any,
  setMainImgInfo: any,
  virtualSrcImageRef: any,
  virtualMaskImageRef: any,
  virtualCanvasSrcImageRef: any,
  virtualCanvasMaskImageRef: any,
  virtualCanvasResultImageRef: any,
  activeObject?: any,
  latest_ct?: any,
  upload?: any
) => {
  try {
    if (activeObject && activeObject?.metadata?.originalLayerPreview) {      
      const options = {
        type: "StaticImage",
        src: activeObject?.metadata?.originalLayerPreview,
        preview: activeObject?.metadata?.originalLayerPreview,
        original: activeObject.original,
        id: activeObject.id,

        metadata: {
          generationDate: activeObject?.metadata?.generationDate,
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
      }
      editor.objects.add(options).then(() => {
        setMainImgInfo((prev: any) => ({ ...prev, ...options }))
        editor.objects.position("top", activeObject.top)
        editor.objects.position("left", activeObject.left)
        editor.objects.resize("height", activeObject.height * activeObject.scaleY)
        editor.objects.resize("width", activeObject.width * activeObject.scaleX)
        editor.objects.remove(activeObject.id)
      })
    } else {
      setLoaderPopup(true)      
      removeBackgroundController(
        activeObject ? activeObject?.preview : mainImgInfo.src,
        (image: string) => {
          // Add the resultant image to the canvas
          const options = {
            type: "StaticImage",
            src: image,
            preview: image,
            id: nanoid(),
            name: latest_ct,
            metadata: {
              generationDate: activeObject?.metadata?.generationDate ?? new Date().getTime(),
              originalLayerPreview: image,
            },
          }
          editor.objects.add(options).then(() => {
            // @ts-ignore
            setPanelInfo((prev) => ({
              ...prev,
              bgOptions: true,
              bgRemoverBtnActive: false,
              uploadSection: false,
              trySampleImg: false,
              uploadPreview: false,
            }))
            setMainImgInfo((prev: any) => ({ ...prev, ...options }))
            if (activeObject) {
              editor.objects.removeById(activeObject.id)
              editor.objects.position("top", activeObject.top)
              editor.objects.position("left", activeObject.left)
              editor.objects.resize("height", activeObject.height * activeObject.scaleY)
              editor.objects.resize("width", activeObject.width * activeObject.scaleX)
            } else editor.objects.removeById(mainImgInfo.id)
            // Stop the loader
            setLoaderPopup(false)
          })
        },
        virtualSrcImageRef,
        virtualMaskImageRef,
        virtualCanvasSrcImageRef,
        virtualCanvasMaskImageRef,
        virtualCanvasResultImageRef,
        activeObject ? activeObject?.width * activeObject?.scaleX : 1000,
        activeObject ? activeObject?.height * activeObject?.scaleY : 1000
      )
    }
    // Start the loader
  } catch (error: any) {
    setLoaderPopup(false)
    console.log("Something went wrong while removing background...", error.message)
  }
}

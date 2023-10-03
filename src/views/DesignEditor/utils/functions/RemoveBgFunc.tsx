import _ from "lodash"
import { nanoid } from "nanoid"
import { removeBackgroundController } from "~/utils/removeBackground"

export const RemoveBGFunc = async (
  editor: any,
  setBlinkInOutLoader: any,
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
  errorInfo?: any,
  setErrorInfo?: any
) => {
  try {
    if (mainImgInfo) {
      if (mainImgInfo?.metadata?.originalLayerPreview) {
        var imageElement = document.createElement("img")
        imageElement.setAttribute("crossorigin", "Anonymous")
        imageElement.setAttribute("class", "canvas-img")
        imageElement.setAttribute("src", mainImgInfo?.metadata?.originalLayerPreview)
        const options = {
          type: "StaticImage",
          src: mainImgInfo?.metadata?.originalLayerPreview,
          preview: mainImgInfo?.metadata?.originalLayerPreview,
          name: latest_ct,
          id: nanoid(),
          metadata: {
            generationDate: activeObject?.metadata?.generationDate,
            originalLayerPreview: mainImgInfo?.metadata?.originalLayerPreview ?? activeObject.preview,
          },
          swiper_selected_color: '',
          _element: imageElement,
          _originalElement: imageElement,
        }
        editor.objects.update(options)
        setMainImgInfo((prev: any) => ({ ...prev, ...options }))
      } else {
        setBlinkInOutLoader(true)
        let response = await removeBackgroundController(
          mainImgInfo.src,
          (image: string) => {
            // Add the resultant image to the canvas
            if (image) {
              const options = {
                type: "StaticImage",
                src: image,
                preview: image,
                name: latest_ct,
                id: nanoid(),
                metadata: { generationDate: new Date().getTime(), originalLayerPreview: image },
              }
              editor.objects.add(options).then(() => {
                // @ts-ignore
                setPanelInfo((prev) => ({
                  ...prev,
                  bgOptions: true,
                  bgRemoverBtnActive: false,
                  uploadSection: false,
                  trySampleImg: false,
                }))

                editor.objects.removeById(mainImgInfo.id)
                setMainImgInfo((prev: any) => ({ ...prev, ...options }))
                // Stop the loader
                setBlinkInOutLoader(false)
              })
            } else {
              setBlinkInOutLoader(false)
              throw new Error("Something went wrong while removing background...")
            }
          },
          virtualSrcImageRef,
          virtualMaskImageRef,
          virtualCanvasSrcImageRef,
          virtualCanvasMaskImageRef,
          virtualCanvasResultImageRef,
          1000,
          1000
        )
        if (response) {
          setBlinkInOutLoader(false)
          throw new Error("Something went wrong while removing background...")
        }
      }
    } else if (
      activeObject &&
      activeObject?.metadata?.originalLayerPreview &&
      (activeObject && activeObject?.metadata?.originalLayerPreview).substring(0, 4) != "http"
    ) {
      var imageElement = document.createElement("img")
      imageElement.setAttribute("crossorigin", "Anonymous")
      imageElement.setAttribute("class", "canvas-img")
      imageElement.setAttribute("src", activeObject?.metadata?.originalLayerPreview)
      const options = {
        type: "StaticImage",
        src: activeObject?.metadata?.originalLayerPreview,
        preview: activeObject?.metadata?.originalLayerPreview,
        original: activeObject.original,
        id: activeObject.id,
        name: activeObject?.name,
        metadata: {
          generationDate: activeObject?.metadata?.generationDate,
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
        },
        _element: imageElement,
        _originalElement: imageElement,
      }
      editor.objects.update(options)
      setMainImgInfo((prev: any) => ({ ...prev, swiper_selected_color: '' }))
    } else {
      setBlinkInOutLoader(true)
      let response = await removeBackgroundController(
        activeObject ? activeObject?.metadata.originalLayerPreview : mainImgInfo.src,
        (image: string) => {
          // Add the resultant image to the canvas
          if (image) {
            var imageElement = document.createElement("img")
            imageElement.setAttribute("crossorigin", "Anonymous")
            imageElement.setAttribute("class", "canvas-img")
            imageElement.setAttribute("src", image)
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
              _element: imageElement,
              _originalElement: imageElement,
            }
            editor.objects.update(options)
            // Stop the loader
            setBlinkInOutLoader(false)
          } else {
            setBlinkInOutLoader(false)
            throw new Error("Something went wrong while removing background...")
          }
        },
        virtualSrcImageRef,
        virtualMaskImageRef,
        virtualCanvasSrcImageRef,
        virtualCanvasMaskImageRef,
        virtualCanvasResultImageRef,
        activeObject ? activeObject?.width * activeObject?.scaleX : 1000,
        activeObject ? activeObject?.height * activeObject?.scaleY : 1000
      )
      if (response) {
        setBlinkInOutLoader(false)
        throw new Error("Something went wrong while removing background...")
      }
    }

    // Start the loader
  } catch (error: any) {
    setBlinkInOutLoader(false)
    // @ts-ignore
    setErrorInfo((prev) => ({
      ...prev,
      showError: true,
      errorMsg: "Something went wrong while removing background...",
      retryFn: () => {
        // @ts-ignore
        setErrorInfo((prev) => ({ ...prev, showError: false }))
        RemoveBGFunc(
          editor,
          setBlinkInOutLoader,
          setPanelInfo,
          mainImgInfo,
          setMainImgInfo,
          virtualSrcImageRef,
          virtualMaskImageRef,
          virtualCanvasSrcImageRef,
          virtualCanvasMaskImageRef,
          virtualCanvasResultImageRef,
          activeObject,
          latest_ct,
          errorInfo,
          setErrorInfo
        )
      },
    }))
    setTimeout(() => {
      // @ts-ignore
      setErrorInfo((prev) => ({ ...prev, showError: false }))
    }, 5000)
    console.log("Something went wrong while removing background...", error.message)
    return error
  }
}

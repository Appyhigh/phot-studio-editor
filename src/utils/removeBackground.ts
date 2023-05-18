import { removeBackgroundWithoutPromps } from "~/services/backgroundRemover-tools-service"
import { getBase64StrFromCanvasElement, getIntrinsicImgDimensions, resizeImage } from "~/utils/canvasUtils"
import { DEFAULT_DIMENSIONS } from "./common"

export interface CanvasStylingProps {
  width: number
  height: number
  ratioedHeight: number
  ratioedWidth: number
  backgroundImage?: string
}

const ID_SRC_CANVAS = "src-canvas"
const ID_MASK_CANVAS = "mask-canvas"
const ID_RESULT_CANVAS = "result-canvas"
const DRAWING_IMAGES_TIME_TAKEN = 5000

export const createSourceMaskAndResultImageCanvas = ({
  sourceImage,
  maskImage,
  canvasStyling,
}: {
  sourceImage: string
  maskImage: string
  canvasStyling: CanvasStylingProps
}) => {
  try {
    // Create source and mask image
    const virtualSrcImage = document.createElement("img")
    const virtualMaskImage = document.createElement("img")

    virtualSrcImage.src = sourceImage
    virtualMaskImage.src = maskImage

    virtualSrcImage.width = canvasStyling.width
    virtualSrcImage.height = canvasStyling.height
    virtualMaskImage.width = canvasStyling.width
    virtualMaskImage.height = canvasStyling.height

    // Create canvases from source, mask and result image
    const virtualCanvasSrcImage = document.createElement("canvas")
    const virtualCanvasMaskImage = document.createElement("canvas")
    const virtualCanvasResultImage = document.createElement("canvas")

    virtualCanvasSrcImage.width = canvasStyling.width
    virtualCanvasSrcImage.height = canvasStyling.height
    virtualCanvasMaskImage.width = canvasStyling.width
    virtualCanvasMaskImage.height = canvasStyling.height
    virtualCanvasResultImage.width = canvasStyling.width
    virtualCanvasResultImage.height = canvasStyling.height

    // Hide them from user
    virtualCanvasSrcImage.style.display = "none"
    virtualCanvasMaskImage.style.display = "none"
    virtualCanvasResultImage.style.display = "none"

    // Assign them class name to later find them in dom
    virtualCanvasSrcImage.className = ID_SRC_CANVAS
    virtualCanvasMaskImage.className = ID_MASK_CANVAS
    virtualCanvasResultImage.className = ID_RESULT_CANVAS

    // Appending empty result canvas to dom
    document.body.appendChild(virtualCanvasResultImage)

    const virtualCanvasSrcImageContext = virtualCanvasSrcImage.getContext("2d")
    const virtualCanvasMaskImageContext = virtualCanvasMaskImage.getContext("2d")

    // On source image load, paint it to source canvas
    virtualSrcImage.onload = function () {
      virtualSrcImage.crossOrigin = "anonymous"
      virtualCanvasSrcImageContext?.drawImage(virtualSrcImage, 0, 0)
      document.body.appendChild(virtualCanvasSrcImage)
    }

    // On mask image load, paint it to mask canvas
    virtualMaskImage.onload = function () {
      virtualMaskImage.crossOrigin = "anonymous"
      virtualCanvasMaskImageContext?.drawImage(virtualMaskImage, 0, 0)
      document.body.appendChild(virtualCanvasMaskImage)
    }
  } catch (err) {
    console.log("An error occurred")
  }
}

export const pixelManipulationOfSourceUsingMaskImage = ({
  canvasStyling,
  outputHandler,
}: {
  canvasStyling: CanvasStylingProps
  outputHandler: (resultImage: string) => void
}) => {
  try {
    const srcCanvas: HTMLCanvasElement | null = document.querySelector(`canvas.${ID_SRC_CANVAS}`)
    const maskCanvas: HTMLCanvasElement | null = document.querySelector(`canvas.${ID_MASK_CANVAS}`)
    const resultCanvas: HTMLCanvasElement | null = document.querySelector(`canvas.${ID_RESULT_CANVAS}`)

    const srcCanvasCtx = srcCanvas?.getContext("2d")
    const maskCanvasCtx = maskCanvas?.getContext("2d")
    const resultCanvasCtx = resultCanvas?.getContext("2d")

    // Get 4 channel image data of both source image, and mask image
    const srcImageData = srcCanvasCtx?.getImageData(0, 0, canvasStyling.width, canvasStyling.height)
    const maskImageData = maskCanvasCtx?.getImageData(0, 0, canvasStyling.width, canvasStyling.height)

    const srcImageBytesLength = srcImageData?.data.length
    const maskImageBytesLength = maskImageData?.data.length

    // Resultant 1 channel image data of mask image
    const maskImageOneChannel = []

    // Converting 4 channel image into 1 channel image using weighted method
    if (maskImageBytesLength) {
      for (let i = 0; i < maskImageBytesLength; i += 4) {
        const R = maskImageData.data[i]
        const G = maskImageData.data[i + 1]
        const B = maskImageData.data[i + 2]
        maskImageOneChannel.push(0.299 * R + 0.587 * G + 0.114 * B)
      }
    }

    // Manipulating alpha (4th channel) of the image
    if (srcImageBytesLength) {
      for (let i = 0; i < srcImageBytesLength; i += 4) {
        srcImageData.data[i + 3] = maskImageOneChannel[i / 4]
      }
    }

    // Paint the result image on Canvas
    //@ts-ignore
    resultCanvasCtx?.putImageData(srcImageData, 0, 0)

    if (srcCanvas && maskCanvas && resultCanvas) {
      // Get base64 string of result image
      const resultImage = getBase64StrFromCanvasElement(resultCanvas)
      // Operation complete, we can now remove un-needed canvases from dom
      srcCanvas?.remove()
      maskCanvas?.remove()
      resultCanvas?.remove()

      // giving size dimensions to canvas worked for resizing the image virtually - b64 string currently contains original img dimensions as encoded information
      // TODO : actually resize the image and store b64 string in withResizedDimensionsImg variable - as this removed background image might need to be posted to some API in future
      outputHandler(resultImage)
    }
  } catch (err) {
    console.log("An error occured", err)
  }
}

const resizeSourceImageEqualToMaskImage = async ({ originalSourceImg, apiMaskResponseImage }: any) => {
  try {
    // console.log('mask imaage', apiMaskResponseImage);
    const { height, width } = await getIntrinsicImgDimensions(apiMaskResponseImage)
    // console.log('height width', height, width);

    const resizedInputImageB64 = await resizeImage(originalSourceImg || "", height, width)

    // console.log('success in resizeSourceImageEqualToMaskImage', resizedInputImageB64);
    return { resizedInputImageB64, height, width }
  } catch (err) {
    console.log("error in resizeSourceImageEqualToMaskImage", err)
    return undefined
  }
}

export const removeBackgroundUsingMask = async ({
  sourceImage,
  maskImage,
  canvasStyling,
  outputHandler,
}: {
  sourceImage: string
  maskImage: string
  canvasStyling: CanvasStylingProps
  outputHandler: (resultImage: string) => void
}) => {
  try {
    const resizedSourceAccordingToMaskInfo = await resizeSourceImageEqualToMaskImage({
      originalSourceImg: sourceImage,
      apiMaskResponseImage: maskImage,
    })

    if (resizedSourceAccordingToMaskInfo) {
      const updatedCanvasStyling = {
        ...canvasStyling,
        height: resizedSourceAccordingToMaskInfo.height,
        width: resizedSourceAccordingToMaskInfo.width,
      }

      createSourceMaskAndResultImageCanvas({
        sourceImage: resizedSourceAccordingToMaskInfo.resizedInputImageB64,
        maskImage,
        canvasStyling: updatedCanvasStyling,
      })

      const timer = setTimeout(() => {
        pixelManipulationOfSourceUsingMaskImage({ canvasStyling: updatedCanvasStyling, outputHandler })
      }, DRAWING_IMAGES_TIME_TAKEN)
      return () => clearTimeout(timer)
    }
  } catch (error) {
    console.log("error in removeBackgroundUsingMask", error)
  }
}

export const removeBackgroundController = async (inputImage: string, outputHandler: (resultImage: string) => void) => {
  // Get the black and white masked image
  try {
    const result_image = await removeBackgroundWithoutPromps(inputImage, "layer" || "")

    if (result_image.output_image) {
      // Get the image with removed background
      removeBackgroundUsingMask({
        sourceImage: inputImage || "",
        maskImage: result_image.output_image,
        canvasStyling: {
          width: DEFAULT_DIMENSIONS.width,
          height: DEFAULT_DIMENSIONS.height,
          ratioedWidth: DEFAULT_DIMENSIONS.width,
          ratioedHeight: DEFAULT_DIMENSIONS.height,
        },
        outputHandler: outputHandler,
      })
    }
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}

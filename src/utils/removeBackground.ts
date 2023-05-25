import { removeBackgroundWithoutPromps } from "~/services/backgroundRemover-tools-service"
import { getBase64StrFromCanvasElement, getIntrinsicImgDimensions, resizeImage } from "~/utils/canvasUtils"
import { API_BASE_URL } from "./common"

export interface CanvasStylingProps {
  width: number
  height: number
  ratioedHeight: number
  ratioedWidth: number
  backgroundImage?: string
}

export const ID_SRC_CANVAS = "src-canvas"
export const ID_MASK_CANVAS = "mask-canvas"
export const ID_RESULT_CANVAS = "result-canvas"
const DRAWING_IMAGES_TIME_TAKEN = 5000

export const createSourceMaskAndResultImageCanvas = ({
  sourceImage,
  maskImage,
  canvasStyling,
  virtualSrcImageRef,
  virtualMaskImageRef,
  virtualCanvasSrcImageRef,
  virtualCanvasMaskImageRef,
  virtualCanvasResultImageRef,
  outputHandler,
}: {
  sourceImage: string
  maskImage: string
  canvasStyling: CanvasStylingProps
  virtualSrcImageRef: any
  virtualMaskImageRef: any
  virtualCanvasSrcImageRef: any
  virtualCanvasMaskImageRef: any
  virtualCanvasResultImageRef: any
  outputHandler: (resultImage: string) => void
}) => {
  if (
    virtualSrcImageRef &&
    virtualMaskImageRef &&
    virtualCanvasSrcImageRef &&
    virtualCanvasMaskImageRef &&
    virtualCanvasResultImageRef
  ) {
    virtualSrcImageRef.current.src = sourceImage
    virtualMaskImageRef.current.src = maskImage

    virtualSrcImageRef.current.width = canvasStyling.width
    virtualSrcImageRef.current.height = canvasStyling.height
    virtualMaskImageRef.current.width = canvasStyling.width
    virtualMaskImageRef.current.height = canvasStyling.height

    virtualCanvasSrcImageRef.current.width = canvasStyling.width
    virtualCanvasSrcImageRef.current.height = canvasStyling.height
    virtualCanvasMaskImageRef.current.width = canvasStyling.width
    virtualCanvasMaskImageRef.current.height = canvasStyling.height
    virtualCanvasResultImageRef.current.width = canvasStyling.width
    virtualCanvasResultImageRef.current.height = canvasStyling.height

    const virtualCanvasSrcImageContext: any = virtualCanvasSrcImageRef.current.getContext("2d")
    const virtualCanvasMaskImageContext: any = virtualCanvasMaskImageRef.current.getContext("2d")
    virtualCanvasSrcImageContext?.drawImage(virtualSrcImageRef.current, 0, 0)
    virtualCanvasMaskImageContext?.drawImage(virtualMaskImageRef.current, 0, 0)

    virtualSrcImageRef.current.onload = function () {
      virtualCanvasSrcImageContext?.drawImage(virtualSrcImageRef.current, 0, 0)
    }

    // On mask image load, paint it to mask canvas
    virtualMaskImageRef.current.onload = function () {
      virtualCanvasMaskImageContext?.drawImage(virtualMaskImageRef.current, 0, 0)

      pixelManipulationOfSourceUsingMaskImage({
        canvasStyling,
        outputHandler,
      })
    }
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

export const getBase64fromExternalImageURL = ({
  src,
  rHeight,
  rWidth,
}: {
  src: string
  rHeight: number
  rWidth: number
}) =>
  new Promise<string>((resolve, reject) => {
    const img = document.createElement("img")
    img.setAttribute("crossorigin", "anonymous") // works for me
    img.src = src

    img.onload = function () {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      canvas.width = rWidth
      canvas.height = rHeight
      //@ts-ignore
      ctx.drawImage(img, 0, 0, rWidth, rHeight)

      const dataURL = canvas.toDataURL("image/jpeg")

      // document.body.appendChild(canvas);

      resolve(dataURL)
    }

    img.onerror = function () {
      reject("Oops! An error occured in loading the image")
    }
  })

export const removeBackgroundUsingMask = async ({
  sourceImage,
  maskImage,
  canvasStyling,
  outputHandler,
  virtualSrcImageRef,
  virtualMaskImageRef,
  virtualCanvasSrcImageRef,
  virtualCanvasMaskImageRef,
  virtualCanvasResultImageRef,
}: {
  sourceImage: string
  maskImage: string
  canvasStyling: CanvasStylingProps
  outputHandler: (resultImage: string) => void
  virtualSrcImageRef: any
  virtualMaskImageRef: any
  virtualCanvasSrcImageRef: any
  virtualCanvasMaskImageRef: any
  virtualCanvasResultImageRef: any
}) => {
  try {
    const inputImageB64 = await getBase64fromExternalImageURL({
      src: sourceImage,
      rHeight: canvasStyling.height,
      rWidth: canvasStyling.width,
    })
    const updatedCanvasStyling = {
      ...canvasStyling,
      height: canvasStyling.height,
      width: canvasStyling.width,
    }

    createSourceMaskAndResultImageCanvas({
      sourceImage: inputImageB64,
      maskImage: await getBase64fromExternalImageURL({
        src: maskImage,
        rHeight: canvasStyling.height,
        rWidth: canvasStyling.width,
      }),
      canvasStyling: updatedCanvasStyling,
      outputHandler,
      virtualSrcImageRef,
      virtualMaskImageRef,
      virtualCanvasSrcImageRef,
      virtualCanvasMaskImageRef,
      virtualCanvasResultImageRef,
    })
  } catch (error) {
    console.log("error in removeBackgroundUsingMask", error)
  }
}

export const removeBackgroundController = async (
  inputImage: string,
  outputHandler: (resultImage: string) => void,
  virtualSrcImageRef: any,
  virtualMaskImageRef: any,
  virtualCanvasSrcImageRef: any,
  virtualCanvasMaskImageRef: any,
  virtualCanvasResultImageRef: any,
  width: number,
  height: number
) => {
  // Get the black and white masked image
  try {
    const result_image = await removeBackgroundWithoutPromps(inputImage, "layer" || "")
    if (result_image.output_image) {
      // Get the image with removed background
      removeBackgroundUsingMask({
        sourceImage: inputImage || "",
        maskImage: result_image.output_image,
        canvasStyling: {
          width: width,
          height: height,
          ratioedWidth: 1,
          ratioedHeight: 1,
        },
        virtualSrcImageRef,
        virtualMaskImageRef,
        virtualCanvasSrcImageRef,
        virtualCanvasMaskImageRef,
        virtualCanvasResultImageRef,
        outputHandler: outputHandler,
      })
    }
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}

export const getBucketImageUrlFromFile = async (file: any) => {
  const arr = file.name.split(".")
  const ext = arr[arr.length - 1]

  const res = await fetch(`${API_BASE_URL}/app/api/v2/signedURL?tool=BACKGROUND_REMOVER&ext=` + ext)
  const data = await res.json()
  const uploadURL = data.uploadUrl
  const res2 = await fetch(uploadURL, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: file,
  })
  if (res2.ok) {
    return uploadURL.split("?")[0]
  }
}

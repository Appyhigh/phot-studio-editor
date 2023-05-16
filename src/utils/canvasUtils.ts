// import { DEFAULT_DIMENSIONS } from "./constants/HeroSection"

export const getBase64fromLocalImageURL = ({ img, rHeight, rWidth }: { img: any; rHeight: number; rWidth: number }) => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = rWidth
  canvas.height = rHeight
  //@ts-ignore
  ctx.drawImage(img, 0, 0, rWidth, rHeight)

  const dataURL = canvas.toDataURL("image/jpeg")
  return new Promise<string>((resolve) => {
    resolve(dataURL)
  })
}

// imgURL should be a string
export const getIntrinsicImgDimensions = (imgURL: string) =>
  new Promise<{ width: number; height: number }>((resolve) => {
    const img = document.createElement("img")
    img.src = imgURL

    img.onload = function () {
      // console.log('img onload', img.height, img.width);

      resolve({
        width: img.width,
        height: img.height,
      })
    }
  })

export const getBase64StrFromCanvasElement = (canvasElement: HTMLCanvasElement) => {
  //@ts-ignore
  // const str = canvasElement.toDataURL().split(',')[1];
  const str = canvasElement.toDataURL()
  return str
}

interface imageIntrinsicProps {
  intrinsicHeight: number
  intrinsicWidth: number
  ratioedHeight: number
  ratioedWidth: number
}

interface calculateAspectRatioFitProps {
  srcWidth: number
  srcHeight: number
  maxWidth: number
  maxHeight: number
}

/**
 * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @return {Object} { width, height }
 */

export const calculateAspectRatioFit = ({ srcWidth, srcHeight, maxWidth, maxHeight }: calculateAspectRatioFitProps) => {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight)

  return { width: srcWidth * ratio, height: srcHeight * ratio }
}

interface PointProps {
  x: number
  y: number
}

export interface PathProps {
  drawMode: boolean
  strokeColor: string
  strokeWidth: number
  paths: PointProps[]
}

export const resizeImage = (src: string, height: number, width: number): Promise<string> =>
  new Promise((resolve, reject) => {
    const imgElement = document.createElement("img")
    imgElement.height = height
    imgElement.width = width
    imgElement.src = src

    imgElement.onload = function () {
      getBase64fromLocalImageURL({
        img: imgElement,
        rHeight: height,
        rWidth: width,
      })
        .then((data) => {
          resolve(data)
        })
        .catch(() => {
          reject("Oops! An error occured")
        })
    }
  })

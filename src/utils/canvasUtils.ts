// import { DEFAULT_DIMENSIONS } from "./constants/HeroSection"

import { SLIDER_TYPE } from "~/views/DesignEditor/utils/enum"

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

export const getModifiedImage = (base64Image: string, value: number, modifier: string) => {
  return new Promise((resolve, reject) => {
    // Create a new image element
    const image = new Image()

    // Set the source of the image to the base64 data
    image.src = base64Image
    image.crossOrigin = "anonymous"

    // Set up an event listener to execute when the image is loaded
    image.onload = () => {
      // Create a canvas element
      const canvas = document.createElement("canvas")
      const context: any = canvas.getContext("2d")

      // Set the canvas dimensions to match the image
      canvas.width = image.width
      canvas.height = image.height

      // Draw the image onto the canvas
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      // Apply the blur effect
      if (modifier === SLIDER_TYPE.BRIGHTNESS) {
        context.filter = `brightness(${value * 0.01 * 2})`
      } else if (modifier === SLIDER_TYPE.CONTRAST) {
        context.filter = `contrast(${value * 2}%)`
      } else if (modifier === SLIDER_TYPE.SATURATION) {
        context.filter = `saturate(${value * 2}%)`
      } else if (modifier === SLIDER_TYPE.HUE) {
        context.filter = `hue-rotate(${value * 2}deg)`
      } else if (modifier === SLIDER_TYPE.BLUR) {
        context.filter = `blur(${value * 0.1}px)`
      }
      context.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)

      // Get the blurred image data from the canvas
      const blurredImageData = canvas.toDataURL()

      // Resolve the promise with the blurred base64 image
      resolve(blurredImageData)
    }

    // Set up an event listener to handle errors while loading the image
    image.onerror = () => {
      reject(new Error("Failed to load the image."))
    }
  })
}

export const applyLightImageEffect = (image: string, sliderValue: number, type: string) => {
  const canvas = document.createElement("canvas")
  const context: any = canvas.getContext("2d")

  const imageElement = new Image()

  return new Promise((resolve, reject) => {
    imageElement.onload = function () {
      // Set canvas dimensions to match the image
      canvas.width = imageElement.width
      canvas.height = imageElement.height

      // Draw the image onto the canvas
      context.drawImage(imageElement, 0, 0)

      // Get the image data from the canvas
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Apply the image effect
      const intensity = sliderValue / 500 // Convert slider value to a range from 0 to 1
      const filterIntensity = sliderValue / 100
      const blueMultiplier = 1 - filterIntensity * 0.4 // Adjust the blue component multiplier based on the filter strength
      const redMultiplier = 1 - filterIntensity * 0.2 // Adjust the red component multiplier based on the filter strength
      const greenMultiplier = 1 - filterIntensity * 0.2
      const effectValue = intensity * 255
      const fadeValue = 1 - (sliderValue / 100) * 0.3

      for (let i = 0; i < data.length; i += 4) {
        // Adjust the RGB values of each pixel
        if (type === SLIDER_TYPE.HIGHLIGHT) {
          data[i] += effectValue // Red
          data[i + 1] += effectValue // Green
          data[i + 2] += effectValue // Blue
        } else if (type === SLIDER_TYPE.LOWLIGHT) {
          data[i] -= effectValue // Red
          data[i + 1] -= effectValue // Green
          data[i + 2] -= effectValue // Blue
        } else if (type === SLIDER_TYPE.TEMPERATURE) {
          data[i] += intensity * 500 // Increase red component
          data[i + 2] -= intensity * 500 // Decrease blue component
        } else if (type === SLIDER_TYPE.BANDW) {
          // Calculate the grayscale value of each pixel
          var gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114

          // Apply the filter by interpolating between the grayscale value and the original color
          data[i] = data[i] * (1 - filterIntensity) + gray * filterIntensity // Red component
          data[i + 1] = data[i + 1] * (1 - filterIntensity) + gray * filterIntensity // Green component
          data[i + 2] = data[i + 2] * (1 - filterIntensity) + gray * filterIntensity // Blue component
        } else if (type === SLIDER_TYPE.NOIR) {
          // Convert the pixel to grayscale
          var gray = (data[i] + data[i + 1] + data[i + 2]) / 3

          // Apply the Noir effect by interpolating between the original color and grayscale
          data[i] = data[i] * (1 - filterIntensity) + gray * filterIntensity // Red component
          data[i + 1] = data[i + 1] * (1 - filterIntensity) + gray * filterIntensity // Green component
          data[i + 2] = data[i + 2] * (1 - filterIntensity) + gray * filterIntensity // Blue component
        } else if (type === SLIDER_TYPE.FADE) {
          // Reduce the opacity of each pixel based on the filter value
          data[i + 3] *= fadeValue // Alpha component
        } else if (type === SLIDER_TYPE.MONO) {
          // Calculate the average of the RGB channels
          var average = (data[i] + data[i + 1] + data[i + 2]) / 3

          // Apply the filter by interpolating between the original color and black/white
          data[i] = data[i] * (1 - filterIntensity) + average * filterIntensity // Red component
          data[i + 1] = data[i + 1] * (1 - filterIntensity) + average * filterIntensity // Green component
          data[i + 2] = data[i + 2] * (1 - filterIntensity) + average * filterIntensity // Blue component
        } else if (type === SLIDER_TYPE.A2I) {
          // data[i] = data[i] * filterIntensity // Red
          // data[i + 1] = Math.abs(data[i + 1] - 255) * filterIntensity // Green
          // data[i + 2] = Math.abs(data[i + 2] - 255) * filterIntensity // Blue
          const average = (data[i] + data[i + 1] + data[i + 2]) / 3
          data[i] += ((average - data[i]) * sliderValue) / 100 // Red
          data[i + 1] += ((average - data[i + 1]) * sliderValue) / 100 // Green
          data[i + 2] += ((average - data[i + 2]) * sliderValue) / 100 // Blue
        } else if (type === SLIDER_TYPE.CITY) {
          // Increase the brightness of the image
          data[i] += filterIntensity * 0.4 * 50 // Red component
          data[i + 1] += filterIntensity * 0.4 * 50 // Green component
          data[i + 2] += filterIntensity * 0.4 * 50 // Blue component

          // Increase the contrast of the image
          data[i] = Math.min(data[i] * (1 + filterIntensity * 0.4), 255) // Red component
          data[i + 1] = Math.min(data[i + 1] * (1 + filterIntensity * 0.4), 255) // Green component
          data[i + 2] = Math.min(data[i + 2] * (1 + filterIntensity * 0.4), 255) // Blue component
        } else if (type === SLIDER_TYPE.BLISS) {
          data[i] = data[i] * (1 - filterIntensity) + 212 * filterIntensity // Red
          data[i + 1] = data[i + 1] * (1 - filterIntensity) + 222 * filterIntensity // Green
          data[i + 2] = data[i + 2] * (1 - filterIntensity) + 229 * filterIntensity // Blue
        } else if (type === SLIDER_TYPE.TONAL) {
          // Adjust the RGB channels based on filterIntensity
          const red = data[i]
          const green = data[i + 1]
          const blue = data[i + 2]

          const average = (red + green + blue) / 3
          const tonalValue = average + average * (1 - filterIntensity)

          data[i] = tonalValue // Red
          data[i + 1] = tonalValue // Green
          data[i + 2] = tonalValue // Blue
        } else if (type === SLIDER_TYPE.VINTAGE) {
          // Convert the pixel to grayscale
          var gray = (data[i] + data[i + 1] + data[i + 2]) / 3

          // Calculate the vintage color tones
          var redTone = gray + filterIntensity * 40
          var greenTone = gray + filterIntensity * 20
          var blueTone = gray - filterIntensity * 20

          // Apply the filter by interpolating between the original color and vintage tones
          data[i] = data[i] * (1 - filterIntensity) + redTone * filterIntensity // Red component
          data[i + 1] = data[i + 1] * (1 - filterIntensity) + greenTone * filterIntensity // Green component
          data[i + 2] = data[i + 2] * (1 - filterIntensity) + blueTone * filterIntensity // Blue component
        } else if (type === SLIDER_TYPE.HDR) {
          // Apply the HDR effect by enhancing colors and dynamic range with reduced intensity
          data[i] = Math.pow(data[i], 1 + (filterIntensity / 2) * 0.1) // Red component
          data[i + 1] = Math.pow(data[i + 1], 1 + (filterIntensity / 2) * 0.1) // Green component
          data[i + 2] = Math.pow(data[i + 2], 1 + (filterIntensity / 2) * 0.1) // Blue component
        } else if (type === SLIDER_TYPE.LOMO) {
          // Increase contrast
          data[i] = Math.min(255, data[i] * (1 + filterIntensity * 0.4)) // Red component
          data[i + 1] = Math.min(255, data[i + 1] * (1 + filterIntensity * 0.4)) // Green component
          data[i + 2] = Math.min(255, data[i + 2] * (1 + filterIntensity * 0.4)) // Blue component

          // Apply color enhancement
          data[i] = Math.min(255, data[i] * (1 + (filterIntensity * 0.4) / 2)) // Red component
          data[i + 1] = Math.min(255, data[i + 1] * (1 + (filterIntensity * 0.4) / 2)) // Green component
        } else if (type === SLIDER_TYPE.MATTE) {
          // Apply the filter to each pixel
          var red = data[i]
          var green = data[i + 1]
          var blue = data[i + 2]

          // Calculate the average value of the pixel's RGB components
          var average = (red + green + blue) / 3

          // Apply the filter strength to adjust the intensity of the filter
          data[i] = red + (average - red) * filterIntensity * 0.5 // Red component
          data[i + 1] = green + (average - green) * filterIntensity * 0.5 // Green component
          data[i + 2] = blue + (average - blue) * filterIntensity * 0.5 // Blue component
        } else if (type === SLIDER_TYPE.FILM) {
          // Apply the filter to each pixel
          var red = data[i]
          var green = data[i + 1]
          var blue = data[i + 2]

          // Apply the filter strength to adjust the intensity of the filter
          data[i] = red * (1 - filterIntensity) + filterIntensity * (red * 0.393 + green * 0.769 + blue * 0.189) // Red component
          data[i + 1] = green * (1 - filterIntensity) + filterIntensity * (red * 0.349 + green * 0.686 + blue * 0.168) // Green component
          data[i + 2] = blue * (1 - filterIntensity) + filterIntensity * (red * 0.272 + green * 0.534 + blue * 0.131) // Blue component
        } else if (type === SLIDER_TYPE.VIBRANT) {
          // Apply the filter to each pixel
          var red = data[i]
          var green = data[i + 1]
          var blue = data[i + 2]

          // Apply the filter strength to adjust the intensity of the filter
          data[i] = red + red * filterIntensity * 0.5 // Red component
          data[i + 1] = green + green * filterIntensity * 0.5 // Green component
          data[i + 2] = blue + blue * filterIntensity * 0.5 // Blue component
        } else if (type === SLIDER_TYPE.COOLTONE) {
          // Apply the filter to each pixel
          var red = data[i]
          var green = data[i + 1]
          var blue = data[i + 2]

          // Apply the red and green component multipliers to enhance the cool tone
          data[i] = red * redMultiplier // Red component
          data[i + 1] = green * greenMultiplier // Green component
        }
      }

      // Put the modified image data back onto the canvas
      context.putImageData(imageData, 0, 0)

      // Get the base64 representation of the modified image
      const base64Image = canvas.toDataURL()
      resolve(base64Image)
    }

    imageElement.onerror = function () {
      reject(new Error("Error loading image."))
    }

    // Load the image based on its type (base64 or URL)
    if (image.startsWith("data:image")) {
      imageElement.src = image
    } else {
      imageElement.crossOrigin = "Anonymous"
      imageElement.src = image
    }
  })
}

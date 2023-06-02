export const changeLayerFill = (base64ImageData: string, backgroundColor: string, width: number, height: number) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = function () {
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height

      const context = canvas.getContext("2d")

      if (context) {
        // Set the background color of the canvas
        context.fillStyle = backgroundColor
        context.fillRect(0, 0, canvas.width, canvas.height)

        // Draw the image on the canvas
        context.drawImage(image, 0, 0, width, height)

        // Get base64 representation of the canvas
        const canvasDataURL = canvas.toDataURL()
        resolve(canvasDataURL)
      }
    }

    image.onerror = function () {
      reject(new Error("Failed to load the image."))
    }

    image.src = base64ImageData
  })
}

export function resizeBase64Image(base64: string, newWidth: number, newHeight: number) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = function () {
      const canvas = document.createElement("canvas")
      const ctx: any = canvas.getContext("2d")

      canvas.width = newWidth
      canvas.height = newHeight

      // Set transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = "destination-over"

      ctx.drawImage(img, 0, 0, newWidth, newHeight)

      const resizedBase64 = canvas.toDataURL() // You can change the format if desired

      resolve(resizedBase64)
    }

    img.onerror = function (error) {
      reject(error)
    }

    img.src = base64
  })
}

export const changeLayerFillWithGradient = (
  base64ImageData: string,
  gradient: string,
  width: number,
  height: number
) => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = function () {
      let grad: any = gradient
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height

      const context: any = canvas.getContext("2d")

      const gradientFill = context.createLinearGradient(0, 0, canvas.width, canvas.height)
      grad = grad.slice(gradient.indexOf("(") + 1, gradient.indexOf(")")).split(",")

      grad.forEach((color: string, index: number) => {
        if (index !== 0) {
          gradientFill.addColorStop(1 / (grad.length - 1) + ((index - 1) * 1) / (grad.length - 1), color.split(" ")[1])
        }
      })

      context.fillStyle = gradientFill
      context.fillRect(0, 0, canvas.width, canvas.height)

      // Draw the image on the canvas
      context.drawImage(image, 0, 0, width, height)

      const canvasDataURL = canvas.toDataURL() // Get base64 representation of the canvas
      resolve(canvasDataURL)
    }

    image.onerror = function () {
      reject(new Error("Failed to load the image."))
    }

    image.src = base64ImageData
  })
}

export const changeLayerBackgroundImage = (image1Data: string, image2Data: string, width: number, height: number) => {
  return new Promise((resolve, reject) => {
    const image1 = new Image()
    const image2 = new Image()
    image2.crossOrigin = "anonymous"

    image1.onload = function () {
      image2.onload = function () {
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height

        const context = canvas.getContext("2d")

        if (context) {
          // Draw the second image as the background
          context.drawImage(image2, 0, 0, canvas.width, canvas.height)

          // Draw the first image on top of the background
          context.drawImage(image1, 0, 0, canvas.width, canvas.height)

          // Get base64 representation of the canvas
          const canvasDataURL = canvas.toDataURL()
          resolve(canvasDataURL)
        }
      }

      image2.onerror = function () {
        reject(new Error("Failed to load the second image."))
      }

      image2.src = image2Data
    }

    image1.onerror = function () {
      reject(new Error("Failed to load the first image."))
    }

    image1.src = image1Data
  })
}

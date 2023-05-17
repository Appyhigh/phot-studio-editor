export const changeLayerFill = (base64ImageData: string, backgroundColor: string) => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = function () {
      const canvas = document.createElement("canvas")
      canvas.width = image.width
      canvas.height = image.height

      const context = canvas.getContext("2d")

      if (context) {
        // Set the background color of the canvas
        context.fillStyle = backgroundColor
        context.fillRect(0, 0, canvas.width, canvas.height)

        // Draw the image on the canvas
        context.drawImage(image, 0, 0)

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

export const changeLayerFillWithGradient = (base64ImageData: string, gradient: string) => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = function () {
      let grad: any = gradient
      const canvas = document.createElement("canvas")
      canvas.width = image.width
      canvas.height = image.height

      const context: any = canvas.getContext("2d")

      const gradientFill = context.createLinearGradient(0, 0, canvas.width, canvas.height)
      grad = grad.slice(gradient.indexOf("(") + 1, gradient.indexOf(")")).split(",")

      grad.forEach((color: string, index: number) => {
        if (index !== 0) {
          console.log(1 / (grad.length - 1) + ((index - 1) * 1) / (grad.length - 1))
          gradientFill.addColorStop(1 / (grad.length - 1) + ((index - 1) * 1) / (grad.length - 1), color.split(" ")[1])
        }
      })

      context.fillStyle = gradientFill
      context.fillRect(0, 0, canvas.width, canvas.height)

      // Draw the image on the canvas
      context.drawImage(image, 0, 0)

      const canvasDataURL = canvas.toDataURL() // Get base64 representation of the canvas
      resolve(canvasDataURL)
    }

    image.onerror = function () {
      reject(new Error("Failed to load the image."))
    }

    image.src = base64ImageData
  })
}

export const changeLayerBackgroundImage = (image1Data: string, image2Data: string) => {
  return new Promise((resolve, reject) => {
    const image1 = new Image()
    const image2 = new Image()

    image1.onload = function () {
      image2.onload = function () {
        const canvas = document.createElement("canvas")
        canvas.width = image1.width
        canvas.height = image1.height

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
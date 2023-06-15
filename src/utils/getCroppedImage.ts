const createImage = (url: any) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener("load", () => resolve(image))
    image.addEventListener("error", (error) => reject(error))
    image.setAttribute("crossOrigin", "anonymous") // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

const getCroppedImg = async (imageSrc: any, pixelCrop: any) => {
  const image: any = await createImage(imageSrc)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    return null
  }

  canvas.width = image.width
  canvas.height = image.height

  ctx.drawImage(image, 0, 0)

  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height)

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.putImageData(data, 0, 0)

  return canvas.toDataURL("image/jpeg")
}

export const getCroppedImage = async (
  imageUrl: any,
  croppedAreaPixels: any,
  setCroppedImage: any,
  setTextToArtInputInfo: any,
  setOpenModal: any
) => {
  try {
    const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels)
    setCroppedImage(croppedImage)
    setTextToArtInputInfo((prev: any) => ({ ...prev, uploaded_img: croppedImage }))
    setOpenModal(false)
  } catch (e) {
    console.error(e)
  }
}

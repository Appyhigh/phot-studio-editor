import { fabric } from "fabric"

export const setBgImgFabricCanvas = async (imgSrc: any, canvas: any, result: any) => {
  setTimeout(() => {
    canvas.backgroundImage = null
    result.crossOrigin="anonymous"
    canvas.renderAll()
    let width = result.width
    let height = result.height
    let canvasWidth = 600
    let canvasHeight = 600
    let scale = 1
     
    fabric.Image.fromURL(imgSrc, (img) => {
      // img.set({ type: "backgroundImage" })
      img.crossOrigin="anonymous"
      canvas.backgroundImage = img
      img.center()
      if (width >= canvasWidth || height >= canvasHeight) {
        if (width / canvasWidth > height / canvasHeight) {
          scale = canvasWidth / width
        } else {
          scale = canvasHeight / height
        }
        img.scale(scale)
        canvas.setDimensions({
          width: canvasWidth * scale,
          height: canvasHeight * scale,
        })
        canvas.add(img)
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas))
      } else {
        canvas.setDimensions({
          width: img.width,
          height: img.height,
        })
        canvas.add(img)
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas))
      }
    })
    canvas.renderAll()
  }, 50)
}

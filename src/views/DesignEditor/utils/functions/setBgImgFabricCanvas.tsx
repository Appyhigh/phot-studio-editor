import { fabric } from "fabric"

export const setBgImgFabricCanvas = async (imgSrc: any, canvas: any, result: any) => {
  canvas.clear()
  canvas.renderAll()
  setTimeout(() => {
    canvas.backgroundImage = null
    let width = result.width
    let height = result.height
    let canvasWidth = 400
    let canvasHeight = 400
    let scale = 1

    fabric.Image.fromURL(imgSrc, (img) => {
      // img.set({ type: "backgroundImage" })
      canvas.backgroundImage = img
      img.center()
      img.selectable = false
      if (width >= canvasWidth || height >= canvasHeight) {
        if (width / canvasWidth > height / canvasHeight) {
          scale = canvasWidth / width
        } else {
          scale = canvasHeight / height
        }
        img.scale(scale)
        canvas.setDimensions({
          width: width * scale,
          height: height * scale,
        })
        canvas.add(img)
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas))
      } else {
        canvasWidth=400;
        canvasHeight=400;
        scale = Math.max(canvasWidth / width, canvasHeight / height)
        img.scale(scale)
        canvas.setDimensions({
          width: width * scale,
          height: height * scale,
        })

        canvas.add(img)
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas))
      }
    })
    canvas.renderAll()
  }, 50)
}

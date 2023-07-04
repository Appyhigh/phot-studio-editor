import { fabric } from "fabric"

export const setBgTransparent = async (canvas: any) => {
  canvas.clear()
  canvas.renderAll()
  setTimeout(() => {
    canvas.backgroundImage = null

    fabric.Image.fromURL("https://ik.imagekit.io/rxld8u68i/background.png?updatedAt=1683116649473", (img) => {
      // img.set({ type: "backgroundImage" })
      canvas.setDimensions({
        width: 600,
        height: 600,
      })
      img.crossOrigin = "anonymous"
      canvas.backgroundImage = img
      canvas.renderAll()
      canvas.add(img)
      img.selectable = false
    })
    canvas.renderAll()
  }, 50)
}

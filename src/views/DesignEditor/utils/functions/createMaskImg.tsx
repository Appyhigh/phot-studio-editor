interface PointProps {
  x: number
  y: number
}

interface PathProps {
  strokeWidth: number
  paths: PointProps[]
}
export const createMaskImage = ({
  canvasWidth,
  canvasHeight,
  intrinsicHeight,
  intrinsicWidth,

  pathsArray,
}: {
  canvasWidth: number
  canvasHeight: number
  intrinsicHeight: number
  intrinsicWidth: number
  pathsArray: PathProps[]
}) => {

  // point
  const scaleX = intrinsicWidth / canvasWidth
  const scaleY = intrinsicHeight / canvasHeight
  const canvas = document.createElement("canvas")
  canvas.width = canvasWidth * scaleX
  canvas.height = canvasHeight * scaleY
  const ctx = canvas.getContext("2d")

  if (ctx) {
    ctx.lineCap = "round"

    ctx.lineJoin = "round"
    ctx.scale(scaleX, scaleY)
    // Black background
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // White Foregraound
    ctx.strokeStyle = "white"

    pathsArray.forEach((data: PathProps) => {
      ctx.beginPath()
      const { strokeWidth, paths } = data
      ctx.lineWidth = strokeWidth
      paths.forEach((point: PointProps) => {
        const { x, y } = point
        ctx.lineTo(x, y)
      })
      ctx.stroke()
    })
  }

  const dataURL = canvas.toDataURL("image/jpeg")
  return dataURL
}

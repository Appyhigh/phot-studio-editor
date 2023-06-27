import { useEffect } from "react"
import { fabric } from "fabric"
import useFabricEditor from "../../../hooks/useFabricEditor"

import {
  useCustomizationHandler,
  useEventsHandler,
  useZoomHandler,
  useContainerHandler,
  useGuidelinesHandler,
  useObjects,
} from "../../../components/FabricCanvas/Canvas/handlers"

function Canvas({ width, height }: any) {
  const containerRef = useContainerHandler()
  const { fabricEditor, setFabricEditor } = useFabricEditor()
  // useCustomizationHandler()
  useGuidelinesHandler()
  useEventsHandler()
  useZoomHandler()
  useContainerHandler()
  // useGrid()
  useObjects()
  useEffect(() => {
    const initialHeigh = width
    const initialWidth = height

    const canvas = new fabric.Canvas("canvas", {
      height: initialHeigh,
      width: initialWidth,
      isDrawingMode: true,
      freeDrawingCursor: "default",
    })

    const containerWidth = 600
    const containerHeight = 600
    const scaleX = containerWidth / canvas.getWidth()
    const scaleY = containerHeight / canvas.getHeight()
    const scale = Math.min(scaleX, scaleY)

    canvas.setDimensions({
      width: canvas.getWidth() * scale,
      height: canvas.getHeight() * scale,
    })

    // const workArea = new fabric.Rect({
    //   //@ts-ignore
    //   id: 'workarea',
    //   type: 'workarea',
    //   width: canvas.getWidth() * scale,
    //   height:canvas.getHeight() * scale,
    //   absolutePositioned: true,
    //   stroke: 'black',
    //   fill: 'transparent',
    //   strokeWidth: 1,
    //   selectable: false,
    //   hoverCursor: 'default',
    //   objectCaching: false,
    //   controlsAboveOverlay: true,
    //   borderColor: '#000',
    // })

    // set background of image
    fabric.Image.fromURL("https://ik.imagekit.io/rxld8u68i/background.png?updatedAt=1683116649473", (img) => {
      img.set({ type: "backgroundImage" })
      canvas?.add(img)
      img.scale(1)
      img.lockMovementX = true
      img.sendToBack()
      img.selectable = false
      img.lockMovementY = true
      img.center()
    })

    // canvas.add(workArea)
    // workArea.center()

    canvas.freeDrawingBrush.width = 20
    canvas.freeDrawingBrush.color = "rgba(58, 190, 231,0.6)"

    setFabricEditor({
      ...fabricEditor,
      //@ts-ignore
      canvas: canvas,
      // workArea: workArea,
    })
  }, [])

  const { canvas, objects} = fabricEditor
  // brush points 
  useEffect(() => {
    const points = canvas?.freeDrawingBrush._points
    // console.log(canvas?.freeDrawingBrush._points)
    const coordinates = points?.map((point: any) => ({ x: point.x, y: point.y }))
    // console.log(coordinates)
    // console.log(objects)
  
  }, [canvas,objects])
  return (
    <div className="editor-canvas flex justify-center" id="cont" ref={containerRef}>
      <canvas id="canvas"></canvas>
    </div>
  )
}

export default Canvas

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
      freeDrawingCursor: "none",
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

    // var cursor = new fabric.StaticCanvas('cursor', {
    //   height: initialHeigh,
    //   width: initialWidth,
    // })

    // cursor.setDimensions({
    //   width: cursor.getWidth() * scale,
    //   height: cursor.getHeight() * scale,
    // })

    canvas.freeDrawingBrush.width = 20
    canvas.freeDrawingBrush.color = "rgba(58, 190, 231,0.6)"

    var cursorOpacity = 0.5
    var mousecursor = new fabric.Circle({
      left: -100,
      top: -100,
      radius: canvas.freeDrawingBrush.width / 2,
      fill: "rgba(58, 190, 231" + 0.6 + ")",
      stroke: "black",
      originX: "center",
      originY: "center",
    })

    canvas.add(mousecursor)

    canvas.on("mouse:move", function (evt: any) {
      // @ts-ignore
      var mouse = this.getPointer(evt.e)
      // @ts-ignore
      mousecursor
        ?.set({
          top: mouse.y,
          left: mouse.x,
        })
        .setCoords()
        .canvas.renderAll()
    })

    canvas.on("mouse:out", function () {
      // put circle off screen
      // @ts-ignore

      mousecursor
        .set({
          top: -100,
          left: -100,
        })
        .setCoords()
        .canvas.renderAll()
    })

    setFabricEditor({
      ...fabricEditor,
      //@ts-ignore
      canvas: canvas,
      // workArea: workArea,
    })
  }, [])

  const { canvas } = fabricEditor
  useEffect(() => {
    const points = canvas?.freeDrawingBrush._points
    console.log(canvas?.freeDrawingBrush)
    const coordinates = points?.map((point:any) => ({ x: point.x, y: point.y }))
    console.log(coordinates)
  }, [canvas])
  return (
    <div className="editor-canvas flex justify-center" id="cont" ref={containerRef}>
      <canvas id="canvas"></canvas>
    </div>
  )
}

export default Canvas

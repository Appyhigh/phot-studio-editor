import { useEffect, useState } from "react"
import { fabric } from "fabric"
import useFabricEditor from "../../../hooks/useFabricEditor"
import classes from "./style.module.css"

import {
  useCustomizationHandler,
  useEventsHandler,
  useZoomHandler,
  useContainerHandler,
  useGuidelinesHandler,
  useObjects,
} from "../../../components/FabricCanvas/Canvas/handlers"
import clsx from "clsx"

function Canvas({ width, height }: any) {
  const containerRef = useContainerHandler()
  const { fabricEditor, setFabricEditor } = useFabricEditor()
  const [brushSize, setBrushSize] = useState(10)

  const [brushOn, setBrushOn] = useState(false)
  const [bgSet, setBg] = useState(false)
  const cursor = `<svg width="${brushSize}" height="${brushSize}" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" ><circle cx="24" cy="24" r="23.5" fill="#429CB9" fill-opacity="0.43" stroke="#F8F8F8"/></svg>`
  const base64CursorString = btoa(cursor)

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
      isDrawingMode: brushOn,
      freeDrawingCursor: `url('data:image/svg+xml;base64,${base64CursorString}') ${brushSize / 2} ${
        brushSize / 2
      }, auto`,
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
      canvas.backgroundImage = img
      canvas.renderAll()
    })

    // canvas.add(workArea)
    // workArea.center()

    // set the free drawing brush to the circle brush object

    canvas.freeDrawingBrush.width = brushSize
    canvas.freeDrawingBrush.color = "rgba(58, 190, 231,0.6)"
    setFabricEditor({
      ...fabricEditor,
      //@ts-ignore
      canvas: canvas,
      // workArea: workArea,
    })
  }, [])

  const { canvas, objects } = fabricEditor
  // brush points

  useEffect(() => {
    const points = canvas?.freeDrawingBrush._points
    // console.log(canvas?.freeDrawingBrush._points)
    const coordinates = points?.map((point: any) => ({ x: point.x, y: point.y }))
    // console.log(coordinates)
    // console.log(objects)
  }, [canvas, objects])

  return (
    <div className="editor-canvas flex justify-center" id="cont" ref={containerRef}>
      <div className={classes.toggleBtn}>
        <div
          className={clsx(classes.btn, brushOn && classes.activeBrush)}
          onClick={() => {
            setBrushOn(true)
            canvas.isDrawingMode = true
          }}
        >
          brush on
        </div>
        <div
          onClick={() => {
            setBrushOn(false)
            canvas.isDrawingMode = false
          }}
          className={clsx(classes.btn, !brushOn && classes.activeBrush)}
        >
          brush off
        </div>
      </div>
      <div className={classes.toggleBtn}>
        <div
          className={clsx(classes.btn, bgSet && classes.activeBrush)}
          onClick={() => {
            setBg(true)
            setTimeout(() => {
              canvas.backgroundImage = null
              canvas.renderAll()

              fabric.Image.fromURL(
                "https://images.pexels.com/photos/3493777/pexels-photo-3493777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                (img) => {
                  canvas.backgroundImage = img
                  canvas.renderAll()
                }
              )

              canvas.renderAll()
            }, 50)
          }}
        >
          set Bg
        </div>
        <div
          onClick={() => {
            setBg(false)
            setTimeout(() => {
              canvas.backgroundImage = null
              canvas.renderAll()
              fabric.Image.fromURL("https://ik.imagekit.io/rxld8u68i/background.png?updatedAt=1683116649473", (img) => {
                canvas.backgroundImage = img
                canvas.renderAll()
              })

              canvas.renderAll()
            }, 50)
          }}
          className={clsx(classes.btn, !bgSet && classes.activeBrush)}
        >
          Remove Bg
        </div>
      </div>
      <input
        type="range"
        min={5}
        max={75}
        value={brushSize}
        onChange={(e) => {
          setBrushSize(parseInt(e.target.value))
          ;(canvas.freeDrawingCursor = `url('data:image/svg+xml;base64,${base64CursorString}') ${brushSize / 2} ${
            brushSize / 2
          }, auto`),
            (canvas.freeDrawingBrush.width = brushSize)
        }}
      />
      <canvas id="canvas"></canvas>
    </div>
  )
}

export default Canvas

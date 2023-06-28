import { useEffect, useState } from "react"
import useFabricEditor from "src/hooks/useFabricEditor"
import CanvasArea from "./CanvasArea/CanvasArea"
import ImagesPanel from "./Panels/ImagesPanel/ImagesPanel"
import classes from "./style.module.css"

function Editor() {
  const [dimension, setDimension] = useState({
    width: 800,
    height: 800,
  })

  const { fabricEditor } = useFabricEditor()

  const { canvas, objects } = fabricEditor

  return (
    <div className={classes.editor}>
      <div className="d-flex flex-row">
        <h3
          className="px-1"
          onClick={() => {
            if (objects?.length >= 2) {
              canvas.undo()
            }
          }}
        >
          Undo
        </h3>{" "}
        <h3
          onClick={() => {
            canvas.redo()
          }}
        >
          Redo
        </h3>
      </div>
      <ul className={classes.resize_list}>
        <li
          onClick={() => {
            const containerWidth = 600
            const containerHeight = 600
            const scaleX = containerWidth / 500
            const scaleY = containerHeight / 400
            const scale = Math.min(scaleX, scaleY)
            //@ts-ignore
            canvas.setDimensions({
              width: 500 * scale,
              height: 400 * scale,
            })
            //@ts-ignore
            canvas.setHeight(400 * scale).setWidth(500 * scale)
            // canvas.setWidth(400);
            // canvas.setHeight(800);
          }}
        >
          2:3
        </li>
        <li
          onClick={() => {
            const containerWidth = 600
            const containerHeight = 600
            const scaleX = containerWidth / 800
            const scaleY = containerHeight / 600
            const scale = Math.min(scaleX, scaleY)
            //@ts-ignore

            canvas.setDimensions({
              width: 800 * scale,
              height: 600 * scale,
            })
            //@ts-ignore
            canvas.setHeight(800 * scale).setWidth(600 * scale)
            // setDimension({ width: 800, height: 600 })
          }}
        >
          4:3
        </li>
        <li
          onClick={() => {
            const containerWidth = 600
            const containerHeight = 600
            const scaleX = containerWidth / 400
            const scaleY = containerHeight / 800
            const scale = Math.min(scaleX, scaleY)
            //@ts-ignore

            canvas.setDimensions({
              width: 400 * scale,
              height: 800 * scale,
            })
            //@ts-ignore

            canvas.setHeight(400 * scale).setWidth(800 * scale)
          }}
        >
          1:2
        </li>
      </ul>

      <div className={classes.two}>
        <div className={classes.images}>
          <ImagesPanel />
        </div>

        <div className={classes.three}>
          <CanvasArea width={dimension.width} height={dimension.height} />
        </div>
      </div>
    </div>
  )
}

export default Editor

import { useCallback } from "react"
import { CanvasObjects } from "../index"
import { propertiesToInclude } from "../constants/contants"
import useFabricEditor from "../../../../hooks/useFabricEditor"
import { fabric } from "fabric"
function useCoreHandler() {
  const { fabricEditor, setFabricEditor } = useFabricEditor()

  const { canvas, activeObject, workArea }: any = fabricEditor // Add objects to canvas
  const addText = useCallback(
    (options: any) => {
      const { type, ...textOptions } = options
      //@ts-ignore
      const element = CanvasObjects[type].render(textOptions)
      //@ts-ignore
      const workarea = canvas.getObjects().find((obj) => obj.id === "workarea")
      //@ts-ignore
      canvas.add(element)
      element.center()
      element.clipPath = workarea
      //@ts-ignore
      canvas.renderAll()
    },
    [canvas]
  )

  const addImage = useCallback(
    (options: any) => {
      if (canvas) {
        let { type, ...imageOptions }: any = options
        //@ts-ignore
        const element = CanvasObjects[type].render(imageOptions)
        const workarea = canvas?.getObjects().find((obj: any) => obj.id === "workarea")
        // Create a fabric.Image from URL
        fabric.Image.fromURL(imageOptions.src, (img: fabric.Image) => {
          // Set additional options for the image object
          const canvasSize = getCanvasSize()
          let scale = 1
          if (img.width && img.height && canvasSize) {
            if (img.width > canvasSize.width || img.height > canvasSize.height) {
              if (img.width / canvasSize.width > img.height / canvasSize.height) {
                scale = canvasSize.width / img.width
              } else {
                scale = canvasSize.height / img.height
              }
            }
          }
          img.set({ type: "image", ...imageOptions, scaleX: scale, scaleY: scale })

          // Add the image object to the canvas
          //@ts-ignore
          canvas.add(img)
          img.center()

          img.clipPath = workarea
          //@ts-ignore
          canvas.renderAll()
          setFabricEditor({ ...fabricEditor, canvas: canvas })
        })
      } else {
        console.log("empty canvas")
      }
    },
    [canvas]
  )

  const removeObject = useCallback(() => {
    if (canvas && activeObject) {
      //@ts-ignore

      canvas.remove(activeObject)
    }
  }, [canvas, activeObject])

  // Update properties, optional set metadata if present
  const setProperty = useCallback(
    (property: any, value: any) => {
      if (activeObject) {
        //@ts-ignore
        activeObject.set(property, value)
        //@ts-ignore
        activeObject.setCoords()
        //@ts-ignore
        canvas.requestRenderAll()
      }
    },
    [activeObject, canvas]
  )

  const exportJSON = useCallback(() => {
    //@ts-ignore
    const json = canvas.toJSON(propertiesToInclude)
    return json
  }, [canvas])

  const loadJSON = useCallback(
    (json: any) => {
      if (canvas) {
        //@ts-ignore
        canvas.loadFromJSON(json, () => {
          //@ts-ignore
          canvas.requestRenderAll()
        })
      }
    },
    [canvas]
  )

  const setCanvasBackgroundColor = useCallback(
    (color: any) => {
      // @ts-ignore
      const workarea = canvas.getObjects().find((object) => object.id === "workarea")
      if (workarea) {
        workarea.set("fill", color)
        //@ts-ignore
        canvas.requestRenderAll()
      }
    },
    [canvas]
  )

  const getCanvasSize = useCallback(() => {
    if (canvas) {
      const width = canvas.width
      const height = canvas.height
      return { width, height }
    }
    return { width: 0, height: 0 }
  }, [canvas])

  return { exportJSON, loadJSON, setCanvasBackgroundColor, addText, removeObject, setProperty, addImage }
}

export default useCoreHandler

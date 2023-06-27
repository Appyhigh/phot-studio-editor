import { useCallback } from "react"
import { CanvasObjects } from "../index"
import { propertiesToInclude } from "../constants/contants"
import useFabricEditor from "../../../../hooks/useFabricEditor"
import { fabric } from "fabric"
function useCoreHandler() {
  const { fabricEditor, setFabricEditor } = useFabricEditor()

  const { canvas, activeObject, workArea } = fabricEditor // Add objects to canvas
  const addText = useCallback(
    (options: any) => {
      const { type, ...textOptions } = options
      //@ts-ignore
      const element = CanvasObjects[type].render(textOptions)
      //@ts-ignore
      const workarea = canvas.getObjects().find((obj) => obj.id === "workarea")
      canvas.add(element)
      element.center()

      element.clipPath = workarea
      canvas.renderAll()
    },
    [canvas]
  )

  const addImage = useCallback(
    (options: any) => {
      if(canvas){
        const { type, ...imageOptions } = options
        //@ts-ignore
        const element = CanvasObjects[type].render(imageOptions)
  
        const workarea = canvas?.getObjects().find((obj: any) => obj.id === "workarea")
        // Create a fabric.Image from URL
        fabric.Image.fromURL(imageOptions.src, (img: fabric.Image) => {
          // Set additional options for the image object
          img.set({ type: "image", ...imageOptions })
  
          // Add the image object to the canvas
          canvas.add(img)
          img.center()
  
          img.clipPath = workarea
          canvas.renderAll()
          setFabricEditor({ ...fabricEditor, canvas: canvas })
        })
      }
      else {
        console.log("empty canvas")
      }
    
    },
    [canvas]
  )

  const removeObject = useCallback(() => {
    if (canvas && activeObject) {
      canvas.remove(activeObject)
    }
  }, [canvas, activeObject])

  // Update properties, optional set metadata if present
  const setProperty = useCallback(
    (property: any, value: any) => {
      if (activeObject) {
        activeObject.set(property, value)
        activeObject.setCoords()
        canvas.requestRenderAll()
      }
    },
    [activeObject, canvas]
  )

  const exportJSON = useCallback(() => {
    const json = canvas.toJSON(propertiesToInclude)
    return json
  }, [canvas])

  const loadJSON = useCallback(
    (json: any) => {
      if (canvas) {
        canvas.loadFromJSON(json, () => {
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
        canvas.requestRenderAll()
      }
    },
    [canvas]
  )

  return { exportJSON, loadJSON, setCanvasBackgroundColor, addText, removeObject, setProperty, addImage }
}

export default useCoreHandler

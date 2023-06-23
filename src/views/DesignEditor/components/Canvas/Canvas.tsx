import { useEffect } from "react"
import { Canvas as LayerhubCanvas, useActiveObject, useEditor } from "@layerhub-io/react"
import Playback from "../Playback"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import ContextMenu from "../ContextMenu"
import { backgroundLayerType, checkboxBGUrl } from "~/constants/contants"

const Canvas = () => {
  const { displayPlayback } = useDesignEditorContext()
  const editor = useEditor()

  useEffect(() => {
    if (editor) {
      if (
        editor.frame.background.canvas._objects.length <= 2 &&
        editor.frame?.background?.canvas?._objects[1]?.fill == "#ffffff" &&
        editor.frame?.background?.canvas?._objects[2]?.metadata?.type != backgroundLayerType
      ) {
        const options = {
          type: "BackgroundImage",
          src: checkboxBGUrl,
          preview: checkboxBGUrl,
          metadata: { generationDate: new Date().getTime(), type: backgroundLayerType },
        }
        setTimeout(() => {
          if (editor.frame?.background?.canvas?._objects.length <= 2) {
            editor.objects.add(options).then(() => {
              editor.objects.setAsBackgroundImage().then(() => {
                console.log("BACKGROUND IMAGE WAS ADDED")
              })
            })
          }
        }, 1000)
      }
    }
  }, [editor])

  useEffect(() => {
    if (editor) {
      editor.canvas.canvas.on("mouse:dblclick", (event: any) => {
        event.preventDefault()
        event.stopPropagation()
      })

      editor.canvas.canvas.on("after:render", () => {
        if (Math.ceil(editor.canvas.canvas.getVpCenter().x) < 0) {
          editor.zoom.zoomToFit()
        }
      })

      //   editor.canvas.canvas.on("object:modified", (event: any) => {
      //     var object = event.target
      //     object.applyFilters()
      //   })
    }
  }, [editor])

  return (
    <div style={{ flex: 1, display: "flex", position: "relative" }}>
      {displayPlayback && <Playback />}
      <ContextMenu />
      <LayerhubCanvas
        config={{
          background: "#f1f2f6",
          controlsPosition: {
            rotation: "BOTTOM",
          },
          shadow: {
            blur: 4,
            color: "#fcfcfc",
            offsetX: 0,
            offsetY: 0,
          },
        }}
      />
    </div>
  )
}

export default Canvas

import { useEffect } from "react"
import { Canvas as LayerhubCanvas, useEditor, useFrame } from "@layerhub-io/react"
import Playback from "../Playback"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import ContextMenu from "../ContextMenu"
import { backgroundLayerType, checkboxBGUrl } from "~/constants/contants"

const Canvas = () => {
  const { displayPlayback } = useDesignEditorContext()
  const editor = useEditor()
  const frame = useFrame()

  useEffect(() => {
    if (editor) {
      if (
        (editor.frame.background.canvas._objects.length >= 3 &&
          editor.frame.background.canvas._objects[2].type == "BackgroundImage") ||
        (editor.frame.background.canvas._objects.length >= 2 &&
          editor.frame.background.canvas._objects[1].fill == "#ffffff")
      ) {
        const options = {
          type: "StaticImage",
          src: checkboxBGUrl,
          preview: checkboxBGUrl,
          metadata: { generationDate: new Date().getTime(), type: backgroundLayerType },
        }
        editor.objects.add(options).then(() => {
          editor.objects.setAsBackgroundImage()
        })
      }
    }
  }, [editor, frame])

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

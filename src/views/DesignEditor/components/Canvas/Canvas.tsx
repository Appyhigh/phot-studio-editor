import { useEffect } from "react"
import { Canvas as LayerhubCanvas, useEditor } from "@layerhub-io/react"
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
        editor.frame?.background?.canvas?._objects.length === 2 &&
        editor.frame?.background?.canvas?._objects[1]?.fill == "#ffffff"
      ) {
        
        const options = {
          type: "BackgroundImage",
          src: checkboxBGUrl,
          preview: checkboxBGUrl,
          metadata: { generationDate: new Date().getTime(), type: backgroundLayerType },
        }
        // Timeout works as a fix so canvas does not get dislocated

        editor.objects.add(options).then(() => {
          editor.objects.setAsBackgroundImage()
        })
      }
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

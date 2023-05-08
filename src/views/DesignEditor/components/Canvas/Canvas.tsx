import { useEffect } from "react"
import { Canvas as LayerhubCanvas, useEditor, useFrame, useObjects } from "@layerhub-io/react"
import Playback from "../Playback"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import ContextMenu from "../ContextMenu"
import { backgroundLayerType, checkboxBGUrl } from "~/constants/contants"
import { ILayer } from "@layerhub-io/types"

const Canvas = () => {
  const { displayPlayback } = useDesignEditorContext()
  const editor = useEditor()
  const frame = useFrame()
  const objects = useObjects() as ILayer[]

  useEffect(() => {
    if (editor) {
      const bgObject = objects.filter((el) => el.metadata?.type === backgroundLayerType)[0]
      if (bgObject) {
        editor.objects.remove(bgObject.id)
        editor.objects.updateContextObjects()
        editor.objects.unsetBackgroundImage()
      }

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

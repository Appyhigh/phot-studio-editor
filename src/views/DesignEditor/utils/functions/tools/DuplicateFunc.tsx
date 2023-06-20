import { nanoid } from "nanoid"
import { applyExtraFilter } from "./applyExtraFilterFunc"
import { log } from "fabric/fabric-impl"

export const DuplicateFunc = ({ editor, activeObject, latest_ct }: any) => {
  return new Promise((resolve, reject) => {
    if (activeObject?.filters?.length > 0 || activeObject?.metadata?.general) {
      const options = {
        type: "StaticImage",
        id: nanoid(),
        src: activeObject?.src,
        preview: activeObject?.preview,
        metadata: {
          ...activeObject?.metadata,
          generationDate: new Date().getTime(),
          originalLayerPreview: activeObject?.metadata?.originalLayerPreview,
        },
        scaleX: activeObject?.scaleX,
        scaleY: activeObject?.scaleY,
        name: latest_ct,
        filters: activeObject?.filters,
      }
      editor.objects.add(options).then(() => {
        if (activeObject?.metadata?.general) {
          applyExtraFilter(activeObject, editor)
        }
      })
    } else {
      editor.objects.clone()
      editor.objects.select("frame")
      setTimeout(() => {
        editor.objects.update({ name: latest_ct })
        resolve(editor.objects.update({ name: activeObject.name }))
      }, 50)
    }

    editor.cancelContextMenuRequest()
  })
}

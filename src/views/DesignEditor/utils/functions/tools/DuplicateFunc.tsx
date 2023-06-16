import { nanoid } from "nanoid"

export const DuplicateFunc = ({ editor, activeObject, latest_ct }: any) => {
  return new Promise((resolve, reject) => {
    if (activeObject?.filters?.length > 0) {
      const options = {
        type: "StaticImage",
        id: nanoid(),
        src: activeObject?.src,
        preview: activeObject?.preview,
        metadata: { generationDate: new Date().getTime(), original: activeObject?.metadata?.original },
        scaleX: activeObject?.scaleX,
        scaleY: activeObject?.scaleY,
        name: latest_ct,
        filters: activeObject?.filters,
      }

      editor.objects.add(options)
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

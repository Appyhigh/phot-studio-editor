import { useActiveObject, useEditor } from "@layerhub-io/react"

export const FlipFunc = () => {
  const editor = useEditor()
  const activeObject = useActiveObject() as any

  editor.objects.clone()
  setTimeout(() => {
    editor.objects.update({ name: activeObject.name })
  }, 10)
}

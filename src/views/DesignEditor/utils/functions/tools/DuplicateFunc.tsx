export const DuplicateFunc = ({ editor, activeObject }: any) => {
  editor.objects.clone()
  editor.objects.select("frame")
  setTimeout(() => {
    editor.objects.update({ name: activeObject.name })
  }, 10)
  editor.cancelContextMenuRequest()
}

export const DuplicateFunc = ({ editor, activeObject }: any) => {
  editor.objects.clone()
  setTimeout(() => {
    editor.objects.update({ name: activeObject.name })
  }, 10)
}

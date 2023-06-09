export const DuplicateFunc = ({ editor, activeObject }: any) => {
  return new Promise((resolve, reject) => {
    editor.objects.clone()
    editor.objects.select("frame")
    setTimeout(() => {
      resolve(editor.objects.update({ name: activeObject.name }))
    }, 10)

    editor.cancelContextMenuRequest()
  })
}

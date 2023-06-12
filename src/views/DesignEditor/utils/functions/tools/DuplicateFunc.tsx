export const DuplicateFunc = ({ editor, activeObject, latest_ct }: any) => {
  return new Promise((resolve, reject) => {
    editor.objects.clone()
    editor.objects.select("frame")
    setTimeout(() => {
      editor.objects.update({ name: latest_ct })
      resolve(editor.objects.update({ name: activeObject.name }))
    }, 50)

    editor.cancelContextMenuRequest()
  })
}

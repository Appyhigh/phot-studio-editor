export const BackFunc = ({ editor, activeObject }: any) => {
  editor.objects.update({ name: activeObject.name })
  editor.objects.sendBackwards()
  editor.cancelContextMenuRequest()
}

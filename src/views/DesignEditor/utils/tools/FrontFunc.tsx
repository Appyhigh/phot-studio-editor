export const FrontFunc = ({ editor, activeObject }: any) => {
  editor.objects.update({ name: activeObject.name })
  editor.objects.bringToFront()
}

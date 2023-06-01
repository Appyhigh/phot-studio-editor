const InvisibleFunc = ({ editor, setState }: any) => {
  editor.objects.update({ visible: false })
  if (setState) setState({ visible: false })
  editor.cancelContextMenuRequest()
}
const VisibleFunc = ({ editor, setState }: any) => {
  editor.objects.update({ visible: true })
  if (setState) setState({ visible: true })
  editor.cancelContextMenuRequest()
}

export { InvisibleFunc, VisibleFunc }

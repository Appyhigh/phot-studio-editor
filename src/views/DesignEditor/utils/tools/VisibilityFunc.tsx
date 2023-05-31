const InvisibleFunc = ({ editor, setState }: any) => {
  editor.objects.update({ visible: false })
  setState({ visible: false })
  editor.cancelContextMenuRequest()
}
const VisibleFunc = ({ editor, setState }: any) => {
  editor.objects.update({ visible: true })
  setState({ visible: true })
  editor.cancelContextMenuRequest()
}

export { InvisibleFunc, VisibleFunc }

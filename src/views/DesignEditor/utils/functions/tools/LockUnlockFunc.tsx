export const LockFunc = ({ editor, setState }: any) => {
  editor.objects.lock()
  if (setState) setState({ locked: true })
  editor.cancelContextMenuRequest()
}

export const UnlockFunc = ({ editor, setState }: any) => {
  editor.objects.unlock()
  editor.cancelContextMenuRequest()
  if (setState) setState({ locked: false })
}

export const LockFunc = ({ editor, setState }: any) => {
  editor.objects.lock()
  setState({ locked: true })
  editor.cancelContextMenuRequest()
}

export const UnlockFunc = ({ editor, setState }: any) => {
  editor.objects.unlock()
  editor.cancelContextMenuRequest()
  setState({ locked: false })
}

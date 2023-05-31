export const LockFunc = ({ editor, setState }: any) => {
  editor.objects.lock()
  setState({ locked: true })
}

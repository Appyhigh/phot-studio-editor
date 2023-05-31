export const UnlockFunc = ({ editor, setState }: any) => {
  editor.objects.unlock()
  setState({ locked: false })
}

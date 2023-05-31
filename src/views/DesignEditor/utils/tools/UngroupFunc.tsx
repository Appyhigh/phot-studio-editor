export const UngroupFunc = ({ editor, state, setState }: any) => {
  editor.objects.ungroup()
  setState({ ...state, isGroup: false })
}

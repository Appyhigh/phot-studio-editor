export const GroupFunc = ({ editor, activeObject, state, setState }: any) => {
  editor.objects.update({ name: activeObject.name })
  editor.objects.group()
  setState({ ...state, isGroup: true })
}

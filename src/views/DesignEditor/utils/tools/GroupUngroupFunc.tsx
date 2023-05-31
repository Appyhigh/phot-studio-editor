export const GroupFunc = ({ editor, activeObject, state, setState }: any) => {
  editor.objects.update({ name: activeObject.name })
  editor.objects.group()
  setState({ ...state, isGroup: true })
}

export const UngroupFunc = ({ editor, state, setState }: any) => {
  editor.objects.ungroup()
  setState({ ...state, isGroup: false })
  editor.cancelContextMenuRequest()
}

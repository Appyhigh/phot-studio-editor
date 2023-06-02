export const GroupFunc = ({ editor, activeObject, state, setState }: any) => {
  // editor.objects.update({ name: activeObject.name })

  editor.objects.group()
  if (setState) setState({ ...state, isGroup: true })
}

export const UngroupFunc = ({ editor, state, setState }: any) => {
  editor.objects.ungroup()
  if (setState) setState({ ...state, isGroup: false })
  editor.cancelContextMenuRequest()
}

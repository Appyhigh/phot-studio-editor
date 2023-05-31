export const PasteFunc = ({ editor }: any) => {
  editor.objects.paste()
  editor.cancelContextMenuRequest()
}

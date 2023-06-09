export const DuplicateFunc = ({ editor, activeObject,latest_ct }: any) => {
  editor.objects.clone();
  setTimeout(()=>{
    editor.objects.update({ name: latest_ct})
  },500)

  editor.cancelContextMenuRequest()
}

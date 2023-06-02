export const DeleteFunc = ({ editor, activeObject, mainImgInfo, setMainImgInfo, setPanelInfo }: any) => {
  if (mainImgInfo && activeObject?.id === mainImgInfo.id) {
    // @ts-ignore
    if (setPanelInfo)
      setPanelInfo((prev: any) => ({
        ...prev,
        uploadSection: true,
        trySampleImg: true,
        uploadPreview: false,
        bgOptions: false,
        bgRemoverBtnActive: false,
      }))
    if (setMainImgInfo) setMainImgInfo((prev: any) => ({ ...prev, id: "" }))
  }
  editor.objects.remove(activeObject?.id)
  editor.cancelContextMenuRequest()
}

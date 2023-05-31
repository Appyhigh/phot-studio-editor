export const DeleteFunc = ({ editor, activeObject, mainImgInfo, setMainImgInfo }: any) => {
  if (activeObject?.id === mainImgInfo.id) {
    // @ts-ignore
    setPanelInfo((prev) => ({
      ...prev,
      uploadSection: true,
      trySampleImg: true,
      uploadPreview: false,
      bgOptions: false,
      bgRemoverBtnActive: false,
    }))
    setMainImgInfo((prev: any) => ({ ...prev, id: "" }))
  }
  editor.objects.remove(activeObject?.id)
}

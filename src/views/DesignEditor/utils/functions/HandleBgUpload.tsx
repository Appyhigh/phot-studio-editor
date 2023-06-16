export const HandleBgUpload = (setBgUploading: any, setBgUploadPreview: any, imageUrl: any) => {
  setBgUploading(true)
  setBgUploadPreview((prev: any) => ({ ...prev, showPreview: true, url: imageUrl }))
  console.log("imageUrl", imageUrl)
  if (imageUrl) {
    setBgUploading(false)
  }
}

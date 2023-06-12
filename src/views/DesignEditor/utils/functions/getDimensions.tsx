export const getDimensions = async (url: any, callback: any) => {
  const img = new Image()
  img.src = url
  img.onload = () => {
    callback(img)
  }
}

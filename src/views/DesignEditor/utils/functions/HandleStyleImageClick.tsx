export const HandleStyleImageClick = (
  styleImage: any,
  setStyleImage: any,
  textToArtInputInfo: any,
  setTextToArtInputInfo: any,
  index: number,
  image: any
) => {
  if (styleImage.has(image)) {
    styleImage.delete(image)
    const updatedStyle = textToArtInputInfo.style.filter((styleName: string) => styleName !== image.name)
    setTextToArtInputInfo({ ...textToArtInputInfo, style: updatedStyle })
  } else {
    styleImage.add(image)
    setTextToArtInputInfo({ ...textToArtInputInfo, style: [...textToArtInputInfo.style, image.name] })
  }
  setStyleImage(new Set(styleImage))
}

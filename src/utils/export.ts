export const makeDownloadToPNG = (data: Object, selectedType: string) => {
  const dataStr = `${data}`
  const a = document.createElement("a")
  a.href = dataStr
  a.download = `image.${selectedType}`
  a.click()
}

export const makeDownloadToSVGHandler = (data: Object, frame: any) => {
  const dataStr = `${data}`
  const a = document.createElement("a")
  const width = frame.width
  const height = frame.height

  const svgFile = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="${width}" height="${height}" fill="url(#pattern0)"/>
  <defs>
  <pattern id="pattern0" width="1" height="1">
  <use xlink:href="#image0_118_3" />
  <image id="image0_118_3" width="${width}" height="${height}" xlink:href="${dataStr}"/>
  </pattern>
  </defs>
  </svg>`
  const svgBlob = new Blob([svgFile], { type: "image/svg+xml" })
  a.href = URL.createObjectURL(svgBlob)
  a.download = `image.svg`
  a.click()
}

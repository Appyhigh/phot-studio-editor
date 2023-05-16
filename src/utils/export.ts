import { resizeImage } from "./canvasUtils"

export const makeDownloadToPNG = async (data: any, selectedType: string, height?: number, width?: number) => {
  let image = data
  if (height && width) {
    image = await resizeImage(data, height, width)
  }
  const dataStr = `${image}`
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

export const toDataURL = (url: any, callback: any) => {
  var xhr = new XMLHttpRequest()
  xhr.onload = function () {
    var reader = new FileReader()
    reader.onloadend = function () {
      callback(reader.result)
    }
    reader.readAsDataURL(xhr.response)
  }
  xhr.open("GET", url)
  xhr.responseType = "blob"
  xhr.send()
}

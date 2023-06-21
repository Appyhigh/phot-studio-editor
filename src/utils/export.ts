import { resizeBase64Image } from "./updateLayerBackground"

export const makeDownloadToPDF = async (data: any, height?: number, width?: number) => {
  var b64 = data
   if (height && width) {
     b64 = await resizeBase64Image(data, width, height)
   }
   b64 = b64.substr(22)
 
   const bin = window.atob(b64)
   console.log('File Size:', Math.round(bin.length / 1024), 'KB');
   
   const binaryString = Uint8Array.from(window.atob(b64), (c) => c.charCodeAt(0))
 
   const byteArrays = []
 
   for (let offset = 0; offset < binaryString.length; offset += 512) {
     const slice = binaryString.slice(offset, offset + 512)
     byteArrays.push(slice)
   }
 
   const pdfFile = new Blob(byteArrays, { type: "application/pdf" })
   const pdfUrl = URL.createObjectURL(pdfFile)
 
   // Create a download link
   const downloadLink = document.createElement("a")
   downloadLink.href = pdfUrl
   downloadLink.download = "converted.pdf"
 
   // Simulate click to trigger the download
   document.body.appendChild(downloadLink) // Append the link to the body before click
   downloadLink.click()
   console.log(pdfUrl);
   
   // Cleanup
   URL.revokeObjectURL(pdfUrl)
   document.body.removeChild(downloadLink)
 
 }

export const makeDownloadToPNG = async (data: any, selectedType: string, height?: number, width?: number) => {
  let image = data
  if (height && width) {
    image = await resizeBase64Image(data, width, height)
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

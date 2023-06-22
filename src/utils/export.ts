import { resizeBase64Image } from "./updateLayerBackground"
import { PDFDocument,PageSizes } from "pdf-lib";

export const makeDownloadToPDF = async (data: any, height?: number, width?: number) => {
  // let image = data
  // if (height && width) {
  //   image = await resizeBase64Image(data, width, height)
  // }

  const b64 = data.substr(22)
    try {
      const binaryString = window.atob(b64);
  
      const pdfDoc = await PDFDocument.create();
      const imageBytes = Uint8Array.from([...binaryString].map((char) => char.charCodeAt(0)));
      const image = await pdfDoc.embedPng(imageBytes);

        // Calculate the aspect ratio of the image
        const aspectRatio = image.width / image.height;

        // Set the page dimensions to A4 size (595.28 x 841.89)
        const page = pdfDoc.addPage(PageSizes.A4);
    
        let scaledWidth, scaledHeight;
    
        if (width && height) {
          // Both width and height provided
          scaledWidth = width;
          scaledHeight = height;
        } else if (width) {
          // Only width provided, calculate height based on aspect ratio
          scaledWidth = width;
          scaledHeight = width / aspectRatio;
        } else if (height) {
          // Only height provided, calculate width based on aspect ratio
          scaledHeight = height;
          scaledWidth = height * aspectRatio;
        } else {
          // No width or height provided, use image's original dimensions
          scaledWidth = image.width;
          scaledHeight = image.height;
        }
    
        // Calculate the horizontal and vertical positions to center the image
        const horizontalPosition = (page.getWidth() - scaledWidth) / 2;
        const verticalPosition = (page.getHeight() - scaledHeight) / 2;
    
        page.drawImage(image, {
          x: horizontalPosition,
          y: verticalPosition,
          width: scaledWidth,
          height: scaledHeight,
        });
  
      const pdfBytes = await pdfDoc.save();
  
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
  
      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(pdfBlob);
      downloadLink.download = 'converted.pdf';
  
      // Simulate click to trigger the download
      document.body.appendChild(downloadLink);
      downloadLink.click();
  
      // Cleanup
      URL.revokeObjectURL(downloadLink.href);
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error converting image to PDF:', error);
    }
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

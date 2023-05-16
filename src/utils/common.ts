export const API_BASE_URL =
  // process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "PROD" ? "https://prodapi.phot.ai" : "https://devapi.phot.ai"
  "https://devapi.phot.ai"

export const svgExtensionToJPEG = (svgFileName: string) => {
  if (svgFileName.endsWith(".svg")) {
    const position = svgFileName.lastIndexOf(".svg")
    const result = svgFileName.substring(0, position) + ".jpeg"
    return result
  } else {
    return svgFileName
  }
}

export const DEFAULT_DIMENSIONS = {
  height: 500,
  width: 300,
}

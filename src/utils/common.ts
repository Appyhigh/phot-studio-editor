import { destroyCookie } from "nookies"
import { COOKIE_KEYS } from "./enum"

export const API_BASE_URL =
  // process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "PROD" ? "https://prodapi.phot.ai" : "https://devapi.phot.ai"
  "https://devapi.phot.ai"

export const COMING_SOON_VIDEO_URL = "https://ai-image-editor-wasabi-bucket.apyhi.com/all-tools/Phot AI Teaser.mp4"
export const ProdPhotAILink = "https://www.phot.ai/"

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
  width: 500,
}

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2 && parts) return parts.pop()?.split(";").shift()
  else return "invalid_cookie_value_detected"
}

export const GOOGLE_AUTH_SESSION_PERIOD = 15 * 60 * 1000

export const destroyAllCookies = () => {
  destroyCookie(null, COOKIE_KEYS.SESSION, { path: "/" })
  destroyCookie(null, COOKIE_KEYS.AUTH, { path: "/" })
  destroyCookie(null, COOKIE_KEYS.POLL_BG_GENERATOR, { path: "/" })
  destroyCookie(null, COOKIE_KEYS.POLL_OBJECT_REPLACER, { path: "/" })
  destroyCookie(null, COOKIE_KEYS.POLL_PHOTO_EDITOR, { path: "/" })
}

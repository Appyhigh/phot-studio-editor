import axios from "axios"
import { getCookie } from "./common"
import { COOKIE_KEYS } from "./enum"

export const img2Upscaler = async (sourceUrl: string, fileName?: string) => {
  try {
    const url = "https://devapi.phot.ai/v1/create-enhancer-2k"
    const body = {
      sourceUrl: sourceUrl,
      fileName: fileName,
    }


    const response = await axios.post(url, body)
    return response.data
  } catch (error) {
    console.error("An error occurred while sending the request:", error)
    throw error
  }
}


export const img4Upscaler = async (sourceUrl: string, fileName?: string) => {
    try {
      const url = "https://devapi.phot.ai/v1/create-enhancer-4k"
      const body = {
        sourceUrl: sourceUrl,
        fileName: fileName,
      }
 
      const response = await axios.post(url, body)
      return response.data
    } catch (error) {
      console.error("An error occurred while sending the request:", error)
      throw error
    }
  }
  


  
import axios from "axios"
import { getCookie } from "./common"
import { COOKIE_KEYS } from "./enum"

export const img2Upscaler = async (sourceUrl: string, fileName?: string) => {
  try {
    const url = "https://devapi.phot.ai/app/api/v3/user_activity/create-enhancer-2k"
    const body = {
      sourceUrl: sourceUrl,
      fileName: fileName,
    }
    const config = {
      headers: { Authorization: `Bearer ${getCookie(COOKIE_KEYS.AUTH)}` },
    }
    const response = await axios.post(url, body, config)
    return response.data.data["2k"].url
  } catch (error) {
    console.error("An error occurred while sending the request:", error)
    throw error
  }
}

export const imgBothUpscaler = async (sourceUrl: string, fileName?: string) => {
  try {
    const url = "https://devapi.phot.ai/app/api/v3/user_activity/create-enhancer-2k-4k"
    const body = {
      sourceUrl: sourceUrl,
      fileName: fileName,
    }
    const config = {
      headers: { Authorization: `Bearer ${getCookie(COOKIE_KEYS.AUTH)}` },
    }
    const response = await axios.post(url, body, config)
    return response.data.data;
  } catch (error) {
    console.error("An error occurred while sending the request:", error)
    throw error
  }
}



export const img4Upscaler = async (sourceUrl: string, fileName?: string) => {
  try {
    const url = "https://devapi.phot.ai/app/api/v3/user_activity/create-enhancer-4k"
    const body = {
      sourceUrl: sourceUrl,
      fileName: fileName,
    }
    const config = {
      headers: { Authorization: `Bearer ${getCookie(COOKIE_KEYS.AUTH)}` },
    }
    const response = await axios.post(url, body, config)
    return response.data.data["4k"].url
  } catch (error) {
    console.error("An error occurred while sending the request:", error)
    throw error
  }
}
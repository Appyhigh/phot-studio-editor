import axios from "axios"
import { getCookie } from "./common"
import { COOKIE_KEYS } from "./enum"

export const imgColorizerController = async (sourceUrl?: string, fileName?: string) => {
    try {
      const url = "https://devapi.phot.ai/app/api/v3/user_activity/color-restoration-2k"
      const body = {
        sourceUrl: sourceUrl,
        fileName: fileName,
      }
      const config = {
        headers: { Authorization: `Bearer ${getCookie(COOKIE_KEYS.AUTH)}` },
      }
      const response = await axios.post(url, body,config)
      return response.data.data["2k"].url
    } catch (error) {
      console.error("An error occurred while sending the request:", error)
      throw error
    }
  }
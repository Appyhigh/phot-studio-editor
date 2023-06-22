import axios from "axios"
import { getCookie } from "./common"
import { COOKIE_KEYS } from "./enum"

export const imgColorizerController = async (sourceUrl?: string, fileName?: string) => {
    try {
      const url = "https://devapi.phot.ai/v1/color-restoration-2k"
      const body = {
        sourceUrl: "https://images.pexels.com/photos/4423849/pexels-photo-4423849.jpeg",
        fileName: "",
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
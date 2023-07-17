import axios from "axios"
import { API_BASE_URL, getCookie, svgExtensionToJPEG } from "~/utils/common"
import { COOKIE_KEYS } from "~/utils/enum"

export const removeBackgroundWithoutPromps = async (image: string | undefined, fileName: string) => {
  try {
    const url = `${API_BASE_URL}/app/api/v3/user_activity/background-remover`

    const body = {
      input_image_link: image,
      file_name: svgExtensionToJPEG(fileName),
    }

    console.log(body)

    const config = {
      headers: { Authorization: `Bearer ${getCookie(COOKIE_KEYS.AUTH)}` },
    }

    const response = await axios.post(url, body, config)
    return response.data
  } catch (error) {
    console.error("An error occurred while sending the request:", error)
    throw error
  }
}

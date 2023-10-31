import axios from "axios"
import { API_BASE_URL, getCookie } from "~/utils/common"
import { COOKIE_KEYS } from "~/utils/enum"

const imagineAiController = async (
  prompt: string,
  guidance_scale: number,
  image_strength: number,
  negative_prompt: string,
  num_outputs: number,
  aspect_ratio: string,
  style: any[],
  image?: string
) => {
  try {
    const url = API_BASE_URL + "/v1/create-art"
    const body = {
      prompt: prompt,
      image: image,
      guidance_scale: guidance_scale,
      image_strength: image_strength / 10,
      negative_prompt: negative_prompt,
      num_outputs: num_outputs,
      aspect_ratio: aspect_ratio,
      studio_options: {
        style: style,
      },
    }
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

export default imagineAiController

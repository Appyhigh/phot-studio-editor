import axios from "axios"
import { getCookie } from "~/utils/common"
import { COOKIE_KEYS } from "~/utils/enum"

const photoEditorController = async (input_image_link: string, prompt: string) => {
  try {
    const url = "https://devapi.phot.ai/app/api/v3/user_activity/edit-photo"
    const regex = /\/([^/]+)$/
    const match = regex.exec(input_image_link)
    let value = match ? match[1] : null
    if (value) {
      value = value.replace(/[^.\w]/gi, "")
    }
    const body = {
      input_image_link: input_image_link,
      prompt: prompt,
      file_name: value,
    }
    const config = {
      headers: { Authorization: `Bearer ${getCookie(COOKIE_KEYS.AUTH)}` },
    }

    const order = await axios.post(url, body, config)
    const order_id = order.data.order_id
    const order_url = "https://devapi.phot.ai/app/api/v1/user_activity/order-status"

    let response = await axios.get(order_url, {
      headers: { Authorization: `Bearer ${getCookie(COOKIE_KEYS.AUTH)}` },
      params: {
        order_id: order_id,
      },
    })
    let status = response.data.order_status_code

    while (status == 102 || status == 103) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      response = await axios.get(order_url, {
        headers: { Authorization: `Bearer ${getCookie(COOKIE_KEYS.AUTH)}` },
        params: {
          order_id: order_id,
        },
      })
      status = response.data.order_status_code
    }

    return response!.data.output_urls
  } catch (error) {
    console.error("An error occurred while sending the request:", error)
    throw error
  }
}

export default photoEditorController

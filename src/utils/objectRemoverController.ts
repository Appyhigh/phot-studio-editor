import axios from "axios"
import { API_BASE_URL, getCookie, svgExtensionToJPEG } from "./common"
import { COOKIE_KEYS } from "./enum"

export const objectRemoverController = async (
  imgLink: string | undefined,
  mask_img: string | undefined,
  file_name: string | undefined,
  prompt?: string | undefined,
  polling_interval?: number | undefined
) => {
  try {
    // @ts-ignore
    const body = {
      input_image_link: imgLink,
      mask_image: mask_img,
      file_name: svgExtensionToJPEG(file_name ? file_name : ""),
      prompt: prompt,
      // op: 'DUMMY',
    }

    const config = {
      headers: { Authorization: `Bearer ${getCookie(COOKIE_KEYS.AUTH)}` },
    }

    //@ts-ignore
    const order = await axios.post(API_BASE_URL + "/app/api/v3/user_activity/replace-object", body, config)
    const order_id = order.data.order_id
    const order_url = `${API_BASE_URL}/app/api/v1/user_activity/order-status?${order_id}`
    let response = await axios.get(order_url, {
      headers: { Authorization: `Bearer ${getCookie(COOKIE_KEYS.AUTH)}` },
      params: {
        order_id: order_id,
      },
    })
    let status = response.data.order_status_code

    while (status == 102 || status == 103) {
      await new Promise((resolve) => setTimeout(resolve, polling_interval))
      response = await axios.get(order_url, {
        headers: { Authorization: `Bearer ${getCookie(COOKIE_KEYS.AUTH)}` },
        params: {
          order_id: order_id,
        },
      })
      status = response.data.order_status_code
    }

    return response!.data
  } catch (error) {
    console.error("An error occurred while sending the request:", error)
    throw error

    // return fetch(`https://devapi.phot.ai/app/api/v1/user_activity/object-replacer-v2`, requestOptions)
    //   .then((response) => {
    //     return response.json()
    //   })
    //   .then((result) => {
    //     // setRequestState({ isLoading: false, errorMsg: undefined, isError: false });
    //     // return result.output_image;
    //     return result
    //   })
  }
}

import axios from "axios"
import { getCookie, svgExtensionToJPEG } from "./common"
import { COOKIE_KEYS } from "./enum"

export const objectRemoverController = async (
  imgLink: string | undefined,
  mask_img: string | undefined,
  file_name: string | undefined,
  prompt?:string | undefined
) => {
  try {
    // @ts-ignore
    // console.log( mask_img)
    const body = {
      input_image_link: imgLink,
      mask_image: mask_img,
      file_name: svgExtensionToJPEG(file_name ? file_name : ''),
      prompt:prompt
      // op: 'DUMMY',
    }
 
    const config = {
      headers: { Authorization: `Bearer ${getCookie(COOKIE_KEYS.AUTH)}` },
    }
    console.log(body);
    
    //@ts-ignore
    const order = await axios.post("https://devapi.phot.ai/app/api/v1/user_activity/object-replacer-v2", body, config)
    const order_id = order.data.order_id
    const order_url = `https://devapi.phot.ai/app/api/v1/user_activity/order-status?${order_id}`
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

import { API_BASE_URL, svgExtensionToJPEG } from "~/utils/common"

export const removeBackgroundWithoutPromps = (image: string | undefined, fileName: string) => {
  const myHeaders = new Headers()
  // @ts-ignore
  myHeaders.append('Authorization', `Bearer ${getCookie(COOKIE_KEYS.AUTH)}`);
  myHeaders.append("Content-Type", "application/json")
  
  const raw = JSON.stringify({
    input_image_link: `${image}`,
    file_name: svgExtensionToJPEG(fileName),
    // op: 'DUMMY',
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  //@ts-ignore
  return fetch(`${API_BASE_URL}/app/api/v1/user_activity/remove-background-v2`, requestOptions)
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      // return result.output_image;
      return result
    })
    .catch((err) => {
      return err;
    })
}

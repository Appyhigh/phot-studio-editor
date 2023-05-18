import { API_BASE_URL, getCookie } from "~/utils/common"
import { COOKIE_KEYS } from "~/utils/enum"

export const upsertGoogleLoggedInUser = (userPayload: any) => {
  return fetch(`${API_BASE_URL}/app/api/v1/user/user-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userPayload),
  })
    .then((res) => res.json())
    .then((result) => {
      return result.data
    })
}

export const getUserInfo = async () => {
  try {
    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${getCookie(COOKIE_KEYS.AUTH)}`)

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
    const res = await fetch(`${API_BASE_URL}/app/api/v1/user/info`, requestOptions)
    const { data } = await res.json()
    return data
  } catch (error: any) {
    console.log("err in uder info", error.message)
  }
}

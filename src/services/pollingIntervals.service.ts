import { destroyCookie, setCookie } from "nookies"
import { API_BASE_URL, getCookie } from "~/utils/common"
import { COOKIE_KEYS } from "~/utils/enum"

export const getPollingIntervals = () => {
  const myHeaders = new Headers()

  // @ts-ignore
  myHeaders.append("Authorization", `Bearer ${getCookie(COOKIE_KEYS.AUTH)}`)

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  // @ts-ignore
  return fetch(`${API_BASE_URL}/app/api/v1/user_activity/ping-interval`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
}

export const storePollingIntervalCookies = (res: any) => {
  const { features = null } = res

  if (features) {
    const { background_generator = null, object_replacer = null, photo_editor = null } = features

    // destroy old cookies
    destroyCookie(null, COOKIE_KEYS.POLL_BG_GENERATOR, { path: "/" })
    destroyCookie(null, COOKIE_KEYS.POLL_OBJECT_REPLACER, { path: "/" })
    destroyCookie(null, COOKIE_KEYS.POLL_PHOTO_EDITOR, { path: "/" })

    if (background_generator) setCookie(null, COOKIE_KEYS.POLL_BG_GENERATOR, background_generator, { path: "/" })

    if (object_replacer) setCookie(null, COOKIE_KEYS.POLL_OBJECT_REPLACER, object_replacer, { path: "/" })

    if (photo_editor) setCookie(null, COOKIE_KEYS.POLL_PHOTO_EDITOR, photo_editor, { path: "/" })
  }
}

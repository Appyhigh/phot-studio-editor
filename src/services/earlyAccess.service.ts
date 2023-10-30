import axios from "axios"
import { API_BASE_URL } from "~/utils/common"

export const addEmailForWaitingList = (email: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // const query = search.length > 2 ? `*${search}*` : search;
      const { data } = await axios.post(`${API_BASE_URL}/app/api/v3/user_activity/saveUser`, {
        email: email,
      })
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

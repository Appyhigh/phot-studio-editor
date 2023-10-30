import axios from "axios"

export const addEmailForWaitingList = (email: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // const query = search.length > 2 ? `*${search}*` : search;
      const { data } = await axios.post(`https://devap.phot.ai/app/api/v3/user_activity/saveUser`, {
        email: email,
      })
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

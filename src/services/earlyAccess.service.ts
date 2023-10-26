import axios from "axios"

export const addEmailForWaitingList = (email: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // const query = search.length > 2 ? `*${search}*` : search;
      const { data } = await axios.post(`https://devapi.phot.ai/studio/api/search`, {
        email: email,
      })
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

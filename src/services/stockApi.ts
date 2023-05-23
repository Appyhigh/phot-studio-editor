import axios from "axios"

export const getStockImages = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get("https://devapi.phot.ai/studio/api/search?q=haute&page=2&perPage=12")
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

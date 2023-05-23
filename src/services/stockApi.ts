import axios from "axios"

export const getStockImages = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        "https://qaapi.phot.ai/studio/api/search?q=${q}&order=${order}&category=${category}"
      )
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

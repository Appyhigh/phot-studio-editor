import axios from "axios"

export const SampleImagesApi = (type:any): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        `https://devapi.phot.ai/app/api/v1/fetch-tools-assets?activity=${type}`
      )      
      resolve(data.data)
    } catch (err) {

      reject(err)
    }
  })
}

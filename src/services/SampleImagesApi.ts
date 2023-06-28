import axios from "axios"

export const SampleImagesApi = (type: any): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Temporary fix to use bg remover tool to fetch sample image until new API for other tools come
      if (type == "") type = "STUDIO_BACKGROUND_REMOVER"
      const { data } = await axios.get(`https://devapi.phot.ai/app/api/v1/fetch-tools-assets?activity=${type}`)
      resolve(data.data)
    } catch (err) {
      reject(err)
    }
  })
}

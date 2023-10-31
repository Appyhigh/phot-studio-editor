import axios from "axios"
import { API_BASE_URL } from "~/utils/common"

export const SampleImagesApi = (type: any): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Temporary fix to use bg remover tool to fetch sample image until new API for other tools comee
      if (type == "") type = "STUDIO_BACKGROUND_REMOVER"
      const { data } = await axios.get(`${API_BASE_URL}/app/api/v1/fetch-tools-assets?activity=${type}`)
      resolve(data.data)
    } catch (err) {
      reject(err)
    }
  })
}

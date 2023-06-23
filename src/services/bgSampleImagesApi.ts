import axios from "axios"

export const bgSampleImagesApi = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        // `https://devapi.phot.ai/app/api/v1/fetch-tools-assets?activity=STUDIO_BACKGROUND_REMOVER`
        `https://devapi.phot.ai/app/api/v1/fetch-tools-assets?activity=UPSCALER`
      )
      resolve(data.data)
    } catch (err) {
      reject(err)
    }
  })
}

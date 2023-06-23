import axios from "axios"

export const imgUpscalerSample = async () => {
  try {
    const url = "https://devapi.phot.ai/app/api/v1/fetch-tools-assets?activity=UPSCALER"
    const { data } = await axios.get(url)    
    return data.data
  } catch (err) {
    console.error("An error occurred while sending the request:", err)
    throw err
  }
}

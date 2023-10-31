import axios from "axios"
import { API_BASE_URL } from "~/utils/common"

const defaultProps = {
  search: "",
  page: 1,
  perPage: 12,
}

export const selectStyleApi = (
  search: string = defaultProps.search,
  page: number = defaultProps.page,
  perPage: number = defaultProps.perPage
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/v1/get-studio-options`, {
        params: {
          q: search,
          pageNumber: page,
          perPage: perPage,
        },
      })
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

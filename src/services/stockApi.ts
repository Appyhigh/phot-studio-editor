import axios from "axios"

const defaultProps = {
  search: "",
  page: 1,
  perPage: 12,
}

export const getStockImages = (
  search: string = defaultProps.search,
  page: number = defaultProps.page,
  perPage: number = defaultProps.perPage
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        `https://devapi.phot.ai/studio/api/search?q=${search}&page=${page}&perPage=${perPage}`
      )
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

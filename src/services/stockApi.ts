import axios from "axios"

const defaultProps = {
  search: "",
  page: 1,
  perPage: 10,
}

export const getStockImages = (
  search: string = defaultProps.search,
  page: number = defaultProps.page,
  perPage: number = defaultProps.perPage
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // const query = search.length > 2 ? `*${search}*` : search;
      const { data } = await axios.get(`https://devapi.phot.ai/studio/api/search`, {
        params: {
          q: search,
          page: page,
          perPage: perPage,
        },
      })

      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

import { getStockImages } from "~/services/stockApi"
import { useEffect, useState } from "react"
import useAppContext from "~/hooks/useAppContext"

export default function usePagination(search: string, page: number) {
  const { res, setRes }: any = useAppContext()
  const [more, setMore] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getStockImages(search, page)
      .then((res) => {
        setRes((prev: any) => [...new Set([...prev, ...res])])
        setMore(Boolean(res.length))
        setLoading(false)
      })
      .catch((e) => console.log(e))
  }, [page])

  return { res, more, loading }
}

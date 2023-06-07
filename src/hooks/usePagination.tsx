import { useEffect, useState } from "react"
import useAppContext from "~/hooks/useAppContext"

export default function usePagination(type: string, api: any, search: string, page: number) {
  const { res, setRes }: any = useAppContext()
  const [result, setResult]: any = useState<any>([])
  const [more, setMore] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api(search, page)
      .then((res: any) => {
        if (type == "stock") {
          setRes((prev: any) => [...new Set([...prev, ...res])])
          setMore(Boolean(res.length))
        } else {
          setResult((prev: any) => [...new Set([...prev, ...res["data"]["source_studio"]])])
          console.log("RESULT LENGTH", result.length)
          setMore(Boolean(result.length))
        }
        setLoading(false)
      })
      .catch((e: any) => console.log(e))
  }, [page])

  return { res, more, loading, result }
}

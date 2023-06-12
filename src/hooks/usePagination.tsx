import { useContext, useEffect, useState } from "react"
import TextToArtContext from "~/contexts/TextToArtContext"
import useAppContext from "~/hooks/useAppContext"

export default function usePagination(type: string, api: any, search: string, page: number, setErrorInfo: any) {
  const { res, setRes }: any = useAppContext()
  const { result, setResult } = useContext(TextToArtContext)
  const [more, setMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errorLoading, setErrorLoading] = useState(1)

  useEffect(() => {
    setLoading(true)
    api(search, page)
      .then((res: any) => {
        if (type == "stock") {
          setRes((prev: any) => [...new Set([...prev, ...res])])
          setMore(Boolean(res.length))
        } else {
          setResult((prev: any) => [...new Set([...prev, ...res["data"]["source_studio"]])])
          setMore(Boolean(res["data"]["source_studio"].length))
        }
        setLoading(false)
      })
      .catch((e: any) => {
        console.log(e.message)
        setLoading(false)
        // @ts-ignore  
        setErrorInfo((prev) => ({
          ...prev,
          showError: true,
          errorMsg:e.message,
          retryFn: () => {
            // @ts-ignore
            setErrorInfo((prev) => ({ ...prev, showError: false }))
            setErrorLoading(2)
          },
        }))
        setTimeout(() => {
          // @ts-ignore
          setErrorInfo((prev) => ({ ...prev, showError: false }))
        }, 5000)
        console.log(e)
      })
  }, [page, errorLoading])

  return { res, more, loading, result }
}

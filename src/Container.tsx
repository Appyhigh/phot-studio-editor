import React, { useCallback, useEffect, useRef } from "react"
import ResizeObserver from "resize-observer-polyfill"
import useAppContext from "~/hooks/useAppContext"
import { getPublicDesigns } from "./store/slices/designs/actions"
import { getPublicComponents } from "./store/slices/components/actions"
import { getFonts } from "./store/slices/fonts/actions"
import { getPixabayResources } from "./store/slices/resources/actions"
import { getUploads } from "./store/slices/uploads/actions"
import { useAppDispatch } from "./store/store"
import { useAuth } from "./hooks/useAuth"
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth"
import { auth } from "./utils/firebase"
import { useEditor } from "@layerhub-io/react"
import { ILayer } from "@layerhub-io/types"
import { backgroundLayerType } from "./constants/contants"

const Container = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile, setIsMobile } = useAppContext()
  const dispatch = useAppDispatch()
  const editor = useEditor()
  const updateMediaQuery = (value: number) => {
    if (!isMobile && value >= 800) {
      setIsMobile(false)
    } else if (!isMobile && value < 800) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }
  useEffect(() => {
    const containerElement = containerRef.current!
    const containerWidth = containerElement.clientWidth
    updateMediaQuery(containerWidth)
    const resizeObserver = new ResizeObserver((entries) => {
      const { width = containerWidth } = (entries[0] && entries[0].contentRect) || {}
      updateMediaQuery(width)
    })
    resizeObserver.observe(containerElement)
    return () => {
      if (containerElement) {
        resizeObserver.unobserve(containerElement)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(getFonts())
    // dispatch(getUploads())
    // dispatch(getPublicComponents())
    dispatch(getPixabayResources())
    // dispatch(getPublicDesigns())
  }, [])

  // @ts-ignore
  const { authState, setAuthState } = useAuth()
  const { user, loading, creditsData } = authState

  const initializeGSI = useCallback(() => {
    // @ts-ignore:next-line
    window?.google?.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response: any) => {
        const idToken = response.credential
        const credential = GoogleAuthProvider.credential(idToken)
        try {
          await signInWithCredential(auth(), credential)
        } catch (error) {
          console.log("error in initializing gsi", error)
        }
      },
      cancel_on_tap_outside: false,
    })
    // @ts-ignore:next-line
    window?.google?.accounts.id.prompt()
  }, [])

  useEffect(() => {
    if (loading) {
      return
    }
    if (user) {
      // @ts-ignore:next-line
      window?.google?.accounts?.id.cancel()
      return
    }
    // using a timer to avoid the window?.google being undefined
    const timer = setTimeout(() => {
      initializeGSI()
    }, 3000)
    return () => clearTimeout(timer)
  }, [user, loading, initializeGSI])

  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("Phot-Studio", 1)

      request.onerror = (event: any) => {
        console.error("IndexedDB error:", event.target.error)
        reject()
      }

      request.onsuccess = (event: any) => {
        const db = event.target.result
        resolve(db)
      }

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result

        if (!db.objectStoreNames.contains("Phot-Studio-Canvas-Store")) {
          db.createObjectStore("Phot-Studio-Canvas-Store")
        }
      }
    })
  }

  const saveData = async (data: any) => {
    try {
      const db: any = await openDatabase()

      const transaction = db.transaction("Phot-Studio-Canvas-Store", "readwrite")
      const objectStore = transaction.objectStore("Phot-Studio-Canvas-Store")

      const putRequest = objectStore.put(data, "dataKey")

      putRequest.onerror = (event: any) => {
        console.error("IndexedDB put error:", event.target.error)
      }

      putRequest.onsuccess = () => {
        // console.log("Data stored successfully in IndexedDB")
      }
    } catch (error) {
      console.error("Failed to save data to IndexedDB:", error)
    }
  }

  const fetchDataFromLocal = async () => {
    try {
      const db: any = await openDatabase()

      const transaction = db.transaction("Phot-Studio-Canvas-Store", "readonly")
      const objectStore = transaction.objectStore("Phot-Studio-Canvas-Store")

      const getRequest = objectStore.get("dataKey")

      getRequest.onerror = (event: any) => {
        console.error("IndexedDB get error:", event.target.error)
      }

      getRequest.onsuccess = (event: any) => {
        const data = event.target.result
        const layers = data
        addObjects(layers)
      }
    } catch (error) {
      console.error("Failed to fetch data from IndexedDB:", error)
    }
  }

  const addObjects = async (layers: any) => {
    if (layers) {
      layers.map((layer: ILayer) => {
        editor.objects.add(layer).then(() => {
          editor.objects.update({ top: layer.top, left: layer.left })
        })
      })
    }
  }

  useEffect(() => {
    if (editor) {
      fetchDataFromLocal()
    }
  }, [editor])

  useEffect(() => {
    if (editor) {
      editor.on("history:changed", () => {
        const currentScene = editor.scene.exportToJSON()

        saveData(
          currentScene.layers.filter(
            (el) =>
              el.metadata?.type !== backgroundLayerType && el.type !== "BackgroundImage" && el.type !== "Background"
          )
        )
      })
    }
  }, [editor])

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        display: "flex",
        height: "100vh",
        width: "100vw",
      }}
    >
      {children}
    </div>
  )
}

export default Container

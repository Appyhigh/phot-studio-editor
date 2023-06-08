import React, { useCallback, useContext, useEffect, useRef } from "react"
import ResizeObserver from "resize-observer-polyfill"
import useAppContext from "~/hooks/useAppContext"
import { getFonts } from "./store/slices/fonts/actions"
import { getPixabayResources } from "./store/slices/resources/actions"
import { useAppDispatch } from "./store/store"
import { useAuth } from "./hooks/useAuth"
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth"
import { auth } from "./utils/firebase"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { ILayer } from "@layerhub-io/types"
import { backgroundLayerType, deviceUploadType } from "./constants/contants"
import { loadFonts } from "./utils/fonts"
import ImagesContext from "./contexts/ImagesCountContext"
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

  const { setImagesCt } = useContext(ImagesContext)
  const activeObject = useActiveObject()

  // useEffect(() => {
  //   if (activeObject?.id === "frame") {
  //     document.addEventListener("keydown", (e) => {
  //       console.log("called",e.key)
  //       if (e.key === "Delete") {
  //         const options = {
  //           type: "BackgroundImage",
  //           // @ts-ignore
  //           src: checkboxBGUrl,
  //           preview: checkboxBGUrl,
  //           metadata: { generationDate: new Date().getTime(), type: backgroundLayerType },
  //         }
  //         // Timeout works as a fix so canvas does not get dislocated

  //         editor.objects.add(options).then(() => {
  //           editor.objects.setAsBackgroundImage()
  //         })
  //       }
  //     })
  //   }
  // },[editor,activeObject])

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

  // @ts-ignore
  const saveData = async (data, canvasDim, images) => {
    try {
      const db: any = await openDatabase()

      const transaction = db.transaction("Phot-Studio-Canvas-Store", "readwrite")
      const objectStore = transaction.objectStore("Phot-Studio-Canvas-Store")

      const putRequest = objectStore.put(data, "dataKey")
      const putCanvasDim = objectStore.put(canvasDim, "canvasDim")
      const imageCt = objectStore.put(images, "imagesCt")

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
      const getCanvasDim = objectStore.get("canvasDim")
      const getImagesCt = objectStore.get("imagesCt")

      getRequest.onerror = (event: any) => {
        console.error("IndexedDB get error:", event.target.error)
      }
      getCanvasDim.onerror = (event: any) => {
        console.error("IndexedDB get error:", event.target.error)
      }

      getImagesCt.onsuccess = (event: any) => {
        const data = event.target.result
        setImagesCt(data)
      }
      getRequest.onsuccess = (event: any) => {
        const data = event.target.result
        const layers = data
        getCanvasDim.onsuccess = (event: any) => {
          const data = event.target.result
          const canvasDim = data

          addObjects(layers, canvasDim)
        }
      }
    } catch (error) {
      console.error("Failed to fetch data from IndexedDB:", error)
    }
  }

  const addText = async (layer: any) => {
    const font = {
      name: layer.fontFamily,
      url: layer.fontURL,
    }

    await loadFonts([font])

    editor?.objects?.add(layer).then(() => {
      editor?.objects?.update({ ...layer })
    })
  }

  const addObjects = async (layers: any, canvasDim: any) => {
    if (layers) {
      layers.map((layer: ILayer) => {
        const bgObject =
          layer?.metadata?.type === backgroundLayerType ||
          layer.type === "BackgroundImage" ||
          layer?.metadata?.type === deviceUploadType

        if (bgObject) {
          const backgroundImg = editor?.frame?.background?.canvas?._objects.filter(
            (el: any) => el?.type === "BackgroundImage"
          )[0]
          editor.objects.removeById(backgroundImg?.id)
          editor.objects.unsetBackgroundImage()
          const options = {
            type: "BackgroundImage",
            // @ts-ignore
            src: layer.src,
            preview: layer.preview,
            metadata: { generationDate: new Date().getTime(), type: backgroundLayerType },
          }
          // Timeout works as a fix so canvas does not get dislocated

          editor.objects.add(options).then(() => {
            editor.objects.setAsBackgroundImage()
          })
        } else {
          if (layer.type === "StaticText") {
            addText(layer)
          } else {
            editor.objects.add(layer).then(() => {
              editor.objects.update({ top: layer.top, left: layer.left })
            })
          }
        }
      })
      editor.frame.resize({ width: canvasDim.width, height: canvasDim.height })

      if (canvasDim.bgColor != "#FFF") {
        const backgroundImg = editor?.frame?.background?.canvas?._objects.filter(
          (el: any) => el?.type === "BackgroundImage"
        )[0]
        if (backgroundImg) {
          editor.objects.removeById(backgroundImg.id)
          editor.objects.unsetBackgroundImage()
        }
        editor.frame.setBackgroundColor(canvasDim.bgColor)
      }
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
        let images = 0
        const data = currentScene.layers.filter((el) => el.id != "background")
        currentScene.layers.map((el) => {
          if (el.type === "StaticImage") {
            // @ts-ignore
            if (images < parseInt(el.name)) {
              // @ts-ignore
              images = parseInt(el.name)
            }
          }
        })
        const bgColor = editor?.frame?.background?.canvas?._objects[1].fill
        const canvasWidth = editor?.frame?.background?.canvas?._objects[1].width
        const canvasHeight = editor?.frame?.background?.canvas?._objects[1].height
        const canvasDim = {
          bgColor: bgColor,
          width: canvasWidth,
          height: canvasHeight,
        }
        saveData(data, canvasDim, images)
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

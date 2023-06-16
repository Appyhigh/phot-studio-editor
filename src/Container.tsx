import React, { useCallback, useContext, useEffect, useRef } from "react"
import ResizeObserver from "resize-observer-polyfill"
import useAppContext from "~/hooks/useAppContext"
import { getFonts } from "./store/slices/fonts/actions"
import { getPixabayResources } from "./store/slices/resources/actions"
import { useAppDispatch } from "./store/store"
import { useAuth } from "./hooks/useAuth"
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth"
import { auth } from "./utils/firebase"
import { useActiveObject, useEditor, useObjects } from "@layerhub-io/react"
import { ILayer } from "@layerhub-io/types"
import { backgroundLayerType, deviceUploadType } from "./constants/contants"
import { loadFonts } from "./utils/fonts"
import ImagesContext from "./contexts/ImagesCountContext"
import { IsFilterPresentMetadata } from "./views/DesignEditor/utils/functions/FilterFunc"
import { fabric } from "fabric"
import { applyLightImageEffect } from "./utils/canvasUtils"
import { SLIDER_TYPE } from "./views/DesignEditor/utils/enum"
import { UpdatedImgFunc } from "./views/DesignEditor/utils/functions/UpdatedImgFunc"
import { applyFilterFunc } from "./views/DesignEditor/utils/functions/tools/applyFilterFunc"
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

  const objects = useObjects()
  const { setImagesCt } = useContext(ImagesContext)
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
        setImagesCt(data ?? 0)
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

  const applyExtraFilter = async (layer: any) => {
    if (layer?.metadata?.general?.Highlight) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Highlight,
        SLIDER_TYPE.HIGHLIGHT
      )
       UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Highlight, "Highlight")
    }
    if (layer?.metadata?.general?.Lowlight) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Lowlight,
        SLIDER_TYPE.LOWLIGHT
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Lowlight, "Lowlight")
    }
    if (layer?.metadata?.general?.Temperature) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Temperature,
        SLIDER_TYPE.TEMPERATURE
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Temperature, "Temperature")
    }
    if (layer?.metadata?.general?.BlackWhite) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.BlackWhite,
        SLIDER_TYPE.BANDW
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.BlackWhite, "B&W")
    }
    if (layer?.metadata?.general?.Noir) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Noir,
        SLIDER_TYPE.NOIR
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Noir, "Noir")
    }
    if (layer?.metadata?.general?.Fade) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Fade,
        SLIDER_TYPE.FADE
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Fade, "Fade")
    }
    if (layer?.metadata?.general?.Mono) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Mono,
        SLIDER_TYPE.MONO
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Mono, "Mono")
    }

    if (layer?.metadata?.general?.A2I) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.A2I,
        SLIDER_TYPE.A2I
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.A2I, "A2I")
    }
    if (layer?.metadata?.general?.City) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.City,
        SLIDER_TYPE.CITY
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.City, "City")
    }
    if (layer?.metadata?.general?.Bliss) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Bliss,
        SLIDER_TYPE.BLISS
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Bliss, "Bliss")
    }

    if (layer?.metadata?.general?.Tonal) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Tonal,
        SLIDER_TYPE.TONAL
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Tonal, "Tonal")
    }
    if (layer?.metadata?.general?.Vintage) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Vintage,
        SLIDER_TYPE.VINTAGE
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Vintage, "Vintage")
    }
    if (layer?.metadata?.general?.HDR) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.HDR,
        SLIDER_TYPE.HDR
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.HDR, "HDR")
    }
    if (layer?.metadata?.general?.LOMO) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.LOMO,
        SLIDER_TYPE.LOMO
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.LOMO, "LOMO")
    }
    if (layer?.metadata?.general?.Matte) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Matte,
        SLIDER_TYPE.MATTE
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Matte, "Matte")
    }
    if (layer?.metadata?.general?.Film) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Film,
        SLIDER_TYPE.FILM
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Film, "Film")
    }

    if (layer?.metadata?.general?.Vibrant) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Vibrant,
        SLIDER_TYPE.VIBRANT
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Vibrant, "Vibrant")
    }
    if (layer?.metadata?.general?.Cool) {
      const data: any = await applyLightImageEffect(
        layer?.metadata?.originalLayerPreview ?? layer.preview,
        layer?.metadata?.general?.Cool,
        SLIDER_TYPE.COOLTONE
      )
      UpdatedImgFunc(data, editor, layer, layer?.metadata?.general?.Cool, "Cool")
    }
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
              // @ts-ignore

              if (layer.filters) {
                applyFilterFunc(layer, editor)
              } else {
                editor.objects.update({ top: layer.top, left: layer.left })
              }

              if (layer?.metadata?.general) {
                applyExtraFilter(layer)
              }
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
        const updatedData = data.map((each, _idx) => {
          const filters = editor.objects.findById(each?.id)[0].filters
          return { ...each, filters }
        })
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
        saveData(updatedData, canvasDim, images)
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

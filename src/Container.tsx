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

const Container = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile, setIsMobile } = useAppContext()
  const dispatch = useAppDispatch()
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
    dispatch(getUploads())
    dispatch(getPublicComponents())
    dispatch(getPixabayResources())
    dispatch(getPublicDesigns())
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

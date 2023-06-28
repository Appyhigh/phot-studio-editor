import { Context } from '../../../FabricCanvas/Canvas/CanvasContext'
import { useContext } from 'react'

function useCanvasContext() {
  const { zoomRatio, setZoomRatio, setCanvas, canvas, activeObject, setActiveObject } = useContext(Context)
  return {
    zoomRatio,
    setZoomRatio,
    setCanvas,
    canvas,
    activeObject,
    setActiveObject,
  }
}

export default useCanvasContext

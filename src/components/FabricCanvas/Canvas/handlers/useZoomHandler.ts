import { fabric } from 'fabric'
import { useCallback, useEffect } from 'react'
import useFabricEditor from '../../../../hooks/useFabricEditor'
function useZoomHandler() {
  const { fabricEditor: {canvas, zoomRatio} } = useFabricEditor()
  
  const updateZoom = useCallback(
    (zoomRatio: number) => {
      if (canvas) {
        canvas.zoomToPoint(new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2), zoomRatio)
      }
    },
    [canvas]
  )

  useEffect(() => {
    updateZoom(zoomRatio)
  }, [zoomRatio])
}

export default useZoomHandler

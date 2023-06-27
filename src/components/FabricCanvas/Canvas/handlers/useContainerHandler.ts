import { createRef, useCallback, useEffect } from 'react'
import useFabricEditor from '../../../../hooks/useFabricEditor';

function useContainerHandler() {
  const containerRef = createRef<HTMLDivElement>()
  const { fabricEditor: {canvas} } = useFabricEditor()
  const updateCanvasSize = useCallback(
    (x:any, y:any) => {
      if (canvas) {
        canvas.setHeight(y).setWidth(x)
        canvas.renderAll()
        // @ts-ignore
        const workarea = canvas.getObjects().find(obj => obj.id === 'workarea')
        if (workarea) {
          workarea.center()
        }
      }
    },
    [canvas]
  )
  useEffect(() => {
    const containerWidth = 650
    const containerHeight = 600
    // const containerWidth = containerRef.current.clientWidth
    // const containerHeight = containerRef.current.clientHeight
 
    updateCanvasSize(containerWidth, containerHeight)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas])

  return containerRef
}

export default useContainerHandler

import { useCallback, useEffect } from 'react'
import { isArrow, isCtrlShiftZ, isCtrlZ } from '../utils/keyboard'
import useFabricEditor from '../../../../hooks/useFabricEditor'
import useCoreHandler from './useCoreHandler'
function useEventHandlers() {

  const {fabricEditor, setFabricEditor} = useFabricEditor()
  const {removeObject} = useCoreHandler()
  const { canvas, activeObject } = fabricEditor
  /**
   * Canvas Mouse wheel handler
   */

  const onMouseWheel = useCallback(
    (event:any) => {
      if (canvas && event.e.ctrlKey) {
        const delta = event.e.deltaY
        let zoomRatio = canvas.getZoom()
        if (delta > 0) {
          zoomRatio -= 0.04
        } else {
          zoomRatio += 0.04
        }
        // setZoomRatio(zoomRatio)
        setFabricEditor({...fabricEditor, zoomRatio})
      }
      event.e.preventDefault()
      event.e.stopPropagation()
    },
    [canvas]
  )

  const onDeleteKey = useCallback((event:any) => {
    // Key codes for backspace and delete keys
    if (canvas) {
      canvas.remove(canvas.getActiveObject())
    }
  }, [canvas])

  useEffect(() => {
    if (canvas) {
      canvas.on('mouse:wheel', onMouseWheel)
    }
    return () => {
      if (canvas) {
        canvas.off('mouse:wheel', onMouseWheel)
      }
    }
  }, [canvas])

  /**
   * Canvas selection handlers
   */

  const onSelect = useCallback(
    ({ target }:any) => {
      if (target) {
        if (canvas) {
          setFabricEditor({...fabricEditor, activeObject: canvas.getActiveObject()})
        }
      } else {
        setFabricEditor({...fabricEditor, activeObject: null})
      }
    },
    [canvas]
  )

  


  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', onSelect)
      canvas.on('selection:cleared', onSelect)
      canvas.on('selection:updated', onSelect)
    }
    return () => {
      if (canvas) {
        canvas.off('selection:cleared', onSelect)
        canvas.off('selection:created', onSelect)
        canvas.off('selection:updated', onSelect)
      }
    }
  }, [canvas])

  /**
   * Keyboard Events Handler
   */

  const undo = useCallback(() => {
    // @ts-ignore
    canvas?.undo()
  }, [canvas])

  const redo = useCallback(() => {
    // @ts-ignore
    canvas?.redo()
  }, [canvas])

  const moveUp = useCallback(() => {
    if (activeObject && canvas) {
      activeObject.top = activeObject.top - 2
      activeObject.setCoords()
      canvas.requestRenderAll()
    }
  }, [activeObject, canvas])

  const moveDown = useCallback(() => {
    if (activeObject && canvas) {
      activeObject.top = activeObject.top + 2
      activeObject.setCoords()
      canvas.requestRenderAll()
    }
  }, [activeObject, canvas])

  const moveRight = useCallback(() => {
    if (activeObject && canvas) {
      activeObject.left = activeObject.left + 2
      activeObject.setCoords()
      canvas.requestRenderAll()
    }
  }, [activeObject, canvas])

  const moveLeft = useCallback(() => {
    if (activeObject && canvas) {
      activeObject.left = activeObject.left - 2
      activeObject.setCoords()
      canvas.requestRenderAll()
    }
  }, [activeObject, canvas])

  const onKeyDown = useCallback(
    (e:any) => {
      isCtrlZ(e) && undo()
      isCtrlShiftZ(e) && redo()
      if (isArrow(e)) {
        e.code === 'ArrowLeft' && moveLeft()
        e.code === 'ArrowRight' && moveRight()
        e.code === 'ArrowDown' && moveDown()
        e.code === 'ArrowUp' && moveUp()
      }
    },
    [canvas, activeObject]
  )
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keydown', onDeleteKey)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keydown', onDeleteKey)

    }
  }, [canvas, activeObject])
}

export default useEventHandlers

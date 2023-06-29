import { useEffect, useState } from 'react'
import useFabricEditor from '../../../../hooks/useFabricEditor'
const useObjects = () => {
  const { fabricEditor, setFabricEditor } = useFabricEditor()
  const { canvas } = fabricEditor
  const [layers, setLayers] = useState()

  useEffect(() => {
    if (canvas) {
      // console.log('workArea: ', canvas.getObjects())
      canvas.on('object:added', onChanged)
      canvas.on('object:removed', onChanged)

      return () => {
        canvas.off('object:added', onChanged)
        canvas.off('object:removed', onChanged)
      }
    }
  }, [canvas])

  const onChanged = (event: any) => {
    setFabricEditor({
      ...fabricEditor,
      objects: canvas.getObjects(),
    })
  }

  return { layers }
}

export default useObjects

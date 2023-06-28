import { atom, useAtom } from "jotai"
import canvasAtom from "src/store/canvasAtom"

const useEditor = () => {
  const [fabricEditor, setFabricEditor] = useAtom(canvasAtom)

  return { fabricEditor, setFabricEditor }
}

export default useEditor

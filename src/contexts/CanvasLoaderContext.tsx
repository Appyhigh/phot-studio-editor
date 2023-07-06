import { createContext } from "react"

const CanvasLoaderContext = createContext({
  canvasLoader: false,
  setCanvasLoader: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
})
export default CanvasLoaderContext

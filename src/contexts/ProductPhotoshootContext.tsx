import { createContext } from "react"

const ProductPhotoshootContext = createContext({
  productPhotoshootInfo: {
    src: "",
    preview: "",
    tooltip: false,
    prompt: "",
    result: [],
    finalImage: "",
    again: false,
    prevObjects: [],
    addPreview: "",
    removeBg: false,
    isError:false
  },
  setProductPhotoshootInfo: (item: any) => {
    console.log("Dummy Intializer for ", item)
  },
})

export default ProductPhotoshootContext

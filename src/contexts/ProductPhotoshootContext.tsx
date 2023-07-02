import { createContext } from "react"

const ProductPhotoshootContext = createContext({
  productPhotoshootInfo: {
    src: "",
    preview: "",
    tooltip: false,
    result: [],
    finalImage: "",
  },
  setProductPhotoshootInfo: (item: any) => {
    console.log("Dummy Intializer for ", item)
  },
})

export default ProductPhotoshootContext

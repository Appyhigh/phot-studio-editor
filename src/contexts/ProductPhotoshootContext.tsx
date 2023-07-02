import { createContext } from "react"

const ProductPhotoshootContext = createContext({
  productPhotoshootInfo: {
    src: "",
    preview: "",
    result: [],
  },
  setProductPhotoshootInfo: (item: any) => {
    console.log("Dummy Intializer for ", item)
  },
})

export default ProductPhotoshootContext

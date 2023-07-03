import { createContext } from "react"

const ProductPhotoshootContext = createContext({
  productPhotoshootInfo: {
    src: "",
    preview: "",
    tooltip: false,
    input_image: "",
    prompt: "",
    result: [],
    finalImage: "",
  },
  setProductPhotoshootInfo: (item: any) => {
    console.log("Dummy Intializer for ", item)
  },
})

export default ProductPhotoshootContext

import { createContext } from "react"

const SampleImagesContext = createContext({
  sampleImages: {
    sampleImages: [],
    bgRemover: [],
    imageUpscaler: [],
    photoEditor: [],
    imageColorizer: [],
    bgRemoverBgOptions: [],
    objectRemover:[],
    objectReplacer:[],
    productPhotoshoot:[],
    productPhotoshootOptions:[]
  },
  setSampleImages: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
})

export default SampleImagesContext

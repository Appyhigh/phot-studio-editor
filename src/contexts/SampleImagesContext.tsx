import { createContext } from "react"

const SampleImagesContext = createContext({
  sampleImages: {
    sampleImages: [],
    bgRemover: [],
    imageUpscaler: [],
    photoEditor: [],
    imageColorizer: [],
  },
  setSampleImages: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
})

export default SampleImagesContext

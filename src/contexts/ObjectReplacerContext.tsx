import React from "react"

const ObjectReplacerContext = React.createContext({
  objectReplacerInfo: {
    inputImage:"",
    fileName:"",
    prompt:"",
    maskImage:"",
    src: "",
    preview: "",
    result: "",
  },
  setObjectReplacerInfo: (item: any) => {
    console.log("Dummy Intializer for ", item)
  },
})

export default ObjectReplacerContext
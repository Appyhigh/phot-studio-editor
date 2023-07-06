import React from "react"

const ObjectReplacerContext = React.createContext({
  objectReplacerInfo: {
    inputImage:"",
    file_name:"",
    prompt:"",
    mask_img:"",
    src: "",
    preview: "",
    result: "",
    width:0,
    height:0
  },
  setObjectReplacerInfo: (item: any) => {
    console.log("Dummy Intializer for ", item)
  },
})

export default ObjectReplacerContext
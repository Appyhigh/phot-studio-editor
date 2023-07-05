import React from "react"

const ObjectRemoverContext = React.createContext({
  objectRemoverInfo: {
    src: "",
    preview: "",
    result: "",
    mask_img:"",
    file_name:"",
    width:0,
    height:0
  },
  setObjectRemoverInfo: (item: any) => {
    console.log("Dummy Intializer for ", item)
  },
})

export default ObjectRemoverContext

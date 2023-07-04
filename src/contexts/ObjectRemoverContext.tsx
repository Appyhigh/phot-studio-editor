import React from "react"

const ObjectRemoverContext = React.createContext({
  objectRemoverInfo: {
    src: "",
    preview: "",
    result: "",
  },
  setObjectRemoverInfo: (item: any) => {
    console.log("Dummy Intializer for ", item)
  },
})

export default ObjectRemoverContext
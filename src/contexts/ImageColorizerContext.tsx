import React from "react"

const ImageColorizerContext = React.createContext({
  ImgColorizerInfo: {
    type: "",
    id: "",
    src: "",
    original: "",
    resultImages: [],
    isError:false
  },
  ImgColorizerPanelInfo: {
    uploadSection: true,
    trySampleImg: true,
    uploadPreview: false,
    resultOption: false,
    tryFilters: false,
  },
  setImgColorizerInfo: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
  setImgColorizerPanelInfo: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
})

export default ImageColorizerContext

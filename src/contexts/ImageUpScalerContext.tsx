import React from "react"
const ImageUpScalerContext = React.createContext({
  imgScalerInfo: {
    id: "",
    src: "",
    original: "",
    scaler: 2,
    result:[]
  },
  imgScalerPanelInfo: {
    uploadSection: true,
    trySampleImg: true,
    uploadPreview: false,
    resultSectionVisible:false
  },
  setImgScalerInfo: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
  setImgScalerPanelInfo: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
})

export default ImageUpScalerContext;

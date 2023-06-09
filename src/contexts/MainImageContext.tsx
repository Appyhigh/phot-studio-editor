import React from "react"

const MainImageContext = React.createContext({
  mainImgInfo: {
    type: "",
    id: "",
    src: "",
    url: "",
    preview: "",
    original:"",
    metadata: {},
    swiper_option_selected:false,
    swiper_selected_Color:""
  },
  panelInfo: {
    uploadSection: true,
    trySampleImg: true,
    uploadPreview: false,
    bgOptions: false,
    bgRemoverBtnActive:false
  },
  setMainImgInfo: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
  setPanelInfo: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
})

export default MainImageContext

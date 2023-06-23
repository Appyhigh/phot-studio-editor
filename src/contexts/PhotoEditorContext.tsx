import React from "react"
const PhotoEditorContext = React.createContext({
  photoEditorInfo: {
    src: "",
    original: "",
    prompt: "",
    images_generation_ct: 1,
    result: [],
    showclearTooltip: false,
  },
  photoEditorPanelInfo: {
    uploadSection: true,
    trySampleImg: true,
    uploadPreview: false,
    resultSectionVisible: false,
  },
  setPhotoEditorInfo: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
  setPhotoEditorPanelInfo: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
})

export default PhotoEditorContext

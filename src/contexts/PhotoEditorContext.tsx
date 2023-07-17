import React from "react"
const PhotoEditorContext = React.createContext({
  photoEditorInfo: {
    id: "",
    src: "",
    original: "",
    prompt: "",
    images_generation_ct: 1,
    result: [],
    showclearTooltip: false,
    isError:false
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

import React from "react"

const TextToArtContext = React.createContext({
  textToArtInputInfo: {
    prompt: "",
    style: [],
    images_generation_ct: 0,
    image_wt: 0,
    uploaded_img: {},
    negative_prompt: [],
    cfg_scale: 0,
    aspect_ratio: { x: "", y: "" },
  },
  textToArtpanelInfo: {
    resultSectionVisible: false,
    resultImages: [],
  },
  setTextToArtInputInfo: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
  setTextToArtPanelInfo: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
  styleImage: new Set<string>(),
  setStyleImage: (styleImage: any) => {
    console.log("Dummy Initializer for ", styleImage)
  },
  result: [],
  setResult: (result: any) => {
    console.log("Dummy Initializer for ", result)
  },
})

export default TextToArtContext

import React from "react"

const TextToArtContext = React.createContext({
  textToArtInputInfo: {
    prompt: "",
    style: [],
    images_generation_ct: 2,
    image_wt: 0,
    uploaded_img:"",
    negative_prompt_visible:false,
    negative_prompt: "",
    cfg_scale: 0,
    aspect_ratio: { x: 1, y: 2 },
    showclearTooltip:false
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

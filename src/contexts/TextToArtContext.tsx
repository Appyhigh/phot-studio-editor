import React from "react"

const TextToArtContext = React.createContext({
  textToArtInputInfo: {
    id: "",
    prompt: "",
    style: [],
    images_generation_ct: 1,
    image_wt: 5.6,
    uploaded_img: "",
    negative_prompt_visible: false,
    negative_prompt: "",
    cfg_scale: 7.5,
    aspect_ratio: "1:1",
    showclearTooltip: false,
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

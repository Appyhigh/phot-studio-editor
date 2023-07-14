import React from "react"
export const PollingInterval = React.createContext({
  pollingIntervalInfo: {
    bgRemover: 0,
    textToArt: 0,
    imageUpscaler: 0,
    photoEditor: 0,
    imageColorizer: 0,
    objectRemover: 0,
    objectReplacer: 0,
    productPhotoShoot: 0,
    
  },

  setPollingIntervalInfo: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
})

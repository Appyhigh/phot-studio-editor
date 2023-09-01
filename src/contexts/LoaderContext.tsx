import React from "react"

const LoaderContext = React.createContext({
  loaderPopup: false,
  blinkInOutLoader: false,
  setLoaderPopup: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
  setBlinkInOutLoader: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
})
export default LoaderContext

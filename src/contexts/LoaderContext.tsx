import React from "react"

const LoaderContext = React.createContext({
  loaderPopup: {
    showPopup: false,
  },
  setLoaderPopup: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
})
export default LoaderContext

import React from "react"

const LoaderContext = React.createContext({
  loaderPopup: false,
  setLoaderPopup: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },
})
export default LoaderContext

import React from "react"

const ErrorContext = React.createContext({
    errorInfo: {
        showError: false,
        errorMsg: "",  
        retryFn: () => {},

      },
  setErrorInfo: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },

})

export default ErrorContext;
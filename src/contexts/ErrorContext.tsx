import React from "react"

// interface MyContextType {
//   errorInfo:any
//   setErrorInfo:any
//   ErrortimeOut: number;
//   setErrortimeOut: React.Dispatch<React.SetStateAction<number>>;
// }

const ErrorContext = React.createContext({
    errorInfo: {
        showError: false,
        errorMsg: "",  
        retryFn: () => {},
        timer:0,
      },
  setErrorInfo: (item: any) => {
    console.log("Dummy Initializer for ", item)
  },

})

export default ErrorContext;
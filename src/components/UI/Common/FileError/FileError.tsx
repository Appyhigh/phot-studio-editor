import Alert from "~/components/Icons/Alert"
import classes from "./style.module.css"
import { useEffect } from "react"

const FileError = ({ ErrorMsg, displayError }: any) => {
  useEffect(() => {
    if (displayError == false) {
      document.getElementById("this")!.style.opacity = "0"
      document.getElementById("this")!.style.maxHeight = "0rem"
      document.getElementById("this")!.style.padding = "0rem 0.5rem"
      document.getElementById("this")!.style.border = "0rem"
    } else {
      document.getElementById("this")!.style.opacity = "1"
      document.getElementById("this")!.style.maxHeight = "10rem"
      document.getElementById("this")!.style.padding = "0.8rem 0.5rem"
      document.getElementById("this")!.style.border = "1px solid #f5c2c7"
    }
  }, [displayError])
  return (
    <div id="this" className={classes.errorMsgSectionSize}>
      <div>
        <Alert size={24} />
      </div>
      <p>{ErrorMsg}</p>
    </div>
  )
}

export default FileError

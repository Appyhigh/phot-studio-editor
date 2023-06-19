import Alert from "~/components/Icons/Alert"
import classes from "./style.module.css"
import { useEffect } from "react"

const FileError = ({ ErrorMsg }: any) => {
  return (
    <div className={classes.errorMsgSectionSize}>
      <div>
        <Alert size={24} />
      </div>
      <p>{ErrorMsg}</p>
    </div>
  )
}

export default FileError

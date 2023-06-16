import classes from "./style.module.css"
import Icons from "~/components/Icons"

const FileError = ({ErrorMsg}:any) => {
  return (
    <div className={classes.errorMsgSectionSize}>
        <Icons.Alert size={24}/>
      <p>{ErrorMsg}</p>
    </div>
  )
}

export default FileError

import classes from "./style.module.css"

const FileError = ({handleTry}:any) => {
  return (
    <div className={classes.errorMsgSection}>
      <p>Wrong format file uploaded , Please upload an image in JPEG , PNG or BMP format</p>
      <button  className={classes.tryAgainBtn} onClick={()=>{
        handleTry()
      }}>
        Try Again 
      </button>
    </div>
  )
}

export default FileError

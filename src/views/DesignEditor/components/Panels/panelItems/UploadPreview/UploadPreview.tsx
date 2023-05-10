import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"


const UploadPreview = ({ upload, selectedImage, discardHandler }: any) => {

  return (
    <div>
      <Block className={classes.uploadPreviewContainer}>
        <Icons.InputContainer />
      </Block>
      <Block className={clsx(classes.uploadPreview, "flex-center flex-column ")}>
        <img className={classes.uploadedImg} src={upload.preview ? upload.preview : upload.url} alt="preview" />

        {selectedImage === upload.preview && (
          <Block className={clsx("p-absolute", classes.discardBtn)}>
            <span onClick={discardHandler}>
              <Icons.Trash size={"32"} />
            </span>
          </Block>
        )}
      </Block>
      {selectedImage === upload.preview && <button className={classes.removeBgBtn}>Remove Background</button>}
    </div>
  )
}

export default UploadPreview

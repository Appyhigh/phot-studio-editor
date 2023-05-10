import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import GooglePhotos from "../../../views/Public/images/google-photos.svg"
import classes from "./style.module.css"
import clsx from "clsx"

const UploadInput = ({ handleInputFileRefClick }: any) => {
  return (
    <>
      <Block
        className={clsx("d-flex justify-content-center flex-column pointer p-relative", classes.uploadInputSection)}
        onClick={handleInputFileRefClick}
      >
        <Block className={classes.uploadInputContainer}>
          <Icons.InputContainer />
        </Block>

        <Block className="d-flex flex-column p-absolute w-100">
          <Block className={classes.uploadIcon}>
            <Icons.Upload size={31} />
          </Block>
          <Block className={clsx("text-center", classes.uploadText)}>
            Drag and drop your image or
            <p>click to browse</p>
            <Block className={clsx(classes.lineWithText, "text-center w-80")}>
              <span>Or</span>
            </Block>
          </Block>
          <Block className="d-flex flex-row justify-content-center">
            <Block className={classes.iconWrapper}>
              <Icons.GoogleDrive />
            </Block>
            <Block className={classes.iconWrapper}>
              <img src={GooglePhotos} />
            </Block>
            <Block className={classes.iconWrapper}>
              <Icons.DropBox />
            </Block>
            <Block className={classes.iconWrapper}>
              <Icons.Phone />
            </Block>
          </Block>
        </Block>
      </Block>
    </>
  )
}

export default UploadInput

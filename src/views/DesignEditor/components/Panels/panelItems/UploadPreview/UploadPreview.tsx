import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { useEditor } from "@layerhub-io/react"
import { toDataURL } from "~/utils/export"

const UploadPreview = ({ upload, selectedImage, discardHandler, handleOpenBgOptions }: any) => {
  const editor = useEditor()

  const removeBackgroundHandler = () => {
    toDataURL(
      "https://ik.imagekit.io/rxld8u68i/removed-background.jpeg?updatedAt=1682652974131",
      function (dataUrl: string) {
        const options = {
          type: "StaticImage",
          src: dataUrl,
          preview: dataUrl,
          metadata: { generationDate: new Date().getTime() },
        }
        editor.objects.add(options).then(() => {
          handleOpenBgOptions()
          editor.objects.removeById(selectedImage.id)
        })
      }
    )
  }

  return (
    <div>
      <Block className={classes.uploadPreviewContainer}>
        <Icons.InputContainer />
      </Block>
      <Block className={clsx(classes.uploadPreview, "flex-center flex-column ")}>
        <img className={classes.uploadedImg} src={upload.preview ? upload.preview : upload.url} alt="preview" />

        {selectedImage?.preview === upload.preview && (
          <Block className={clsx("p-absolute", classes.discardBtn)}>
            <span onClick={discardHandler}>
              <Icons.Trash size={"32"} />
            </span>
          </Block>
        )}
      </Block>
      {selectedImage?.preview === upload.preview && (
        <button onClick={removeBackgroundHandler} className={classes.removeBgBtn}>
          Remove Background
        </button>
      )}
    </div>
  )
}

export default UploadPreview

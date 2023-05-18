import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { useEditor } from "@layerhub-io/react"
import { useContext } from "react"
import LoaderContext from "~/contexts/LoaderContext"
import { removeBackgroundController } from "~/utils/removeBackground"

const UploadPreview = ({
  upload,
  selectedImage,
  discardHandler,
  handleOpenBgOptions,
  removeBgBtn,
  disableRemoveBgBtn,
}: any) => {
  const editor = useEditor()
  const { setLoaderPopup } = useContext(LoaderContext)

  const removeBackgroundHandler = async () => {
    try {
      // Start the loader
      setLoaderPopup(true)

      removeBackgroundController(upload.src, (image: string) => {
        // Add the resultant image to the canvas
        const options = {
          type: "StaticImage",
          src: image,
          preview: image,
          metadata: { generationDate: new Date().getTime(), originalLayerPreview: image },
        }
        editor.objects.add(options).then(() => {
          handleOpenBgOptions()
          editor.objects.removeById(selectedImage.id)
          // Stop the loader
          setLoaderPopup(false)
          disableRemoveBgBtn()
        })
      })
    } catch (error: any) {
      setLoaderPopup(false)
      console.log("Something went wrong while removing background...", error.message)
    }
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
        <button
          disabled={removeBgBtn ? false : true}
          onClick={() => {
            removeBackgroundHandler()
          }}
          className={clsx(classes.removeBgBtn, !removeBgBtn && classes.disabledBtn)}
        >
          Remove Background
        </button>
      )}
    </div>
  )
}

export default UploadPreview

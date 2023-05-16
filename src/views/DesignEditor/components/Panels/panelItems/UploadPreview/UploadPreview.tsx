import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { useEditor } from "@layerhub-io/react"
import { useContext } from "react"
import LoaderContext from "~/contexts/LoaderContext"
import { removeBackgroundWithoutPromps } from "~/services/backgroundRemover-tools-service"
import { removeBackgroundUsingMask } from "~/utils/removeBackground"
import { DEFAULT_DIMENSIONS } from "~/utils/common"

const UploadPreview = ({ upload, selectedImage, discardHandler, handleOpenBgOptions }: any) => {
  const editor = useEditor()
  const { setLoaderPopup } = useContext(LoaderContext)

  const removeBackgroundHandler = async () => {
    try {
      // Start the loader
      setLoaderPopup(true)
      // Get the black and white masked image
      const result_image = await removeBackgroundWithoutPromps(upload.src, "layer" || "")

      if (result_image.output_image) {
        // Get the image with removed background
        removeBackgroundUsingMask({
          sourceImage: upload.src || "",
          maskImage: result_image.output_image,
          canvasStyling: {
            width: DEFAULT_DIMENSIONS.width,
            height: DEFAULT_DIMENSIONS.height,
            ratioedWidth: DEFAULT_DIMENSIONS.width,
            ratioedHeight: DEFAULT_DIMENSIONS.height,
          },
          outputHandler: (image: string) => {
            // Add the resultant image to the canvas
            const options = {
              type: "StaticImage",
              src: image,
              preview: image,
              metadata: { generationDate: new Date().getTime() },
            }
            editor.objects.add(options).then(() => {
              handleOpenBgOptions()
              editor.objects.removeById(selectedImage.id)
              // Stop the loader
              setLoaderPopup(false)
            })
          },
        })
      }
    } catch (error: any) {
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
          onClick={() => {
            removeBackgroundHandler()
          }}
          className={classes.removeBgBtn}
        >
          Remove Background
        </button>
      )}
    </div>
  )
}

export default UploadPreview

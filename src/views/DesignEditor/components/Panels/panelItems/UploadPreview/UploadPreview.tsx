import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { useEditor } from "@layerhub-io/react"
import { useContext } from "react"
import LoaderContext from "~/contexts/LoaderContext"
import { removeBackgroundController } from "~/utils/removeBackground"
import MainImageContext from "~/contexts/MainImageContext"
import { nanoid } from "nanoid"

const UploadPreview = ({ discardHandler }: any) => {
  const editor = useEditor()
  const { setLoaderPopup } = useContext(LoaderContext)
  const { mainImgInfo, setMainImgInfo, panelInfo, setPanelInfo } = useContext(MainImageContext)
  const removeBackgroundHandler = async () => {
    try {
      // Start the loader
      setLoaderPopup(true)

      removeBackgroundController(mainImgInfo.src, (image: string) => {
        // Add the resultant image to the canvas
        const options = {
          type: "StaticImage",
          src: image,
          preview: image,
          id: nanoid(),
          metadata: { generationDate: new Date().getTime() },
        }
        editor.objects.add(options).then(() => {
          // @ts-ignore
          setPanelInfo((prev) => ({
            ...prev,
            bgOptions: true,
            bgRemoverBtnActive: false,
            uploadSection: false,
            trySampleImg: false,
          }))
          editor.objects.removeById(mainImgInfo.id)
          setMainImgInfo((prev: any) => ({ ...prev, ...options }))
          // Stop the loader
          setLoaderPopup(false)
        })
      })
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
        <img
          className={classes.uploadedImg}
          src={mainImgInfo.original ? mainImgInfo.original : mainImgInfo.url}
          alt="preview"
        />

        {
          <Block className={clsx("p-absolute", classes.discardBtn)}>
            <span onClick={discardHandler}>
              <Icons.Trash size={"32"} />
            </span>
          </Block>
        }
      </Block>

      {
        <button
          disabled={panelInfo.bgRemoverBtnActive ? false : true}
          onClick={() => {
            removeBackgroundHandler()
          }}
          className={clsx(classes.removeBgBtn, !panelInfo.bgRemoverBtnActive && classes.disabledBtn)}
        >
          Remove Background
        </button>
      }
    </div>
  )
}

export default UploadPreview

import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import DropdownWrapper from "./DropdownWrapper"
import { ObjectLayerOption } from "~/views/DesignEditor/utils/ObjectLayerOptions"
import React, { useCallback, useContext, useState } from "react"
import Scrollable from "~/components/Scrollable"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import ColorPicker from "~/components/UI/ColorPicker/ColorPicker"
import { changeLayerFill } from "~/utils/updateLayerBackground"
import UploadImgModal from "~/components/UI/UploadImgModal/UploadImgModal"
import LoaderContext from "~/contexts/LoaderContext"
import { removeBackgroundController } from "~/utils/removeBackground"
import MainImageContext from "~/contexts/MainImageContext"
import { nanoid } from "nanoid"

const ObjectLayer = ({ showLayer, handleClose }: any) => {
  const [activeState, setActiveState] = useState(-1)
  const [objectBgColor, setObjectBgColor] = useState("#000000")
  const [isOpen, setIsOpen] = React.useState(false)
  const [isReplacePopup, setIsReplacePopup] = useState(false)
  const [activeOb, setActiveOb] = useState<any>()
  const { mainImgInfo, setMainImgInfo, setPanelInfo } = useContext(MainImageContext)

  const handleActiveState = (idx: number) => {
    if (idx == activeState) {
      setActiveState(-1)
    } else setActiveState(idx)
  }
  function close() {
    setIsOpen(false)
  }

  const handleUpdatePopup = () => {
    setIsReplacePopup(false)
  }

  const editor = useEditor()
  const activeObject: any = useActiveObject()
  const { setLoaderPopup } = useContext(LoaderContext)
  const colors = ["#FF6BB2", "#B69DFF", "#30C5E5", "#7BB872", "#49A8EE", "#3F91A2", "#DA4F7A", "#FFFFFF"]

  const handleChangeBg = useCallback(
    async (each: any) => {
      let inputImage

      // If layer contains the originalImage then send it in changeLayerFill or else send the preview after removing background
      if (activeObject?.metadata?.originalLayerPreview) {
        inputImage = activeObject?.metadata?.originalLayerPreview
        changeBGFillHandler(inputImage, each.color)
      } else {
        removeBackgroundBeforeChangingColor(each)
      }
    },
    [activeObject]
  )

  const eraseHandler = () => {
    if (activeObject?.id === mainImgInfo.id) {
      // @ts-ignore
      setPanelInfo((prev) => ({
        ...prev,
        uploadSection: true,
        trySampleImg: true,
        uploadPreview: false,
        bgOptions: false,
        bgRemoverBtnActive: false,
      }))
      setMainImgInfo((prev: any) => ({ ...prev, id: "" }))
    }
    editor.objects.remove(activeObject?.id)
  }

  const changeBGFillHandler = async (inputImg: string, BG: string) => {
    const previewWithUpdatedBackground: any = await changeLayerFill(
      activeObject?.metadata?.originalLayerPreview ?? inputImg,
      BG
    )
    const options = {
      type: "StaticImage",
      src: previewWithUpdatedBackground,
      preview: previewWithUpdatedBackground,
      id: nanoid(),
      metadata: {
        generationDate: activeObject?.metadata?.generationDate ?? new Date().getTime(),
        originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? inputImg,
      },
    }
    editor.objects.add(options).then(() => {
      const activeMainObject = editor.objects.findById(mainImgInfo.id)[0]
      setLoaderPopup(false)
      if (activeObject?.id === activeMainObject?.id) {
        setMainImgInfo((prev: any) => ({ ...prev, ...options }))
      }
      editor.objects.removeById(activeObject?.id)
    })
  }

  const removeBackgroundBeforeChangingColor = async (each: any) => {
    try {
      setLoaderPopup(true)
      removeBackgroundController(activeObject.preview, async (image: string) => {
        setPanelInfo((prev: any) => ({
          ...prev,
          bgOptions: true,
          bgRemoverBtnActive: false,
          uploadSection: false,
          trySampleImg: false,
          uploadPreview: false,
        }))
        changeBGFillHandler(image, each.color)
      })
    } catch (error: any) {
      setLoaderPopup(false)
      console.log("Something went wrong while removing background...", error.message)
    }
  }

  const removeBackgroundHandler = async () => {
    try {
      // Start the loader
      setLoaderPopup(true)

      removeBackgroundController(activeObject.preview, (image: string) => {
        // Add the resultant image to the canvas
        const options = {
          type: "StaticImage",
          src: image,
          preview: image,
          id: nanoid(),
          metadata: {
            generationDate: activeObject?.metadata?.generationDate ?? new Date().getTime(),
            originalLayerPreview: image,
          },
        }
        editor.objects.add(options).then(() => {
          // @ts-ignore
          setPanelInfo((prev) => ({
            ...prev,
            bgOptions: true,
            bgRemoverBtnActive: false,
            uploadSection: false,
            trySampleImg: false,
            uploadPreview: false,
          }))
          if (activeObject?.id === mainImgInfo?.id) {
            setMainImgInfo((prev: any) => ({ ...prev, ...options }))
          }
          editor.objects.removeById(activeObject.id)
          // Stop the loader
          setLoaderPopup(false)
        })
      })
    } catch (error: any) {
      setLoaderPopup(false)
      console.log("Something went wrong while removing background...", error.message)
    }
  }

  return showLayer ? (
    <Scrollable>
      <div className={classes.objectLayerSection}>
        <div
          className="d-flex justify-content-start flex-row align-items-center pointer mt-1"
          onClick={() => {
            handleClose()
          }}
        >
          <Icons.ChevronRight size="16" /> <div className={clsx(classes.panelHeading, "ml-1")}>Object</div>
        </div>
        <div>
          <div className={clsx(classes.layerSubSection, "flex-center mt-3")}>
            <div
              className={clsx(classes.box, "d-flex justify-content-center align-items-center flex-column mr-1 pointer")}
              onClick={() => {
                setActiveOb(activeObject)
                setIsReplacePopup(true)
              }}
            >
              <Icons.Image />
              <p>Replace</p>
            </div>
            <div
              className={clsx(
                classes.box,
                " pointer d-flex justify-content-center align-items-center flex-column ml-1"
              )}
              // @ts-ignore
              onClick={() => eraseHandler()}
            >
              <Icons.TrashIcon size={"20"} />
              <p>Erase</p>
            </div>{" "}
          </div>
          <div className={clsx(classes.modifierSection, classes.panelSubHeading, "mb-2")}>Modifiers</div>
          {ObjectLayerOption.map((each, idx) => (
            <DropdownWrapper
              key={idx}
              icon={each.icon}
              activeState={activeState}
              idx={idx}
              heading={each.name}
              handleActiveState={handleActiveState}
            />
          ))}
        </div>
        <div className={clsx(classes.panelSubHeading, "my-2")}>Colors</div>
        <div className={classes.colorsWrapper}>
          {colors.map((each, idx) => {
            return (
              <div
                key={idx}
                style={{ backgroundColor: each, border: idx == colors.length - 1 ? "1px solid #92929D" : "" }}
                className={clsx(classes.colorOption, "flex-center")}
                onClick={() => {
                  if (idx === colors.length - 1) {
                    setIsOpen(true)
                  } else {
                    handleChangeBg({ color: each })
                  }
                }}
              >
                {idx === colors.length - 1 && (
                  <div>
                    {" "}
                    <Icons.ColorPlus />{" "}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <ColorPicker
          inputColor={objectBgColor}
          isOpen={isOpen}
          handleClose={close}
          type="object"
          handleChangeBg={handleChangeBg}
        />

        <div className={clsx(classes.panelSubHeading, "my-2")}>Other tools</div>
        <div className={classes.otherToolsWrapper}>
          <div
            onClick={removeBackgroundHandler}
            className={clsx(
              classes.otherToolsBox,
              "d-flex  pointer justify-content-center align-items-center flex-column mr-1 mb-1"
            )}
          >
            <Icons.Image />
            <p>Remove Background</p>
          </div>
          {[1, 2, 3].map((each, idx) => (
            <div
              key={idx}
              className={clsx(
                classes.otherToolsBox,
                "d-flex  pointer justify-content-center align-items-center flex-column mr-1 mb-1"
              )}
            >
              <Icons.Image />
              <p>Tool</p>
            </div>
          ))}
        </div>
      </div>
      <UploadImgModal
        activeOb={activeOb}
        fileInputType="update"
        isOpen={isReplacePopup}
        handleClose={handleUpdatePopup}
      />
    </Scrollable>
  ) : null
}

export default ObjectLayer

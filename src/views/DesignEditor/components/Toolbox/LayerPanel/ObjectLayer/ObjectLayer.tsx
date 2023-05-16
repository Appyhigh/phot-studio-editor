import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import DropdownWrapper from "./DropdownWrapper"
import { ObjectLayerOption } from "~/views/DesignEditor/utils/ObjectLayerOptions"
import React, { useCallback, useState } from "react"
import Scrollable from "~/components/Scrollable"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import ColorPicker from "~/components/UI/ColorPicker/ColorPicker"
import { toDataURL } from "~/utils/export"
import { changeLayerBackgroundImage, changeLayerFill } from "~/utils/updateLayerBackground"
import UploadImgModal from "~/components/UI/UploadImgModal/UploadImgModal"

const ObjectLayer = ({ showLayer, handleClose }: any) => {
  const [activeState, setActiveState] = useState(-1)
  const [objectBgColor, setObjectBgColor] = useState("#000000")
  const [isOpen, setIsOpen] = React.useState(false)
  const [isReplacePopup, setIsReplacePopup] = useState(false)

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
  const activeObject = useActiveObject()

  const colors = ["#FF6BB2", "#B69DFF", "#30C5E5", "#7BB872", "#49A8EE", "#3F91A2", "#DA4F7A", "#FFFFFF"]
  const handleChangeBg = useCallback(
    async (each: any) => {
      editor.objects.removeById(activeObject?.id)
      if (each.color) {
        const previewWithUpdatedBackground: any = await changeLayerFill(
          activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
          each.color
        )
        const options = {
          type: "StaticImage",
          src: previewWithUpdatedBackground,
          preview: previewWithUpdatedBackground,
          metadata: {
            generationDate: new Date().getTime(),
            originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
          },
        }
        editor.objects.add(options)
      } else if (each.img) {
        toDataURL(each.img, async function (dataUrl: string) {
          const previewWithUpdatedBackground: any = await changeLayerBackgroundImage(
            activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
            dataUrl
          )
          const options = {
            type: "StaticImage",
            src: previewWithUpdatedBackground,
            preview: previewWithUpdatedBackground,
            metadata: {
              generationDate: new Date().getTime(),
              originalLayerPreview: activeObject?.metadata?.originalLayerPreview ?? activeObject.preview,
            },
          }
          editor.objects.add(options)
        })
      }
    },
    [activeObject]
  )
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
              onClick={()=>setIsReplacePopup(true)}
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
              onClick={() => editor.objects.remove(activeObject?.id)}
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
        <ColorPicker inputColor={objectBgColor} isOpen={isOpen} handleClose={close} type="object" />

        <div className={clsx(classes.panelSubHeading, "my-2")}>Other tools</div>
        <div className={classes.otherToolsWrapper}>
          {[1, 2, 3, 4].map((each, idx) => (
            <div
              key={idx}
              className={clsx(
                classes.otherToolsBox,
                "d-flex  pointer justify-content-center align-items-center flex-column mr-1 mb-1"
              )}
            >
              <Icons.Image />
              <p>Remove Background</p>
            </div>
          ))}
        </div>
      </div>
      <UploadImgModal type="update" isOpen={isReplacePopup} handleClose={handleUpdatePopup} />
    </Scrollable>
  ) : null
}

export default ObjectLayer

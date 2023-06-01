import Scrollable from "~/components/Scrollable"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import clsx from "clsx"
import React, { useEffect, useState } from "react"
import ColorPicker from "~/components/UI/ColorPicker/ColorPicker"
import { useEditor, useFrame } from "@layerhub-io/react"
import { backgroundLayerType, checkboxBGUrl, deviceUploadType } from "~/constants/contants"
import UploadImgModal from "~/components/UI/UploadImgModal/UploadImgModal"
import { EraseBgFunc } from "~/views/DesignEditor/utils/functions/EraseBgFunc"

const BgLayer = ({ showLayer, handleClose }: any) => {
  const [activeState, setActiveState] = useState(-1)
  const [bgColor, setBGColor] = useState("#ffffff")
  const [isOpen, setIsOpen] = React.useState(false)
  const editor = useEditor()
  const [isReplacePopup, setIsReplacePopup] = useState(false)
  const frame = useFrame()
  function close() {
    setIsOpen(false)
  }

  const updateObjectFill = (each: any) => {
    const bgObject = editor.frame.background.canvas._objects.filter(
      (el: any) => el.metadata?.type === backgroundLayerType
    )[0]

    const deviceObject = editor.frame.background.canvas._objects.filter(
      (el: any) => el.metadata?.type === deviceUploadType
    )[0]

    const backgroundImg = editor.frame.background.canvas._objects.filter((el: any) => el.type === "BackgroundImage")[0]

    if (bgObject) {
      editor.frame.resize({ width: frame.width, height: frame.height })
      editor.objects.remove(bgObject.id)
      editor.objects.unsetBackgroundImage()
    } else if (deviceObject) {
      editor.frame.resize({ width: frame.width, height: frame.height })
      editor.objects.remove(deviceObject.id)
      editor.objects.unsetBackgroundImage()
    } else if (backgroundImg) {
      editor.objects.remove(backgroundImg.id)
      editor.objects.unsetBackgroundImage()
    }
    editor.frame.setBackgroundColor(each)
  }
  const handleUpdatePopup = () => {
    setIsReplacePopup(false)
  }

  const handleActiveState = (idx: number) => {
    if (idx == activeState) {
      setActiveState(-1)
    } else setActiveState(idx)
  }

  const colors = ["#FF6BB2", "#B69DFF", "#30C5E5", "#7BB872", "#49A8EE", "#3F91A2", "#DA4F7A", "#FFFFFF"]

  return showLayer ? (
    <Scrollable>
      <div className={classes.BgLayerSection}>
        <div
          className="d-flex justify-content-start flex-row align-items-center pointer mt-1"
          onClick={() => {
            handleClose()
          }}
        >
          <Icons.ChevronRight size="16" /> <div className={clsx(classes.panelHeading, "ml-1")}>Background</div>
        </div>
        <div>
          <div className={clsx(classes.layerSubSection, "flex-center mt-3")}>
            <div
              className={clsx(classes.box, "d-flex justify-content-center align-items-center flex-column mr-1 pointer")}
              onClick={() => {
                setIsReplacePopup(true)
              }}
            >
              <Icons.Image />
              <p>Replace</p>
            </div>
            <div
              className={clsx(
                classes.box,
                " pointer d-flex justify-content-center align-items-center flex-column ml-1 pointer"
              )}
              onClick={() => EraseBgFunc({ editor, frame })}
            >
              <Icons.TrashIcon size={"20"} />
              <p>Delete</p>
            </div>{" "}
          </div>
          {/* <div className={clsx(classes.modifierSection, classes.panelSubHeading, "mb-2")}>Modifiers</div>
          {BgLayerOption.map((each, idx) => (
            <DropdownWrapper
              key={idx}
              icon={each.icon}
              activeState={activeState}
              idx={idx}
              heading={each.name}
              handleActiveState={handleActiveState}
            />
          ))} */}
        </div>
        <ColorPicker
          inputColor={bgColor}
          isOpen={isOpen}
          handleClose={close}
          type="background"
          handleColor={(each: any) => {
            updateObjectFill(each)
          }}
        />

        <div className={clsx(classes.panelSubHeading, "my-2")}>Colors</div>
        <div className={classes.colorsWrapper}>
          {colors.map((each, idx) => {
            return (
              <div
                key={idx}
                className={clsx(classes.colorOption, "flex-center")}
                onClick={() => {
                  if (idx === colors.length - 1) {
                    setIsOpen(true)
                  } else {
                    setBGColor(each)
                    updateObjectFill(each)
                  }
                }}
                style={{ backgroundColor: each, border: idx == colors.length - 1 ? "1px solid #92929D" : "" }}
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
      </div>
      <UploadImgModal fileInputType="bgupdate" isOpen={isReplacePopup} handleClose={handleUpdatePopup} />
    </Scrollable>
  ) : null
}

export default BgLayer

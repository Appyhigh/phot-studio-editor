import Scrollable from "~/components/Scrollable"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import clsx from "clsx"
import TextAlignLeft from "~/components/Icons/TextAlignLeft"
import TextAlignCenter from "~/components/Icons/TextAlignCenter"
import TextAlignRight from "~/components/Icons/TextAlignRight"
import FontSelector from "./FontSelector"
import DropdownWrapper from "../ObjectLayer/DropdownWrapper"
import React, { useEffect, useState } from "react"
import { TextLayerOption } from "~/views/DesignEditor/utils/TextLayerOtion"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import DeleteIcon from "~/components/Icons/Delete"
import ColorPicker from "~/components/UI/ColorPicker/ColorPicker"
import { throttle } from "lodash"

const TextLayer = ({ showLayer, handleClose }: any) => {
  const colors = ["#FF6BB2", "#B69DFF", "#30C5E5", "#7BB872", "#49A8EE", "#3F91A2", "#DA4F7A", "#FFFFFF"]
  const [isOpen, setIsOpen] = React.useState(false)
  const [textColor, setTextColor] = useState("#000000")

  function close() {
    setIsOpen(false)
  }

  const [activeState, setActiveState] = useState(-1)
  const [align, setAlign] = useState("center")
  const editor = useEditor()
  const handleActiveState = (idx: number) => {
    if (idx == activeState) {
      setActiveState(-1)
    } else setActiveState(idx)
  }

  const TEXT_ALIGNS = ["left", "center", "right"]
  const activeObject = useActiveObject()
  // @ts-ignore
  const [textContent, setTextConent] = useState({ text: activeObject?.text, id: activeObject?.id })

  const updateObjectFill = throttle((color: string) => {
    if (activeObject) {
      editor.objects.update({ fill: color })
    }

    setTextColor(color)
  }, 100)

  useEffect(() => {
    if (activeObject) {
      setTextConent({ text: activeObject?.text, id: activeObject?.id })
    }
  }, [activeObject])
  useEffect(() => {
    // @ts-ignore
    if (activeObject && activeObject.type === "StaticText") {
      // @ts-ignore

      if (activeObject.id === textContent.id) editor.objects.update({ text: textContent.text })
    }
  }, [activeObject, textContent])

  useEffect
  return showLayer ? (
    <Scrollable>
      <div className={classes.textLayerSection}>
        <div
          className="d-flex justify-content-start flex-row align-items-center pointer mt-1"
          onClick={() => {
            handleClose()
          }}
        >
          <Icons.ChevronRight size="16" /> <div className={clsx(classes.panelHeading, "ml-1")}>Text</div>
        </div>
        <div>
          <div className={clsx("mt-3")}>
            <textarea
              className={classes.textAreaSection}
              value={textContent.text}
              onChange={(e) => {
                setTextConent((prev) => ({ ...prev, text: e.target.value }))
              }}
            />
          </div>
          <div className={classes.alignmentWrapper}>
            <div
              className={clsx(
                classes.alignmentToolBox,
                align === TEXT_ALIGNS[0] && classes.selectedAlign,

                "d-flex  pointer justify-content-center align-items-center flex-column  mb-1"
              )}
              onClick={() => {
                // @ts-ignore
                editor?.objects.update({ textAlign: TEXT_ALIGNS[0] })
                setAlign(TEXT_ALIGNS[0])
              }}
            >
              <TextAlignLeft size={24} />
              <p>Left</p>
            </div>
            <div
              className={clsx(
                classes.alignmentToolBox,
                align === TEXT_ALIGNS[1] && classes.selectedAlign,
                "d-flex  pointer justify-content-center align-items-center flex-column  mb-1"
              )}
              onClick={() => {
                // @ts-ignore
                editor?.objects.update({ textAlign: TEXT_ALIGNS[1] })
                setAlign(TEXT_ALIGNS[1])
              }}
            >
              <TextAlignCenter size={24} />
              <p>Center</p>
            </div>
            <div
              className={clsx(
                classes.alignmentToolBox,
                align === TEXT_ALIGNS[2] && classes.selectedAlign,
                "d-flex  pointer justify-content-center align-items-center flex-column  mb-1"
              )}
              onClick={() => {
                // @ts-ignore
                editor?.objects.update({ textAlign: TEXT_ALIGNS[2] })
                setAlign(TEXT_ALIGNS[2])
              }}
            >
              <TextAlignRight size={24} />
              <p>Right</p>
            </div>
          </div>
          <div className={clsx(classes.panelSubHeading, "my-2")}>Font</div>
          <FontSelector />
          <div className={clsx(classes.panelSubHeading, "my-2")}>Text color</div>
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

          <ColorPicker inputColor={textColor} isOpen={isOpen} handleClose={close} type="text" />

          {/* <div className={clsx(classes.panelSubHeading, "my-2")}>Modifiers</div>
          {TextLayerOption.map((each, idx) => (
            <DropdownWrapper
              key={idx}
              icon={each.icon}
              activeState={activeState}
              idx={idx}
              heading={each.name}
              handleActiveState={handleActiveState}
            />
          ))} */}
          <div
            onClick={() => editor.objects.remove()}
            className={clsx("pointer flex-column-center center mt-3", classes.eraseTextBox)}
          >
            <div className="flex-column-center">
              <div className={classes.deleteTextIcon}>
                <DeleteIcon size={24} />
              </div>
              <p>Erase</p>
            </div>
          </div>
        </div>
      </div>
    </Scrollable>
  ) : null
}
export default TextLayer

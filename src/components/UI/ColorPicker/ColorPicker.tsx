import { Modal } from "baseui/modal"
import classes from "./style.module.css"
import React from "react"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { throttle } from "lodash"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { Delete } from "baseui/icon"
import { HexColorPicker } from "react-colorful"

const DEFAULT_COLORS = ["#531EFF", "#ff9800", "#ffee58", "#66bb6a", "#26a69a"]

const DOCUMENT_COLORS = ["#E15241", "#F09D38", "#FBEB60", "#67AC5B", "#4994EB"]
const ColorPicker = ({ isOpen, handleClose, textColor }: any) => {
    
  const [color, setColor] = React.useState(textColor)
  const activeObject = useActiveObject()
  const editor = useEditor()
  const close = () => {
    handleClose()
  }
  const updateObjectFill = throttle((color: string) => {
    if (activeObject) {
      editor.objects.update({ fill: color })
    }

    setColor(color)
  }, 100)

  return (
    <Modal
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            zIndex: 500,
          }),
        },
        Close: {
          style: ({ $theme }) => ({
            outline: `transparent`,
            background: "#44444F",
            border: "3px solid #44444F",
            borderRadius: "50%",
            color: "#FFF",
            margin: "-22px",
          }),
        },
        Dialog: {
          style: ({ $theme }) => ({
            backgroundColor: $theme.colors.white,
            width: "382px",
            height: "550px",
            borderRadius: "10px",
          }),
        },
      }}
      onClose={close}
      isOpen={isOpen}
    >
      <div className={classes.modal}>
        <>
          <Block className={classes.colorPickerSection}>
            <HexColorPicker onChange={updateObjectFill}  />
            <div className={classes.colorPickerInput}>
              <input
                className={classes.colorPickerInputField}
                value={color}
                onChange={(e) => {
                  setColor(e.target.value)
                }}
              />
            </div>
            <Block>
              <Block className={classes.colorTypeHeading}>Default Colors</Block>
              <Block $style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.25rem" }}>
                {DEFAULT_COLORS.map((color, index) => (
                  <Block
                    $style={{
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                    onClick={() => updateObjectFill(color)}
                    backgroundColor={color}
                    height="62px"
                    width={"62px"}
                    key={index}
                  />
                ))}
              </Block>
            </Block>
            <Block>
              <Block className={classes.colorTypeHeading}>Document Colors</Block>
              <Block $style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.25rem" }}>
                {DOCUMENT_COLORS.map((color, index) => (
                  <Block
                    $style={{
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                    onClick={() => updateObjectFill(color)}
                    backgroundColor={color}
                    height="62px"
                    width={"62px"}
                    key={index}
                  />
                ))}
              </Block>
            </Block>
          </Block>
        </>
      </div>
    </Modal>
  )
}

export default ColorPicker

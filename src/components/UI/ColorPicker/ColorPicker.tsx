import { Modal } from "baseui/modal"
import classes from "./style.module.css"
import React from "react"
import { useActiveObject } from "@layerhub-io/react"
import { throttle } from "lodash"
import { Block } from "baseui/block"
import { HexColorPicker } from "react-colorful"
import { Button } from "baseui/button"

const DEFAULT_COLORS = ["#531EFF", "#ff9800", "#ffee58", "#66bb6a", "#26a69a"]

const DOCUMENT_COLORS = ["#E15241", "#F09D38", "#FBEB60", "#67AC5B", "#4994EB"]
const ColorPicker = ({ isOpen, handleClose, inputColor, handleChangeColor }: any) => {
  const [color, setColor] = React.useState(inputColor)
  const activeObject = useActiveObject()

  const close = () => {
    handleClose()
  }
  const updateObjectFill = throttle((color: string) => {
    handleChangeColor(color)
    setColor(color)
    close()
  }, 1000)

  return (
    <Modal
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            zIndex: 500,
            borderBottomWidth: "none",
            borderTopWidth: "none",
            borderLeftWidth: "none",
            borderRightWidth: "none",
            borderTopStyle: "none",
            borderBottomStyle: "none",
            borderLeftStyle: "none",
            borderRightStyle: "none",
          }),
        },
        Close: {
          style: ({ $theme }) => ({
            outline: `transparent`,
            background: "#44444F",
            borderTopLeftRadius: "50%",
            borderBottomLeftRadius: "50%",
            borderTopRightRadius: "50%",
            borderBottomRightRadius: "50%",
            borderBottomColor: "#44444F",
            borderTopColor: "#44444F",
            borderLeftColor: "#44444F",
            borderRightColor: "#44444F",
            color: "#FFF",
            margin: "-22px",
          }),
        },
        Dialog: {
          style: ({ $theme }) => ({
            backgroundColor: $theme.colors.white,
            width: "382px",
            height: "600px",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
          }),
        },
      }}
      onClose={close}
      isOpen={isOpen}
    >
      <div className={classes.modal}>
        <>
          <Block className={classes.colorPickerSection}>
            <div className="hex-color-picker">
              <HexColorPicker
                onChange={(color) => {
                  setColor(color)
                }}
              />
            </div>
            <div className={classes.colorPickerInput}>
              <input
                className={classes.colorPickerInputField}
                onChange={(e) => {
                  setColor(e.target.value)
                }}
                value={color}
              />
            </div>
            <Block>
              <Block className={classes.colorTypeHeading}>Default Colors</Block>
              <Block className={classes.colorSection}>
                {" "}
                {DEFAULT_COLORS.map((color, index) => (
                  <Block
                    className={classes.eachColor}
                    onClick={() => updateObjectFill(color)}
                    backgroundColor={color}
                    key={index}
                  />
                ))}
              </Block>
            </Block>
            <Block>
              <Block className={classes.colorTypeHeading}>Document Colors</Block>
              <Block className={classes.colorSection}>
                {DOCUMENT_COLORS.map((color, index) => (
                  <Block
                    className={classes.eachColor}
                    onClick={() => updateObjectFill(color)}
                    backgroundColor={color}
                    key={index}
                  />
                ))}
              </Block>
            </Block>
            <Block className="w-100 mt-3">
              <Button
                onClick={() => updateObjectFill(color)}
                $colors={{ backgroundColor: "#6729F3", color: "#fff" }}
                className="w-100 p-5 mt-5 d-inline-block"
              >
                Change Color
              </Button>
            </Block>
          </Block>
        </>
      </div>
    </Modal>
  )
}

export default ColorPicker

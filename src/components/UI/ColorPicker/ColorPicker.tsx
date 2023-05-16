import { Modal } from "baseui/modal"
import classes from "./style.module.css"
import React, { useCallback } from "react"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { throttle } from "lodash"
import { Block } from "baseui/block"
import { HexColorPicker } from "react-colorful"
import { changeLayerBackgroundImage, changeLayerFill } from "~/utils/updateLayerBackground"
import { toDataURL } from "~/utils/export"

const DEFAULT_COLORS = ["#531EFF", "#ff9800", "#ffee58", "#66bb6a", "#26a69a"]

const DOCUMENT_COLORS = ["#E15241", "#F09D38", "#FBEB60", "#67AC5B", "#4994EB"]
const ColorPicker = ({ isOpen, handleClose, inputColor, type }: any) => {
  const [color, setColor] = React.useState(inputColor)
  const activeObject = useActiveObject()
  const editor = useEditor()

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

  const close = () => {
    handleClose()
  }
  const updateObjectFill = throttle((color: string) => {
    if (activeObject) {
      if (type === "object") {
        handleChangeBg({ color: color })
      } else if (type === "text") editor.objects.update({ fill: color })
    }

    setColor(color)
  }, 100)

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
            height: "550px",
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
              <HexColorPicker onChange={updateObjectFill} />
            </div>
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
          </Block>
        </>
      </div>
    </Modal>
  )
}

export default ColorPicker

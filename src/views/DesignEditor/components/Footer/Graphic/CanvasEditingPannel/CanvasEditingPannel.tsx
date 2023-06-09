import { useActiveObject, useEditor, useFrame, useZoomRatio } from "@layerhub-io/react"
import { Slider } from "baseui/slider"
import React from "react"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import { Block } from "baseui/block"
import { backgroundLayerType, checkboxBGUrl } from "~/constants/contants"

interface Options {
  zoomRatio: number
  zoomRatioTemp: number
}
const CanvasEditingPannel = () => {
  const zoomMin = 10
  const zoomMax = 300
  const [options, setOptions] = React.useState<Options>({
    zoomRatio: 30,
    zoomRatioTemp: 30,
  })
  const editor = useEditor()
  const zoomRatio: number = useZoomRatio()
  const frame = useFrame()
  const activeObject = useActiveObject()
  React.useEffect(() => {
    setOptions({ ...options, zoomRatio: Math.round(zoomRatio * 100) })
  }, [zoomRatio])

  const applyZoomRatio = (type: string, e: any) => {
    const value = e.target.value
    if (editor) {
      if (value === "") {
        setOptions({ ...options, zoomRatio: options.zoomRatio, zoomRatioTemp: options.zoomRatio })
      } else {
        let parsedValue = parseFloat(value)

        if (parsedValue < 0) {
          editor.zoom.zoomToRatio(zoomMin / 100)
        } else if (parsedValue > zoomMax) {
          editor.zoom.zoomToRatio(zoomMax / 100)
        } else {
          editor.zoom.zoomToRatio(parsedValue / 100)
        }
      }
    }
  }

  return (
    <Block className="d-flex justify-content-center align-items-center">
      <div className="d-flex justify-content-start align-items-center mr-2 p-relative"></div>

      <Slider
        overrides={{
          InnerThumb: () => null,
          ThumbValue: () => null,
          TickBar: () => null,
          Root: {
            style: ({ $theme }) => {
              return {
                width: "135px",
                marginRight: "10px",
                [$theme.mediaQuery.large]: {
                  width: "200px",
                },
              }
            },
          },
          Thumb: {
            style: {
              height: "20px",
              width: "20px",
              paddingLeft: 0,
              backgroundColor: "#44444F",
            },
          },
          Track: {
            style: {
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
          InnerTrack: {
            style: {
              height: "4px",
            },
          },
        }}
        value={[options.zoomRatio]}
        onChange={({ value }) => applyZoomRatio("zoomRatio", { target: { value: value[0] } })}
        min={zoomMin}
        max={zoomMax}
      />
      <Block
        className={classes.canvasOptions}
        onClick={() => {
          const length_obj = editor.frame.background.canvas._objects.length
          if (editor.frame.background.canvas._objects.length === 2) {
            editor.objects.unsetBackgroundImage()
            const options = {
              type: "BackgroundImage",
              src: checkboxBGUrl,
              preview: checkboxBGUrl,
              metadata: { generationDate: new Date().getTime(), type: backgroundLayerType },
            }

            editor.objects.add(options).then(() => {
              setTimeout(() => {
                editor.objects.setAsBackgroundImage()
              }, 100)
            })
          } else if (editor.frame.background.canvas._objects[length_obj - 1].metadata.type !== backgroundLayerType) {
            editor.history.undo()
          }
        }}
      >
        <Icons.Undo size={22} />
      </Block>
      <Block
        className={classes.canvasOptions}
        onClick={() => {
          editor.history.redo()
        }}
      >
        <Icons.Redo size={22} />
      </Block>
    </Block>
  )
}

export default CanvasEditingPannel

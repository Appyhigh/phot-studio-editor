import { useEditor, useZoomRatio } from "@layerhub-io/react"
import { Theme } from "baseui"
import { Button, KIND } from "baseui/button"
import { SIZE } from "baseui/input"
import { Slider } from "baseui/slider"
import React from "react"
import { styled } from "baseui"
import Icons from "~/components/Icons"

// @ts-ignore

interface Options {
  zoomRatio: number
  zoomRatioTemp: number
}
const CanvasEditingPannel = () => {
  const zoomMin = 10
  const zoomMax = 240
  const [options, setOptions] = React.useState<Options>({
    zoomRatio: 20,
    zoomRatioTemp: 20,
  })
  const editor = useEditor()
  const zoomRatio: number = useZoomRatio()

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
    <div className="d-flex justify-content-center align-items-center">
      <div className="d-flex justify-content-start align-items-center mr-2 p-relative"></div>

      <Slider
        overrides={{
          InnerThumb: () => null,
          ThumbValue: () => null,
          TickBar: () => null,
          Root: {
            style: ({ $theme }) => {
              return {
                width: "150px",
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
      <Button
        kind={KIND.tertiary}
        size={SIZE.compact}
        onClick={() => {
          editor.history.undo()
        }}
      >
        <Icons.Undo size={22} />
      </Button>
      <Button
        kind={KIND.tertiary}
        size={SIZE.compact}
        onClick={() => {
          editor.history.redo()
        }}
      >
        <Icons.Redo size={22} />
      </Button>
    </div>
  )
}

export default CanvasEditingPannel

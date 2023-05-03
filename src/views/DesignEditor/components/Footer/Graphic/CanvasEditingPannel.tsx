import { useEditor, useZoomRatio } from "@layerhub-io/react"
import { Theme } from "baseui"
import { Button, KIND } from "baseui/button"
import { SIZE } from "baseui/input"
import { Slider } from "baseui/slider"
import { PLACEMENT } from "baseui/toast"
import { StatefulTooltip } from "baseui/tooltip"
import React from "react"
import { styled } from "styletron-react"
import Icons from "~/components/Icons"
import { CustomTheme } from "~/theme"

// @ts-ignore
const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "50px",
  background: "#FFF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0px 16px 16px 30px",
  padding: "0px 100px",
}))

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

  const resetHandler = () => {
    editor.objects.clear()
    editor.history.reset()
    editor.history.save()
  }

  return (
    <Container>
      <div className="d-flex justify-content-start align-items-center mr-2 p-relative">
        <StatefulTooltip
          placement={PLACEMENT.bottom}
          showArrow={true}
          accessibilityType={"tooltip"}
          content={"Restore"}
        >
          <Button
            kind={KIND.tertiary}
            size={SIZE.compact}
            onClick={() => {
              // function is called twice because there will be shomehow 1 element left in undo
              resetHandler()
              resetHandler()
            }}
          >
            <Icons.Save size={26} />
          </Button>
        </StatefulTooltip>
      </div>

      <Slider
        overrides={{
          InnerThumb: () => null,
          ThumbValue: () => null,
          TickBar: () => null,
          Root: {
            style: { width: "200px", marginRight: "10px" },
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
    </Container>
  )
}

export default CanvasEditingPannel

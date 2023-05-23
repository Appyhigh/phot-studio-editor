import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Icons from "~/components/Icons"
import { Button, KIND, SIZE } from "baseui/button"
import { useEditor, useZoomRatio } from "@layerhub-io/react"
import { StatefulTooltip } from "baseui/tooltip"
import { PLACEMENT } from "baseui/toast"
import DownloadPopup from "./DownloadPopup/DownloadPopup"
import SliderBar from "~/components/UI/Common/SliderBar"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "50px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginLeft: "30px",
  marginRight: "28px",
}))

interface Options {
  zoomRatio: number
  zoomRatioTemp: number
}

const Common = () => {
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

  const handleChange = (type: string, value: number) => {
    if (editor) {
      if (type.includes("emp")) {
        setOptions({ ...options, zoomRatioTemp: value })
      }
    }
  }

  const handleZoomChange = (e: any) => {
    applyZoomRatio("zoomRatio", { target: { value: e[0] } })
  }

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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "start", position: "relative" }}>
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

      <div style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
        <SliderBar
          width="200px"
          minVal={zoomMin}
          maxVal={zoomMax}
          thumbSize={"20px"}
          val={[options.zoomRatio]}
          handleChange={handleZoomChange}
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
        <StatefulTooltip placement={PLACEMENT.bottom} showArrow={true} accessibilityType={"tooltip"} content="Share">
          <Button
            kind={KIND.tertiary}
            size={SIZE.compact}
            onClick={() => {
              editor.history.save()
            }}
          >
            <Icons.Share size={16} />
          </Button>
        </StatefulTooltip>
      </div>
    </Container>
  )
}

export default Common

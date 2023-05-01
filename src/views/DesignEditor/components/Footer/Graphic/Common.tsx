import React, { useState } from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Icons from "~/components/Icons"
import { Button, KIND, SIZE } from "baseui/button"
import { Slider } from "baseui/slider"
import { Input } from "baseui/input"
import { useEditor, useZoomRatio } from "@layerhub-io/react"
import { StatefulTooltip } from "baseui/tooltip"
import { Block } from "baseui/block"
import { PLACEMENT } from "baseui/toast"
import ResizeCanvasPopup from "./ResizeCanvasPopup"
import classes from "./style.module.css"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "50px",
  background: $theme.colors.white,
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

  const resetHandler = () => {
    editor.objects.clear()
    editor.history.reset()
    editor.history.save()
  }
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

  const [showResizeCanvas, setShowResizeCanvas] = useState(false)

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
    <Container>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "start", position: "relative" }}>
        <StatefulTooltip
          placement={PLACEMENT.bottom}
          showArrow={true}
          accessibilityType={"tooltip"}
          content="All changes are saved"
        >
          <Button
            kind={KIND.tertiary}
            size={SIZE.compact}
            onClick={() => {
              editor.history.save()
            }}
          >
            <Icons.Refresh size={16} />
          </Button>
        </StatefulTooltip>
        <div style={{ position: "relative" }} className={classes.resizeCanvasBtn}>
          <Button kind={KIND.tertiary} size={SIZE.compact} className={classes.resizeCanvasBtn}>
            <Icons.CanvasResize size={26} />
          </Button>
          <ResizeCanvasPopup showResizeCanvas={showResizeCanvas} />
        </div>

        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Transparency size={30} />
        </Button>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Expand size={16} />
        </Button>
        <Button kind={KIND.tertiary} size={SIZE.compact} onClick={() => editor.zoom.zoomToFit()}>
          <Icons.Compress size={16} />
        </Button>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
        <Slider
          overrides={{
            InnerThumb: () => null,
            ThumbValue: () => null,
            TickBar: () => null,
            Root: {
              style: { width: "140px" },
            },
            Thumb: {
              style: {
                height: "12px",
                width: "12px",
                paddingLeft: 0,
              },
            },
            Track: {
              style: {
                paddingLeft: 0,
                paddingRight: 0,
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
        <Button style={{ color: "#92929D", height: "38px" }} kind={KIND.secondary}>
          Download
        </Button>
      </div>
    </Container>
  )
}

export default Common

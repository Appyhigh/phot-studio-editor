import { SIZE } from "baseui/input"
import { Block } from "baseui/block"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { useEditor, useFrame, useObjects } from "@layerhub-io/react"
import { useEffect, useState } from "react"
import { fixedSizeFrameTypes } from "~/constants/editor"
import { Button, SHAPE } from "baseui/button"
import CommonInput from "~/components/UI/Common/Input"
import ResizeFrameCanvas from "./ResizeCanvasTypes"
import { ILayer } from "@layerhub-io/types"
import Icons from "~/components/Icons"
import { Theme, styled, useStyletron } from "baseui"
import { LabelXSmall, ParagraphSmall } from "baseui/typography"

const Box = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "auto-fit",
  width: "421px",
  backgroundColor: $theme.colors.white,
  // @ts-ignore
  border: `1px solid ${$theme.colors.grey400}`,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
  borderRadius: $theme.sizing.scale400,
  zIndex: 500,
  top: "48px",
  right: "0px",
}))

const ResizeCanvasPopup = ({ show }: any) => {
  const objects = useObjects() as ILayer[]
  const [css, theme] = useStyletron()

  const [desiredFrame, setDesiredFrame] = useState({
    width: 0,
    height: 0,
  })

  const [selectedFrame, setSelectedFrame] = useState<any>({
    id: 0,
    width: 0,
    height: 0,
  })

  const [activeKey, setActiveKey] = useState<string | number>("0")

  const { currentDesign, setCurrentDesign } = useDesignEditorContext()
  const editor = useEditor()

  const frame = useFrame()
  const applyResize = () => {
    const size = activeKey === "0" ? selectedFrame : desiredFrame
    if (editor) {
      editor.objects.unsetBackgroundImage()
      editor.frame.resize({
        width: parseInt(size.width),
        height: parseInt(size.height),
      })
      setCurrentDesign({
        ...currentDesign,
        frame: {
          width: parseInt(size.width),
          height: parseInt(size.height),
        },
      })
    }
  }

  useEffect(() => {
    if (frame) {
      setDesiredFrame({
        width: frame.width,
        height: frame.height,
      })
    }
  }, [frame])

  const handleWidth = (width: any) => {
    setActiveKey("1")
    setDesiredFrame({ ...desiredFrame, width: width })
  }

  const handleHeight = (height: any) => {
    setActiveKey("1")
    setDesiredFrame({ ...desiredFrame, height: height })
  }

  const isEnabled =
    // @ts-ignore
    (activeKey === "0" && selectedFrame.id !== 0) ||
    // @ts-ignore
    (activeKey === "1" && !!parseInt(desiredFrame.width) && !!parseInt(desiredFrame.height))

  return (
    <Block style={{ display: show ? "block" : "none" }}>
      <Block className={"resizeCanvas"}>
        <Box className="d-flex align-items-start flex-column p-absolute resizeCanvasCon">
          <div className="p-absolute" style={{ rotate: "-90deg", top: "-60px", left: "114px" }}>
            <Icons.SliderBtn size={106} width="10" />
          </div>
          <div style={{ margin: "4px 16px" }}>
            <ParagraphSmall className="pt-1 pb-1" style={{ color: "#44444F" }}>
              Custom Size
            </ParagraphSmall>
            <div className="d-flex justify-content-center flex-column">
              <div className="d-flex justify-content-center flex-row">
                <div className="mr-1">
                  <CommonInput
                    type="number"
                    placeholder="Width"
                    handleChange={handleWidth}
                    value={desiredFrame.width}
                    width="88px"
                    height="32px"
                  />
                </div>
                <CommonInput
                  type="number"
                  placeholder="Height"
                  handleChange={handleHeight}
                  value={desiredFrame.height}
                  width="88px"
                  height="32px"
                />
              </div>
            </div>
          </div>
          <div style={{ border: "1px solid #F1F1F5", width: "90%", marginTop: "12px", marginLeft: "20px" }}></div>

          <Block className="mt-2 mx-2 ">
            <ParagraphSmall className="pt-1 pb-1" style={{ color: "#44444F" }}>
              Fixed Size
            </ParagraphSmall>
            <Block className="d-flex justify-content-start flex-row flex-wrap ml-1" $style={{ color: "#92929D" }}>
              {fixedSizeFrameTypes.map((sample, index) => {
                const { img, name, subHeading, imgHeight, id } = sample
                // @ts-ignore
                const Component = ResizeFrameCanvas[img]
                return (
                  <Block
                    key={index}
                    style={{
                      minWidth: "100px",
                      margin: index == 1 || index == 4 || index == 7 ? "10px 32px" : "10px 0px",
                    }}
                    onClick={() => {
                      setActiveKey("0")
                      setSelectedFrame(sample)
                    }}
                    className="d-flex text-center justify-content-center flex-column align-items-center pointer"
                  >
                    <Block style={{ height: imgHeight, marginBottom: "8px" }} className="flex-center">
                      {Component && <Component color={id === selectedFrame.id ? "#000" : "#92929D"} />}
                    </Block>
                    <LabelXSmall
                      className={css({
                        color: theme.colors.primary500,
                      })}
                    >
                      {name}
                    </LabelXSmall>
                    <p style={{ fontSize: "11px" }}>{subHeading}</p>
                  </Block>
                )
              })}
            </Block>
          </Block>

          <Button
            disabled={!isEnabled}
            onClick={applyResize}
            size={SIZE.mini}
            style={{
              width: "90%",
              margin: "20px auto",
              height: "38px",
              color: isEnabled ? "#FFF" : "#92929D",
              fontWeight: "600",
              letterSpacing: "1px",
              backgroundColor: isEnabled ? "#000" : "#F1F1F5",
              borderRadius: "10px",
            }}
            shape={SHAPE.pill}
          >
            Resize Template
          </Button>
        </Box>
      </Block>
    </Block>
  )
}

export default ResizeCanvasPopup

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
import { backgroundLayerType } from "~/constants/contants"
import Icons from "~/components/Icons"

const ResizeCanvasPopup = ({ show }: any) => {
  const objects = useObjects() as ILayer[]

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
      const bgObject = objects.filter((el) => el.metadata?.type === backgroundLayerType)[0]
      if (bgObject) {
        console.log(bgObject)
        editor.objects.remove(bgObject.id)
        editor.objects.unsetBackgroundImage()
      }

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
        <Block
          className="d-flex align-items-start flex-column p-absolute resizeCanvasCon"
          style={{
            height: "auto-fit",
            width: "421px",
            backgroundColor: "#fff",
            border: "1px solid #F1F1F5",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            zIndex: 500,
            top: "45px",
            right: "-290px",
          }}
        >
          <div className="p-absolute" style={{ rotate: "-90deg", top: "-60px", left: "114px" }}>
            <Icons.SliderBtn size={106} width="10"/>
          </div>
          <div style={{ margin: "4px 16px" }}>
            <p className="pt-1 pb-1" style={{ fontSize: "14px", color: "#44444F", fontWeight: "500" }}>
              Custom Size
            </p>
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
            <p className="pt-1 pb-1" style={{ fontSize: "14px", color: "#44444F", fontWeight: "500" }}>
              Fixed Size
            </p>
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
                    <p style={{ fontSize: "12px", color: "#44444F" }}>{name}</p>
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
        </Block>
      </Block>
    </Block>
  )
}

export default ResizeCanvasPopup

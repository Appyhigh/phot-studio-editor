import { SIZE } from "baseui/input"
import { Block } from "baseui/block"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { useEditor, useFrame } from "@layerhub-io/react"
import { useContext, useEffect, useState } from "react"
import { fixedSizeFrames, resizeSampleFrame } from "~/constants/editor"
import { Button, SHAPE } from "baseui/button"
import CommonInput from "~/components/UI/Common/Input"
const ResizeCanvasPopup = () => {
  const [desiredFrame, setDesiredFrame] = useState({
    width: 0,
    height: 0,
  })

  const [selectedFrame, setSelectedFrame] = useState<any>({
    id: 0,
    width: 0,
    height: 0,
  })

  const [othersFrame, setOthersFrame] = useState<any>({
    id: 0,
    width: 0,
    height: 0,
  })
  const [activeKey, setActiveKey] = useState<string | number>("0")

  const { currentDesign, setCurrentDesign } = useDesignEditorContext()
  const editor = useEditor()

  const frame = useFrame()
  const applyResize = () => {
    // @ts-ignore
    const size = activeKey === "0" ? selectedFrame : activeKey === "1" ? othersFrame : desiredFrame
    if (editor) {
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
    // @ts-ignore
    if (
      (activeKey === "0" && selectedFrame.id !== 0) ||
      // @ts-ignore
      (activeKey === "1" && othersFrame.id !== 0)
    ) {
      {
        applyResize()
      }
    }
  }, [selectedFrame, othersFrame])

  useEffect(() => {
    if (frame) {
      setDesiredFrame({
        width: frame.width,
        height: frame.height,
      })
    }
  }, [frame])

  // @ts-ignore
  const isCustomizedEnabled = activeKey === "2" && !!parseInt(desiredFrame.width) && !!parseInt(desiredFrame.height)

  const handleWidth = (width: any) => {
    setActiveKey("2")
    setDesiredFrame({ ...desiredFrame, width: width })
  }

  const handleHeight = (height: any) => {
    setActiveKey("2")
    setDesiredFrame({ ...desiredFrame, height: height })
  }
  return (
    <Block className={"resizeCanvas"}>
      <Block
        style={{
          height: "auto-fit",
          width: "251px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          alignItems: "start",
          border: "1px solid #F1F1F5",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          borderRadius: "4px",
          position: "absolute",
          zIndex: 500,
          left: "-40px",
          bottom: "45px",
        }}
      >
        <Block $style={{ margin: "4px 16px" }}>
          <p style={{ fontSize: "12px", color: "#000" }}>Fixed Size</p>
          <Block $style={{ display: "flex", justifyContent: "center", flexDirection: "row", color: "#92929D" }}>
            {fixedSizeFrames.map((sample, index) => (
              <Block
                key={index}
                onClick={() => {
                  setActiveKey("0")
                  setSelectedFrame(sample)
                }}
                $style={{
                  width: sample.frameWidth,
                  height: sample.frameHeight,
                  border: "1.5px solid #92929D",
                  borderRadius: "4px",
                  marginRight: "12px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  ":hover": {
                    color: "#000",
                    cursor: "pointer",
                    border: "1.5px solid #000",
                  },
                }}
              >
                <p>{sample.name}</p>
              </Block>
            ))}
          </Block>
        </Block>
        <div style={{ border: "1px solid #F1F1F5", width: "100%", marginTop: "12px" }}></div>
        <div style={{ margin: "4px 16px" }}>
          <p style={{ fontSize: "12px", color: "#000" }}>Custom Size</p>
          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
              <CommonInput
                type="number"
                placeholder="width"
                handleChange={handleWidth}
                value={desiredFrame.width}
                width="86px"
                height="32px"
              />

              <CommonInput
                type="number"
                placeholder="width"
                handleChange={handleHeight}
                value={desiredFrame.height}
                width="86px"
                height="32px"
              />
            </div>
            <br />
            <Button
              disabled={!isCustomizedEnabled}
              onClick={applyResize}
              size={SIZE.mini}
              style={{ width: "75px" }}
              shape={SHAPE.pill}
            >
              Resize
            </Button>
          </div>
        </div>
        <div style={{ border: "1px solid #F1F1F5", width: "100%", marginTop: "12px" }}></div>

        <div style={{ margin: "4px 16px 16px" }}>
          <p style={{ fontSize: "12px", color: "#000" }}>Others</p>
          <div
            className={"sizeSelectionInput"}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              fontSize: "11px",
              color: "#44444F",
            }}
          >
            {resizeSampleFrame.map((sampleFrame, index) => (
              <label style={{ display: "flex", alignItems: "center" }} key={index}>
                <input
                  type="checkbox"
                  name={sampleFrame.name}
                  checked={othersFrame.id == sampleFrame.id ? true : false}
                  onChange={() => {
                    setActiveKey("1")
                    setOthersFrame(sampleFrame)
                  }}
                />{" "}
                {sampleFrame.name}
                <span style={{ color: "#92929D", marginLeft: "3px" }}>
                  {" "}
                  ({sampleFrame.width} x {sampleFrame.height}px)
                </span>
              </label>
            ))}
          </div>
        </div>
      </Block>
    </Block>
  )
}

export default ResizeCanvasPopup

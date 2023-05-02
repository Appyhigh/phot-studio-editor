import { useEditor } from "@layerhub-io/react"
import { Block } from "baseui/block"
import { Slider } from "baseui/slider"
import { Console } from "console"
import { useCallback, useState } from "react"
import BaseBtn from "~/components/UI/Common/BaseBtn"
import SelectInput from "~/components/UI/Common/SelectInput"
import SliderBar from "~/components/UI/Common/SliderBar"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import useEditorType from "~/hooks/useEditorType"
import { IDesign } from "~/interfaces/DesignEditor"

const DownloadPopup = () => {
  const [selectedType, setSelectedType] = useState("jpg")
  const editorType = useEditorType()
  const editor = useEditor()
  const { currentDesign, scenes } = useDesignEditorContext()

  const [qualityVal, setQualtiyVal] = useState(50)
  const minQuality = 10
  const maxQuality = 100

  const handleTypeChange = (e: any) => {
    console.log("type", e)

    setSelectedType(e)
  }

  const handleQualityChange = (e: any) => {
    setQualtiyVal(e[0])
  }

  const exportToPNG = useCallback(async () => {
    if (editor) {
      const template = editor.scene.exportToJSON()
      const image = (await editor.renderer.render(template)) as string
      makeDownloadToPNG(image)
    }
  }, [editor, selectedType])

  const makeDownloadToPNG = (data: Object) => {
    console.log("type h", selectedType)
    const dataStr = `${data}`
    const a = document.createElement("a")
    a.href = dataStr
    a.download = `image.${selectedType}`
    a.click()
  }

  return (
    <Block className="downloadPopup">
      <Block
        style={{
          height: "auto-fit",
          width: "460px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          justifyContent: "flex-start",
          alignItems: "start",
          border: "1px solid #F1F1F5",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
          borderRadius: "12px",
          position: "absolute",
          zIndex: 500,
          right: "6px",
          bottom: "50px",
          padding: "16px 16px 23px 16px",
        }}
      >
        <Block>
          <p style={{ fontSize: "14px", color: "#44444F" }}>File Type</p>
          <SelectInput handleChange={handleTypeChange} />
        </Block>
        <Block>
          <p style={{ fontSize: "14px", color: "#44444F" }}>
            Quality <span style={{ fontSize: "9px" }}>({qualityVal})</span>
            <SliderBar
              width="190px"
              minVal={minQuality}
              maxVal={maxQuality}
              thumbSize={"14px"}
              val={[qualityVal]}
              handleChange={handleQualityChange}
            />
          </p>
        </Block>
        <Block
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <BaseBtn
            title={"Download"}
            handleClick={exportToPNG}
            bgColor="#6729F3"
            txtColor="#fff"
            marginLeft="0px"
            padding="60px"
          />
          <p
            style={{
              color: "#92929D",
              fontSize: "9px",
            }}
          >
            Preview Image (611 × 408)
          </p>
        </Block>
        <Block
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <BaseBtn
            title={"Download HD"}
            bgColor="#FFF"
            txtColor="#6729F3"
            marginLeft="0px"
            padding="52px"
            borderColor="#6729F3"
          />
          <p
            style={{
              color: "#92929D",
              fontSize: "9px",
            }}
          >
            Full Image (2157 × 1440)
          </p>
        </Block>
      </Block>
    </Block>
  )
}

export default DownloadPopup

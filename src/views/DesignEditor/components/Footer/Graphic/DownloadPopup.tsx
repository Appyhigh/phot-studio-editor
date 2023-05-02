import { useEditor, useFrame } from "@layerhub-io/react"
import { Block } from "baseui/block"
import { useCallback, useContext, useState } from "react"
import BaseBtn from "~/components/UI/Common/BaseBtn"
import SelectInput from "~/components/UI/Common/SelectInput"
import SliderBar from "~/components/UI/Common/SliderBar"
import FrameSizeContext from "~/contexts/FrameSizeContext"

const DownloadPopup = () => {
  const [selectedType, setSelectedType] = useState("jpg")
  const editor = useEditor()

  const [qualityVal, setQualtiyVal] = useState(50)
  const [sizeVal, setSizeVal] = useState(50)
  const minQuality = 10
  const maxQuality = 100
  const minSize = 10
  const maxSize = 100
  const frame = useFrame()

  const { frameData } = useContext(FrameSizeContext)

  const handleTypeChange = (e: any) => {
    setSelectedType(e)
  }

  const handleQualityChange = (e: any) => {
    setQualtiyVal(e[0])
  }

  const handleSizeChange = (e: any) => {
    setSizeVal(e)
  }
  const exportToPNG = useCallback(async () => {
    if (editor) {
      const template = editor.scene.exportToJSON()
      const image = (await editor.renderer.render(template)) as string
      if (selectedType != "svg") {
        makeDownloadToPNG(image)
      } else makeDownloadToSVG(image)
    }
  }, [editor, selectedType, frame])

  const makeDownloadToPNG = (data: Object) => {
    const dataStr = `${data}`
    const a = document.createElement("a")
    a.href = dataStr
    a.download = `image.${selectedType}`
    a.click()
  }

  const makeDownloadToSVG = (data: Object) => {
    const dataStr = `${data}`
    const a = document.createElement("a")
    const width = frameData.width
    const height = frameData.height

    const svgFile = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect width="${width}" height="${height}" fill="url(#pattern0)"/>
    <defs>
    <pattern id="pattern0" width="1" height="1">
    <use xlink:href="#image0_118_3" />
    <image id="image0_118_3" width="${width}" height="${height}" xlink:href="${dataStr}"/>
    </pattern>
    </defs>
    </svg>`

    const svgBlob = new Blob([svgFile], { type: "image/svg+xml" })
    a.href = URL.createObjectURL(svgBlob)
    a.download = `image.svg`
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
          bottom: "40px",
          padding: "16px 16px 23px 16px",
        }}
      >
        <Block>
          <p style={{ fontSize: "14px", color: "#44444F" }}>File Type</p>
          <SelectInput handleChange={handleTypeChange} />
        </Block>
        <Block style={{ marginBottom: "6px" }}>
          <p style={{ fontSize: "14px", color: "#44444F", marginBottom: "0px" }}>
            Size <span style={{ color: "#92929D" }}> (1414*2000px)</span>
          </p>
          <SliderBar
            width="424px"
            minVal={minSize}
            maxVal={maxSize}
            thumbSize={"14px"}
            val={[sizeVal]}
            handleChange={handleSizeChange}
          />
        </Block>
        <Block style={{ marginBottom: "6px" }}>
          <p style={{ fontSize: "14px", color: "#44444F", marginBottom: "0px" }}>
            Quality <span style={{ fontSize: "9px" }}>({qualityVal})</span>
          </p>
          <SliderBar
            width="190px"
            minVal={minQuality}
            maxVal={maxQuality}
            thumbSize={"14px"}
            val={[qualityVal]}
            handleChange={handleQualityChange}
          />
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

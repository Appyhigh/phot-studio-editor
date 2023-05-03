import { useEditor, useFrame } from "@layerhub-io/react"
import { Theme, styled } from "baseui"
import { Block } from "baseui/block"
import { useCallback, useState } from "react"
import BaseBtn from "~/components/UI/Common/BaseBtn"
import SelectInput from "~/components/UI/Common/SelectInput"
import SliderBar from "~/components/UI/Common/SliderBar"

const Box = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  width: "460px",
  height: "auto-fit",
  background: $theme.colors.white,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
  border: `1px solid ${$theme.colors.borderTransparent}`,
  borderRadius: $theme.sizing.scale500,
  zIndex: 500,
  right: "6px",
  bottom: "40px",
  padding: "16px 16px 23px 16px",
}))

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

  const makeDownloadToSVG = useCallback(
    (data: Object) => {
      const dataStr = `${data}`
      const a = document.createElement("a")
      const width = frame.width
      const height = frame.height

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
    },
    [frame]
  )

  return (
    <Block className="downloadPopup">
      <Box className="d-flex justify-flex-start align-items-start p-absolute flex-column">
        <Block className="pb-2">
          <p className="pb-1" style={{ fontSize: "14px", color: "#44444F" }}>
            File Type
          </p>
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
        <Block className="d-flex justify-content-start flex-column">
          <BaseBtn
            title={"Download"}
            handleClick={exportToPNG}
            bgColor="#6729F3"
            txtColor="#fff"
            marginLeft="0px"
            padding="60px"
          />
          <p
            className="pt-1 pb-2"
            style={{
              color: "#92929D",
              fontSize: "9px",
            }}
          >
            Preview Image (611 × 408)
          </p>
        </Block>
        <Block className="d-flex justify-content-start flex-column">
          <BaseBtn
            title={"Download HD"}
            bgColor="#FFF"
            txtColor="#6729F3"
            marginLeft="0px"
            padding="52px"
            borderColor="#6729F3"
          />
          <p
            className="pt-1 pb-2"
            style={{
              color: "#92929D",
              fontSize: "9px",
            }}
          >
            Full Image (2157 × 1440)
          </p>
        </Block>
      </Box>
    </Block>
  )
}

export default DownloadPopup

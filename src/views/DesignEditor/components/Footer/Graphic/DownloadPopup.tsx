import { useEditor, useFrame, useObjects } from "@layerhub-io/react"
import { Theme, styled, useStyletron } from "baseui"
import { Block } from "baseui/block"
import { useCallback, useEffect, useState } from "react"
import BaseBtn from "~/components/UI/Common/BaseBtn"
import SelectInput from "~/components/UI/Common/SelectInput"
import SliderBar from "~/components/UI/Common/SliderBar"
import { backgroundLayerType } from "~/constants/contants"

const Box = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  width: "460px",
  height: "auto-fit",
  background: $theme.colors.white,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
  border: `1px solid ${$theme.colors.borderTransparent}`,
  borderRadius: $theme.sizing.scale500,
  zIndex: 500,
  right: "0px",
  top: "35px",
  padding: "16px 16px 16px 16px",
}))

const SubHeading = styled<"p", {}, Theme>("p", ({ $theme }) => ({
  fontSize: $theme.sizing.scale550,
  color: $theme.colors.primary500,
}))

const DownloadPopup = () => {
  const [selectedType, setSelectedType] = useState("jpg")
  const editor = useEditor()
  const objects: any = useObjects()
  const [css, theme] = useStyletron()
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
    if (editor && objects) {
      let template: any = editor.scene.exportToJSON()

      // Exclude the Background & Checkbox Layer
      const checkboxBGLayerIndex = template.layers.findIndex((el: any) => el?.metadata?.type === backgroundLayerType)
      const canvasBGLayerIndex = template.layers.findIndex((el: any) => el?.id === "background")

      if (checkboxBGLayerIndex !== -1) {
        template.layers.splice(checkboxBGLayerIndex, 1)
        template.layers.splice(canvasBGLayerIndex, 1)
      }

      // Exclude the hidden layers from exports
      const hiddenLayersIDs: string[] = []

      objects.forEach((el: any) => {
        if (el?.visible === false) {
          hiddenLayersIDs.push(el.id)
        }
      })

      template = { ...template, layers: template.layers.filter((layer: any) => !hiddenLayersIDs.includes(layer.id)) }

      const image = (await editor.renderer.render(template)) as string
      if (selectedType != "svg") {
        makeDownloadToPNG(image)
      } else makeDownloadToSVG(image)
    }
  }, [editor, selectedType, frame, objects])

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
    <Block className="download-wrapper">
    <Block className="downloadPopup">
      <Box className="d-flex justify-flex-start align-items-start p-absolute flex-column" style={{top:"35px"}}>
        <Block className="pb-2">
          <SubHeading className="pb-1">File Type</SubHeading>
          <SelectInput handleChange={handleTypeChange} />
        </Block>
        <Block style={{ marginBottom: "6px" }}>
          <SubHeading className="mb-0">
            Size <span className={css({ fontSize: theme.colors.borderAccent })}> (1414*2000px)</span>
          </SubHeading>
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
          <SubHeading className="mb-0">
            Quality <span className={css({ fontSize: theme.sizing.scale400 })}>({qualityVal})</span>
          </SubHeading>
          <SliderBar
            width="190px"
            minVal={minQuality}
            maxVal={maxQuality}
            thumbSize={"14px"}
            val={[qualityVal]}
            handleChange={handleQualityChange}
          />
        </Block>
        <Block className="d-flex justify-content-start flex-row">
          <Block>
            <BaseBtn
              title={"Download HD"}
              bgColor="#FFF"
              txtColor="#6729F3"
              marginLeft="0px"
              padding="60px"
              borderColor="#6729F3"
            />
            <div
              className="pt-1 pb-2 flex-center"
              style={{
                color: "#92929D",
                fontSize: "12px",
                fontWeight: 300,
                margin:"auto"
              }}
            >
              1 Credit{" "}
              <p
                className="mx-1"
                style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#92929D" }}
              ></p>
              Full Image (2157 × 1440)
            </div>
          </Block>
          <Block>
            <Block className="d-flex justify-content-start flex-column ml-2">
              <BaseBtn
                title={"Download"}
                handleClick={exportToPNG}
                bgColor="#6729F3"
                txtColor="#fff"
                marginLeft="0px"
                padding="68px"
              />
              <p
                className="pt-1 pb-2"
                style={{
                  color: "#92929D",
                  fontSize: "12px",
                  fontWeight: 300,
                  textAlign:"center"
                }}
              >
                Preview Image (611 × 408){" "}
              </p>
            </Block>
          </Block>
        </Block>
      </Box>
    </Block>
    </Block>
  )
}

export default DownloadPopup

import { useEditor, useFrame, useObjects } from "@layerhub-io/react"
import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import { useCallback, useState } from "react"
import SelectInput from "~/components/UI/Common/SelectInput"
import SliderBar from "~/components/UI/Common/SliderBar"
import { backgroundLayerType } from "~/constants/contants"
import classes from "./style.module.css"
import clsx from "clsx"

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
        <Block
          className={clsx(classes.downloadPopup, "d-flex justify-flex-start align-items-start p-absolute flex-column")}
        >
          <Block className="pb-2">
            <div className={clsx("pb-1", classes.subHeading)}>File Type</div>
            <SelectInput handleChange={handleTypeChange} />
          </Block>
          <Block className="mb-1">
            <div className={clsx("mb-0", classes.subHeading)}>
              Size <span> (1414*2000px)</span>
            </div>
            <SliderBar
              width="424px"
              minVal={minSize}
              maxVal={maxSize}
              thumbSize={"14px"}
              val={[sizeVal]}
              handleChange={handleSizeChange}
            />
          </Block>
          <Block className="mb-1">
            <div className={clsx("mb-0", classes.subHeading)}>
              Quality <span>({qualityVal})</span>
            </div>
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
              <button className={clsx(classes.downloadBtn, classes.hdBtn)}>Download HD</button>
              <div className={clsx(classes.subText, "pt-1 pb-2 flex-center m-auto")}>
                1 Credit <div className={clsx(classes.circleDot, "mx-1")}></div>
                Full Image (2157 × 1440)
              </div>
            </Block>
            <Block>
              <Block className="d-flex justify-content-start flex-column ml-2">
                <button className={clsx(classes.downloadBtn)} title={"Download"} onClick={exportToPNG}>
                  Download
                </button>
                <div className={clsx(classes.subText, "pt-1 pb-2 flex-center m-auto")}>Preview Image (611 × 408) </div>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  )
}

export default DownloadPopup

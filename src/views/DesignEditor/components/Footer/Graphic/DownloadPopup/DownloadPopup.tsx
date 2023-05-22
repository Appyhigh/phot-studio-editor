import { useEditor, useFrame, useObjects } from "@layerhub-io/react"
import { Block } from "baseui/block"
import { useCallback, useState } from "react"
import SelectInput from "~/components/UI/Common/SelectInput/SelectInput"
import SliderBar from "~/components/UI/Common/SliderBar"
import { backgroundLayerType } from "~/constants/contants"
import classes from "./style.module.css"
import clsx from "clsx"
import { makeDownloadToPNG, makeDownloadToSVGHandler } from "~/utils/export"

const DownloadPopup = ({ typeOfDownload,typeGroup }: any) => {
  const [selectedType, setSelectedType] = useState("Jpg")
  const editor = useEditor()
  const objects: any = useObjects()
  const [qualityVal, setQualtiyVal] = useState(80)
  const [sizeVal, setSizeVal] = useState(1)
  const minQuality = 1
  const maxQuality = 100
  const minSize = 0.1
  const maxSize = 3
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

  const exportHandler = useCallback(async () => {
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
      const nWidth = frame.width * sizeVal
      const nHeight = frame.height * sizeVal
      if (selectedType != "svg") {
        makeDownloadToPNG(image, selectedType, nHeight, nWidth)
      } else makeDownloadToSVG(image, { width: nWidth, height: nHeight })
    }
  }, [editor, selectedType, frame, objects, sizeVal])

  const makeDownloadToSVG = useCallback(makeDownloadToSVGHandler, [frame])

  return (
    <Block className={clsx(typeOfDownload === "single-layer" ? "single-download" : "download-wrapper")}>
      <Block className="downloadPopup">
        <Block
          className={clsx(classes.downloadPopup, typeOfDownload==="single-layer"&&classes.singleLayerDownload, "d-flex justify-flex-start align-items-start p-absolute flex-column",
          typeGroup&&classes.groupDownload
          )}
        >
          <Block className="pb-2">
            <div className={clsx("pb-1", classes.subHeading)}>File Type</div>
            <SelectInput handleChange={handleTypeChange} selectedType={selectedType} typeOfDownload={typeOfDownload} />
          </Block>
          <Block className="mb-1">
            <div className={clsx("mb-0", classes.subHeading)}>Size</div>
            <SliderBar
              step={0.05}
              width={typeOfDownload==="single-layer"?"210px":"424px"}
              minVal={minSize}
              maxVal={maxSize}
              thumbSize={"14px"}
              val={[sizeVal]}
              handleChange={handleSizeChange}
            />
            <div className={classes.subHeading}>
              <span> {`${frame?.width * sizeVal} * ${frame?.height * sizeVal}`}px</span>
            </div>
          </Block>
          {(selectedType === "Jpg" || selectedType === "Jpeg") && (
            <Block className="mb-1 mt-1">
              <div className={clsx("mb-0", classes.subHeading)}>Quality</div>
              <SliderBar
              width={typeOfDownload==="single-layer"?"210px":"424px"}
              minVal={minQuality}
                maxVal={maxQuality}
                thumbSize={"14px"}
                val={[qualityVal]}
                handleChange={handleQualityChange}
              />
              <div className={clsx("mb-1", classes.subHeading)}>
                {" "}
                <span>File Size : Medium</span>
              </div>
            </Block>
          )}
          <Block className="d-flex justify-content-start flex-wrap">
            <Block>
              <button className={clsx(classes.downloadBtn, classes.hdBtn,typeOfDownload==="single-layer"&&classes.singleLayerDownloadBtn)}>Download HD</button>
              <div className={clsx(classes.subText, "pt-1 pb-2 flex-center m-auto")}>
                1 Credit <div className={clsx(classes.circleDot, "mx-1")}></div>
                Full Image (2157 × 1440)
              </div>
            </Block>
            <Block>
              <Block className="d-flex justify-content-start flex-column">
                <button className={clsx(classes.downloadBtn,typeOfDownload==="single-layer"&&classes.singleLayerDownloadBtn)} title={"Download"} onClick={exportHandler}>
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

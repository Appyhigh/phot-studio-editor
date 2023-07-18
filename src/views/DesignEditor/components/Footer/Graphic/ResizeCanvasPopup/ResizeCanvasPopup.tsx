import { Block } from "baseui/block"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { useEditor, useFrame } from "@layerhub-io/react"
import { useEffect, useState } from "react"
import { fixedSizeFrameTypes } from "~/constants/editor"
import CommonInput from "~/components/UI/Common/Input"
import ResizeFrameCanvas from "../ResizeCanvasTypes"
import Icons from "~/components/Icons"
import { useStyletron } from "baseui"
import { backgroundLayerType } from "~/constants/contants"
import classes from "./style.module.css"
import clsx from "clsx"
import useFabricEditor from "src/hooks/useFabricEditor"

const ResizeCanvasPopup = ({ show, type }: any) => {
  const [desiredFrame, setDesiredFrame] = useState<any>({
    width: "",
    height: "",
  })

  const { fabricEditor, setFabricEditor } = useFabricEditor()


  useEffect(()=>{
  console.log(fabricEditor)
  },[fabricEditor])

  const { canvas, objects }: any = fabricEditor

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
    if (type === "ModalCanvas") {
      const size = activeKey === "0" ? selectedFrame : desiredFrame

      console.log(parseInt(size.width), parseInt(size.height))

      let canvasWidth = 400
      let canvasHeight = 400
      let DesiredWidth = parseInt(size.width)
      let DesiredHeight = parseInt(size.height)
      let scale = 1
      if (DesiredHeight >= canvasHeight || DesiredWidth >= canvasWidth) {
        if (DesiredWidth / canvasWidth > DesiredHeight / canvasHeight) {
          scale = canvasWidth / DesiredWidth
        } else {
          scale = canvasHeight / DesiredHeight
        }
      }

      console.log(scale)

      setFabricEditor((prev) => ({ ...prev, productPhotoShootScale: scale }))

      canvas.setDimensions({
        width: DesiredWidth * scale,
        height: DesiredHeight * scale,
      })

      // if (parseInt(size.width) >= 1500 || parseInt(size.height) >= 1500) {
      //   canvas.setDimensions({
      //     width: parseInt(size.width) * 0.35,
      //     height: parseInt(size.height) * 0.35,
      //   })
      // }
      // else if (parseInt(size.width) >= 1000 || parseInt(size.height) >= 1000) {
      //   canvas.setDimensions({
      //     width: parseInt(size.width) * 0.45,
      //     height: parseInt(size.height) * 0.45,
      //   })
      // }
      // else if (parseInt(size.width) >= 800 || parseInt(size.height) >= 800) {
      //   canvas.setDimensions({
      //     width: parseInt(size.width) * 0.5,
      //     height: parseInt(size.height) * 0.5,
      //   })
      // } else if (parseInt(size.width) >= 600 || parseInt(size.height) >= 600) {
      //   canvas.setDimensions({
      //     width: parseInt(size.width) * 0.7,
      //     height: parseInt(size.height) * 0.7,
      //   })
      // } else {
      //   canvas.setDimensions({
      //     width: parseInt(size.width),
      //     height: parseInt(size.height),
      //   })
      // }
    } else {
      const size = activeKey === "0" ? selectedFrame : desiredFrame
      if (editor) {
        const bgObject = editor.frame.background.canvas._objects.filter((el: any) => el?.type === "BackgroundImage")[0]

        if (bgObject) {
          editor.frame.resize({ width: frame.width, height: frame.height })
          editor.objects.remove(bgObject.id)
          const options = {
            type: "BackgroundImage",
            src: bgObject.preview,
            preview: bgObject.preview,
            metadata: { generationDate: new Date().getTime(), type: backgroundLayerType },
          }
          // Timeout works as a fix so canvas does not get dislocated

          editor.objects.add(options).then(() => {
            setTimeout(() => {
              editor.objects.setAsBackgroundImage()
            }, 100)
          })
        }
        setDesiredFrame({
          width: parseInt(size.width),
          height: parseInt(size.height),
        })
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
      setTimeout(() => {
        editor.history.initialize()
        editor.history.reset()
        editor.history.save()
        editor.history.reset()
        editor.history.save()
      }, 200)
    }

    // after resizing dont allow undo operation
  }

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
        <div
          className={clsx(
            classes.resizeCanvasContainer,
            "d-flex align-items-start flex-column p-absolute resizeCanvasCon"
          )}
        >
          <div className={clsx(classes.chevronTopIcon, "p-absolute")}>
            <Icons.SliderBtn size={106} width="10" />
          </div>
          <div className={classes.subSection}>
            <div className={clsx(classes.subHeading, "pt-1 pb-1")}>Custom Size</div>
            <div className="d-flex justify-content-center flex-column">
              <div className="d-flex justify-content-center flex-row">
                <div className="mr-1">
                  <CommonInput
                    type="number"
                    placeholder="Width"
                    handleChange={handleWidth}
                    value={desiredFrame.width ?? desiredFrame.width}
                    width="88px"
                    height="32px"
                  />
                </div>
                <CommonInput
                  type="number"
                  placeholder="Height"
                  handleChange={handleHeight}
                  value={desiredFrame.height ?? desiredFrame.height}
                  width="88px"
                  height="32px"
                />
              </div>
            </div>
          </div>

          <div className={classes.horizontalLine}></div>

          <div className={clsx(classes.subSection, "mt-2 mx-2 ")}>
            <div className={clsx(classes.subHeading, "pt-1 pb-1")}> Fixed Size</div>
            <Block className="d-flex justify-content-start flex-row flex-wrap ml-1">
              {fixedSizeFrameTypes.map((sample, index) => {
                const { img, name, subHeading, imgHeight, id } = sample
                // @ts-ignore
                const Component = ResizeFrameCanvas[img]
                return (
                  <Block
                    key={index}
                    className={clsx(
                      index == 1 || index == 4 || index == 7 ? classes.oddOption : classes.evenOption,
                      "flex-center-column  text-center pointer"
                    )}
                    onClick={() => {
                      setActiveKey("0")
                      setSelectedFrame(sample)
                    }}
                  >
                    <Block style={{ height: imgHeight, marginBottom: "8px" }} className="flex-center">
                      {Component && <Component color={id === selectedFrame.id ? "#000" : "#92929D"} />}
                    </Block>
                    <div className={classes.optionHeading}>{name}</div>
                    <p className={classes.optionSubHeading}>{subHeading}</p>
                  </Block>
                )
              })}
            </Block>
          </div>

          <button
            disabled={!isEnabled}
            onClick={applyResize}
            className={clsx(classes.resizeBtn, isEnabled && classes.isEnabledBtn)}
          >
            Resize Template
          </button>
        </div>
      </Block>
    </Block>
  )
}

export default ResizeCanvasPopup

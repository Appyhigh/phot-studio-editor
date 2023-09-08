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

  const { fabricEditor } = useFabricEditor()

  const { canvas, objects }: any = fabricEditor

  const [selectedFrame, setSelectedFrame] = useState<any>({
    id: 0,
    width: 0,
    height: 0,
  })
  useEffect(() => {
    if (desiredFrame.width == 1024 && desiredFrame.height == 768) {
      setSelectedFrame(fixedSizeFrameTypes[0])
    } else if (desiredFrame.width == 1920 && desiredFrame.height == 1080) {
      setSelectedFrame(fixedSizeFrameTypes[1])
    } else if (desiredFrame.width == 512 && desiredFrame.height == 1024) {
      setSelectedFrame(fixedSizeFrameTypes[2])
    } else if (desiredFrame.width == 1080 && desiredFrame.height == 1080) {
      setSelectedFrame(fixedSizeFrameTypes[3])
    } else if (desiredFrame.width == 1200 && desiredFrame.height == 1200) {
      setSelectedFrame(fixedSizeFrameTypes[4])
    } else if (desiredFrame.width == 1702 && desiredFrame.height == 630) {
      setSelectedFrame(fixedSizeFrameTypes[5])
    } else if (desiredFrame.width == 1280 && desiredFrame.height == 720) {
      setSelectedFrame(fixedSizeFrameTypes[6])
    } else if (desiredFrame.width == 1200 && desiredFrame.height == 675) {
      setSelectedFrame(fixedSizeFrameTypes[7])
    } else {
      setSelectedFrame({
        id: 0,
        width: 0,
        height: 0,
      })
    }
  }, [desiredFrame])

  const [activeKey, setActiveKey] = useState<string | number>("0")

  const { currentDesign, setCurrentDesign } = useDesignEditorContext()
  const editor = useEditor()

  const frame = useFrame()
  const applyResize = () => {
    if (type === "ModalCanvas") {
      // const size = activeKey === "0" ? selectedFrame : desiredFrame

      // const containerWidth = 600
      // const containerHeight = 440

      // const scaleX = 900/parseInt(size.width) 
      // const scaleY = 600/parseInt(size.height) 
      // const scale = Math.min(scaleX, scaleY)

      // canvas.setDimensions({
      //   width: 900 * scale,
      //   height: 600 * scale,
      // })
      // canvas.setWidth(900*scale);
      // canvas.setHeight(600*scale);

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
            <div className={clsx(classes.subHeading, "pt-1 pb-2")}> Fixed Size</div>
            <Block className={classes.contentWrap}>
              {fixedSizeFrameTypes.map((sample, index) => {
                const { img, name, subHeading, imgHeight, id } = sample
                // @ts-ignore
                const Component = ResizeFrameCanvas[img]
                return (
                  <Block
                    key={index}
                    className={clsx(
                      classes.evenOption,
                      "flex-center-column  text-center pointer ",
                      id === selectedFrame.id && classes.addBorder

                    )}
                    onClick={() => {
                      setActiveKey("0")
                      setSelectedFrame(sample)
                    }}
                  >
                    <Block style={{ height: '60px', marginBottom: '6px' }} className="flex-center">
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
    </Block >
  )
}

export default ResizeCanvasPopup

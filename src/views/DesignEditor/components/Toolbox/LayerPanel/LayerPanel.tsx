import React, { useEffect, useState } from "react"
import { useActiveObject, useEditor, useObjects } from "@layerhub-io/react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { ILayer } from "@layerhub-io/types"
import { styled } from "baseui"
import getSelectionType from "~/utils/get-selection-type"
import useAppContext from "~/hooks/useAppContext"
import Icons from "~/components/Icons"
import ObjectLayer from "./ObjectLayer/ObjectLayer"
import { backgroundLayerType } from "~/constants/contants"
import classes from "./style.module.css"
import clsx from "clsx"
import TextLayer from "./TextLayer/TextLayer"
import BgLayer from "./BgLayer/BgLayer"

interface ToolboxState {
  toolbox: string
}
const DEFAULT_TOOLBOX = "Canvas"

const Container = styled("div", (props) => ({
  minWidth: "300px",
  height: "100%",
  display: "flex",
}))

interface layerProps {
  isOpenSlider: boolean
  bgLayer: boolean
  objectLayer: boolean
  textLayer: boolean
}

const LayerPanel = () => {
  const [state, setState] = React.useState<ToolboxState>({ toolbox: "Text" })
  const { setActiveSubMenu } = useAppContext()
  const [layerState, setLayerState] = useState<layerProps>({
    isOpenSlider: false,
    bgLayer: false,
    objectLayer: false,
    textLayer: false,
  })
  const [showObjectLayer, setShowObjectLayer] = useState(false)
  const [showTextLayer, setShowTextLayer] = useState(false)
  const handleCloseObjectLayer = () => {
    setLayerState((prev) => ({ ...prev, objectLayer: false }))
  }
  const handleCloseTextLayer = () => {
    setLayerState((prev) => ({ ...prev, textLayer: false }))
  }

  const handleCloseBgLayer = () => {
    setLayerState((prev) => ({ ...prev, bgLayer: false }))
  }
  const editor = useEditor()
  const objects = useObjects() as ILayer[]
  const activeObject = useActiveObject() as any
  const [layerObjects, setLayerObjects] = React.useState<any[]>([])
  const [activeLayerPanel, setActiveLayerPanel] = useState<any>(null)

  const [bgUrl, setBgUrl] = useState<any>("")

  React.useEffect(() => {
    const isBackgroundAnImage = editor?.frame?.background?.canvas?._objects[2]?.preview?.length > 0
    const isBackgroundAColor =
      (!editor?.frame?.background?.canvas?._objects[2]?.preview ||
        editor?.frame?.background?.canvas?._objects[2]?.preview.length === 0) &&
      editor?.frame?.background?.fill

    const backgroundColor = editor?.frame?.background?.fill
    const backgroundImage = editor?.frame?.background?.canvas?._objects[2]?.preview

    if (isBackgroundAnImage) {
      setBgUrl(backgroundImage)
    } else if (isBackgroundAColor) {
      setBgUrl(backgroundColor)
    }
  }, [editor?.frame?.background?.canvas?._objects[2], editor?.frame?.background?.fill])

  React.useEffect(() => {
    if (objects) {
      setLayerObjects(objects.reverse())
    }
  }, [objects])

  React.useEffect(() => {
    let watcher = async () => {
      if (objects) {
        setLayerObjects([...objects.reverse()])
      }
    }
    if (editor) {
      editor.on("history:changed", watcher)
    }
    return () => {
      if (editor) {
        editor.off("history:changed", watcher)
      }
    }
  }, [editor, objects])
  React.useEffect(() => {
    const selectionType = getSelectionType(activeObject)
    if (selectionType) {
      if (selectionType.length > 1) {
        setState({ toolbox: "Multiple" })
      } else {
        setState({ toolbox: selectionType[0] })
      }
    } else {
      setState({ toolbox: DEFAULT_TOOLBOX })
      setActiveSubMenu("")
    }
  }, [activeObject])

  useEffect(() => {
    if (activeObject?.id && layerState.isOpenSlider) {
      if (activeObject?.text) {
        setLayerState((prev) => ({ ...prev, textLayer: true, isOpenSlider: true, objectLayer: false, bgLayer: false }))
      } else if (activeObject?.metadata?.type == backgroundLayerType) {
        setLayerState((prev) => ({ ...prev, textLayer: false, isOpenSlider: true, objectLayer: false, bgLayer: true }))
      } else {
        setLayerState((prev) => ({ ...prev, textLayer: false, isOpenSlider: true, objectLayer: true, bgLayer: false }))
      }
      setActiveLayerPanel(activeObject)
    }
  }, [activeObject])

  const check_group = (_id: any) => {
    const ans = activeObject?._objects?.filter((x: any) => {
      return x.id === _id
    })
    return ans?.length >= 1 ? true : false
  }

  return (
    <div className="d-flex flex-column p-relative">
      <Container
        className="p-relative"
        style={{
          minWidth: layerState.isOpenSlider ? "300px" : "105px",
          maxWidth: "400px",
        }}
      >
        <Block className="flex-center">
          <Block
            className="pointer"
            onClick={() => {
              if (layerState.isOpenSlider) {
                setLayerState((prev) => ({
                  ...prev,
                  isOpenSlider: false,
                  bgLayer: false,
                  objectLayer: false,
                  textLayer: false,
                }))
              } else {
                setLayerState((prev) => ({ ...prev, isOpenSlider: true }))
              }
            }}
          >
            <Block>
              <div className="p-relative" style={{ marginRight: "-1px" }}>
                <div style={{ transform: "scaleX(-1)" }}>
                  <Icons.SliderBtn size={106} />
                </div>

                <div
                  className="p-absolute"
                  style={{
                    top: "36%",
                    left: "35%",
                    transform: layerState.isOpenSlider ? "scaleX(-1)" : "scaleX(1)",
                  }}
                >
                  <Icons.SliderIcon size={15} />
                </div>
              </div>
            </Block>
          </Block>
        </Block>
        <Block className="d-flex flex-column flex-1" style={{ backgroundColor: "#FFF" }}>
          {layerState.objectLayer ? (
            <ObjectLayer showLayer={layerState.objectLayer} handleClose={handleCloseObjectLayer} />
          ) : layerState.textLayer ? (
            <TextLayer showLayer={layerState.textLayer} handleClose={handleCloseTextLayer} />
          ) : layerState.bgLayer ? (
            <BgLayer showLayer={layerState.bgLayer} handleClose={handleCloseBgLayer} />
          ) : (
            <Scrollable autoHide={true}>
              <Block className="p-1">
                {/* {layerObjects.length === 0 ? (
                <Box />
              ) : (
                
              )} */}
                {layerObjects
                  .filter(
                    (el) =>
                      el.metadata?.type !== backgroundLayerType &&
                      el.preview !== editor?.frame?.background?.canvas?._objects[2]?.preview &&
                      el.type !== "BackgroundImage"
                  )
                  .sort((a, b) => b.metadata?.generationDate - a.metadata?.generationDate)
                  .map((object) => {
                    if (object._objects) {
                      return (
                        <Block
                          className="pointer"
                          $style={{
                            fontSize: "14px",
                            backgroundColor: "rgb(245,246,247)",
                            ":hover": {
                              background: "rgb(245,246,247)",
                            },
                          }}
                          key={object.id}
                        >
                          {object._objects.map((object: any) => {
                            return (
                              <Block
                                className="d-flex justify-content-start align-items-center pointer"
                                $style={{
                                  fontSize: "14px",
                                  backgroundColor: check_group(object.id)
                                    ? "rgb(245,246,247)"
                                    : activeObject?.id == object.id
                                    ? "rgb(245,246,247)"
                                    : "#E3E6FF",
                                  ":hover": {
                                    background: "rgb(245,246,247)",
                                  },
                                }}
                                key={object.id}
                                onClick={() => {
                                  if (object.text) {
                                    setLayerState((prev) => ({
                                      ...prev,
                                      isOpenSlider: true,
                                      textLayer: true,
                                      objectLayer: false,
                                      bgLayer: false,
                                    }))
                                  } else if (object.metadata?.type === backgroundLayerType) {
                                    setLayerState((prev) => ({
                                      ...prev,
                                      isOpenSlider: true,
                                      bgLayer: true,
                                      textLayer: false,
                                      objectLayer: false,
                                    }))
                                  } else
                                    setLayerState((prev) => ({
                                      ...prev,
                                      isOpenSlider: true,
                                      objectLayer: true,
                                      textLayer: false,
                                      bgLayer: false,
                                    }))

                                  setActiveLayerPanel(object)
                                }}
                              >
                                {object.text ? (
                                  <div
                                    className={clsx(
                                      "d-flex justify-content-center align-items-center",
                                      classes.textLayer
                                    )}
                                  >
                                    <div
                                      className={clsx(
                                        classes.eachLayer,
                                        layerState.isOpenSlider
                                          ? classes.showObjectTextLayer
                                          : classes.hideShowObjectLayerText,
                                        "flex-center"
                                      )}
                                    >
                                      <Icons.TextIcon size={21} />{" "}
                                    </div>
                                  </div>
                                ) : (
                                  <img
                                    src={object.preview}
                                    style={{
                                      borderRadius: "4px",
                                      width: layerState.isOpenSlider ? "40px" : "48px",
                                      height: layerState.isOpenSlider ? "40px" : "48px",
                                    }}
                                    alt="nn"
                                    className="mx-1 my-1"
                                  />
                                )}
                                {layerState.isOpenSlider && <Block>{object.name}</Block>}
                              </Block>
                            )
                          })}
                        </Block>
                      )
                    } else {
                      return (
                        <Block
                          className="d-flex justify-content-start align-items-center pointer"
                          $style={{
                            fontSize: "14px",
                            backgroundColor: check_group(object.id)
                              ? "rgb(245,246,247)"
                              : activeObject?.id == object.id
                              ? "rgb(245,246,247)"
                              : "#fff",
                            ":hover": {
                              background: "rgb(245,246,247)",
                            },
                          }}
                          key={object.id}
                          onClick={() => {
                            if (object.text) {
                              setLayerState((prev) => ({
                                ...prev,
                                isOpenSlider: true,
                                textLayer: true,
                                objectLayer: false,
                                bgLayer: false,
                              }))
                            } else if (object.metadata?.type === backgroundLayerType) {
                              setLayerState((prev) => ({
                                ...prev,
                                isOpenSlider: true,
                                bgLayer: true,
                                textLayer: false,
                                objectLayer: false,
                              }))
                            } else
                              setLayerState((prev) => ({
                                ...prev,
                                isOpenSlider: true,
                                objectLayer: true,
                                textLayer: false,
                                bgLayer: false,
                              }))

                            setActiveLayerPanel(object)

                            editor.objects.select(object.id)
                          }}
                        >
                          {object.text ? (
                            <div
                              className={clsx("d-flex justify-content-center align-items-center", classes.textLayer)}
                            >
                              <div
                                className={clsx(
                                  classes.eachLayer,
                                  layerState.isOpenSlider
                                    ? classes.showObjectTextLayer
                                    : classes.hideShowObjectLayerText,
                                  "flex-center"
                                )}
                              >
                                <Icons.TextIcon size={21} />{" "}
                              </div>
                            </div>
                          ) : (
                            <img
                              src={object.preview}
                              style={{
                                borderRadius: "4px",
                                width: layerState.isOpenSlider ? "40px" : "48px",
                                height: layerState.isOpenSlider ? "40px" : "48px",
                              }}
                              alt="nn"
                              className="mx-1 my-1"
                            />
                          )}
                          {layerState.isOpenSlider && <Block>{object.name}</Block>}
                        </Block>
                      )
                    }
                  })}
                <Block
                  className="d-flex justify-content-start align-items-center pointer"
                  $style={{
                    fontSize: "14px",
                    backgroundColor: "#fff",
                    ":hover": {
                      background: "rgb(245,246,247)",
                    },
                  }}
                  onClick={() => {
                    setLayerState((prev) => ({
                      ...prev,
                      isOpenSlider: true,
                      bgLayer: true,
                      textLayer: false,
                      objectLayer: false,
                    }))
                  }}
                >
                  {!bgUrl.startsWith("#") ? (
                    <img
                      src={bgUrl}
                      alt="nn"
                      style={{
                        width: layerState.isOpenSlider ? "40px" : "48px",
                        height: layerState.isOpenSlider ? "40px" : "48px",
                      }}
                      className={clsx(classes.bgImage, "mx-1 my-1")}
                    />
                  ) : (
                    <div
                      style={{
                        width: layerState.isOpenSlider ? "40px" : "48px",
                        height: layerState.isOpenSlider ? "40px" : "48px",
                        backgroundColor: bgUrl,
                      }}
                      className={clsx(classes.bgImage, "mx-1 my-1")}
                    >
                      &nbsp;
                    </div>
                  )}
                  {layerState.isOpenSlider && <Block>Background</Block>}
                </Block>
              </Block>
            </Scrollable>
          )}
        </Block>
      </Container>
    </div>
  )
}

export default LayerPanel

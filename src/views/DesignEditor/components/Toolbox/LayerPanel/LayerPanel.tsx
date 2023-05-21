import React, { useEffect, useRef, useState } from "react"
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
import GroupIcon from "~/components/Icons/GroupIcon"
import SingleLayerIcon from "~/components/Icons/SingleLayerIcon"
import SingleLayerExport from "~/views/DesignEditor/SingleLayerExport/SingleLayerExport"

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
  const [showSinlgeLayer, setShowSingleLayer] = useState(false)
  const rightPanelRef = useRef()
  const [activeSingleLayer, setActiveSingleLayer] = useState()

  const [layerState, setLayerState] = useState<layerProps>({
    isOpenSlider: false,
    bgLayer: false,
    objectLayer: false,
    textLayer: false,
  })
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

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      // @ts-ignore
      if (showSinlgeLayer && rightPanelRef.current && !rightPanelRef.current.contains(e.target)) {
        setShowSingleLayer(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [showSinlgeLayer])
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
    if (activeObject?.id && layerState.isOpenSlider&&!showSinlgeLayer) {
      if (activeObject?.text || activeObject?.name === "StaticText") {
        setLayerState((prev) => ({ ...prev, textLayer: true, isOpenSlider: true, objectLayer: false, bgLayer: false }))
      } else if (activeObject?.metadata?.type == backgroundLayerType) {
        setLayerState((prev) => ({ ...prev, textLayer: false, isOpenSlider: true, objectLayer: false, bgLayer: true }))
      } else if (activeObject?.name === "StaticImage") {
        setLayerState((prev) => ({ ...prev, textLayer: false, isOpenSlider: true, objectLayer: true, bgLayer: false }))
      } else {
        setLayerState((prev) => ({ ...prev, textLayer: false, isOpenSlider: true, objectLayer: false, bgLayer: false }))
      }
      setActiveLayerPanel(activeObject)
    } else if (layerState.isOpenSlider) {
      setLayerState((prev) => ({ ...prev, textLayer: false, isOpenSlider: true, objectLayer: false, bgLayer: false }))
    }
  }, [activeObject])

  const check_group = (_id: any) => {
    const ans = activeObject?._objects?.filter((x: any) => {
      return x.id === _id
    })
    return ans?.length >= 1 ? true : false
  }

  return (
    // @ts-ignore
    <div className="d-flex flex-column p-relative" ref={rightPanelRef}>
      <Container
        className="p-relative"
        style={{
          minWidth: layerState.isOpenSlider ? "300px" : "111px",
          maxWidth: "400px",
        }}
      >
      <SingleLayerExport isOpenSlider={layerState.isOpenSlider} show={showSinlgeLayer} />

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

        <Block className="d-flex flex-column flex-1 p-relative pt-2" style={{ backgroundColor: "#FFF" }}>
          {layerState.objectLayer ? (
            <ObjectLayer showLayer={layerState.objectLayer} handleClose={handleCloseObjectLayer} />
          ) : layerState.textLayer ? (
            <TextLayer showLayer={layerState.textLayer} handleClose={handleCloseTextLayer} />
          ) : layerState.bgLayer ? (
            <BgLayer showLayer={layerState.bgLayer} handleClose={handleCloseBgLayer} />
          ) : (
            <Scrollable autoHide={true}>
              <Block className="py-1">
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
                          className={clsx(classes.eachLayerSection, "pointer p-relative eachLayerSec")}
                          $style={{
                            fontSize: "14px",
                            backgroundColor: "rgb(245,246,247)",
                            ":hover": {
                              background: "rgb(245,246,247)",
                            },
                          }}
                          key={object.id}
                        >
                          {object._objects.map((object: any, index: number) => {
                            return (
                              <Block
                                key={index}
                                className="d-flex flex-column align-items-center eachLayerSec p-relative"
                                $style={{
                                  fontSize: "14px",
                                  backgroundColor: "#E3E6FF",
                                }}
                              >
                                <div
                                  className={"threeDotsIcon"}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    editor.objects.select(object.id)
                                    setActiveSingleLayer(object)
                                    setShowSingleLayer(true)
                                  }}
                                >
                                  <SingleLayerIcon />
                                </div>
                                {index !== 0 && <GroupIcon />}
                                <Block
                                  className="d-flex justify-content-start align-items-center pointer w-100"
                                  key={object.id}
                                  onClick={() => {
                                    if (object.text || object.name === "StaticText") {
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
                                  {object.text || object.name === "StaticText" ? (
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
                                        width: layerState.isOpenSlider ? "40px" : "60px",
                                        height: layerState.isOpenSlider ? "40px" : "60px",
                                      }}
                                      alt="nn"
                                      className="mx-1 my-1"
                                    />
                                  )}
                                  {layerState.isOpenSlider && <Block>{object.name}</Block>}
                                </Block>
                              </Block>
                            )
                          })}
                        </Block>
                      )
                    } else {
                      return (
                        <Block
                          className="d-flex justify-content-start align-items-center pointer p-relative eachLayerSec"
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
                            if (object.text || object.name === "StaticText") {
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
                          <div
                            className={"threeDotsIcon"}
                            onClick={(e) => {
                              e.stopPropagation()
                              editor.objects.select(object.id)
                              setActiveSingleLayer(object)
                              setShowSingleLayer(true)
                            }}
                          >
                            <SingleLayerIcon />
                          </div>
                          {object.text || object.name === "StaticText" ? (
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
                                width: layerState.isOpenSlider ? "40px" : "60px",
                                height: layerState.isOpenSlider ? "40px" : "60px",
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
                  className="d-flex justify-content-start align-items-center pointer p-relative eachLayerSec"
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
                        width: layerState.isOpenSlider ? "40px" : "60px",
                        height: layerState.isOpenSlider ? "40px" : "60px",
                      }}
                      className={clsx(classes.bgImage)}
                    />
                  ) : (
                    <div
                      style={{
                        width: layerState.isOpenSlider ? "40px" : "60px",
                        height: layerState.isOpenSlider ? "40px" : "60px",
                        backgroundColor: bgUrl,
                      }}
                      className={clsx(classes.bgImage)}
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

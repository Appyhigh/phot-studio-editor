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

  const [showSingleLayer, setShowSingleLayer] = useState(false)
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
  const [selectedSingleId, setSelectedSingleId] = useState("")

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      // @ts-ignore
      if (showSingleLayer && rightPanelRef.current && !rightPanelRef.current.contains(e.target)) {
        setShowSingleLayer(false)
        setSelectedSingleId("")
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [showSingleLayer, selectedSingleId])

  const [bgUrl, setBgUrl] = useState<any>("")

  // not allowed to select bg image so that it does not detached

  useEffect(() => {
    if (activeObject) {
      if (activeObject?.type === "BackgroundImage") {
        editor.objects.deselect()
        editor.objects.select("frame")
      }
    }
  }, [activeObject])

  React.useEffect(() => {
    if (editor) {
      const bgImageIndex = editor?.frame?.background?.canvas?._objects.findIndex(
        (el: any) => el.type === "BackgroundImage" || el?.metadata?.type === backgroundLayerType
      )
      if (bgImageIndex !== -1) {
        setBgUrl(editor?.frame?.background?.canvas?._objects[bgImageIndex].preview)
      } else {
        setBgUrl(editor?.frame?.background?.fill)
      }
    }
  }, [
    activeObject,
    editor?.frame?.background?.fill,
    editor?.frame?.background?.canvas?._objects,
    editor?.frame?.background?.canvas?._objects.findIndex((el: any) => el.type === "BackgroundImage"),
  ])

  React.useEffect(() => {
    if (objects) {
      setLayerObjects(objects)
    }
  }, [objects])

  React.useEffect(() => {
    let watcher = async () => {
      if (objects) {
        setLayerObjects([...objects])
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
    if (activeObject?.id && layerState.isOpenSlider && !showSingleLayer) {
      if (activeObject?.text || activeObject?.name === "StaticText") {
        setLayerState((prev) => ({ ...prev, textLayer: true, isOpenSlider: true, objectLayer: false, bgLayer: false }))
        setShowSingleLayer(false)
      } else if (
        activeObject?.metadata?.type == backgroundLayerType ||
        activeObject?.metadata?.type == "deviceUpload"
      ) {
        setLayerState((prev) => ({ ...prev, textLayer: false, isOpenSlider: true, objectLayer: false, bgLayer: true }))
        setShowSingleLayer(false)
      } else if (activeObject?.name === "StaticImage") {
        setLayerState((prev) => ({ ...prev, textLayer: false, isOpenSlider: true, objectLayer: true, bgLayer: false }))
        setShowSingleLayer(false)
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
            <Scrollable
              onScroll={() => {
                setShowSingleLayer(false)
              }}
              autoHide={true}
            >
              <Block className="p-1">
                {editor &&
                  editor.scene
                    .exportToJSON()
                    .layers.filter((el) => {
                      return (
                        el.metadata?.type !== backgroundLayerType &&
                        el.type !== "BackgroundImage" &&
                        el.type !== "Background"
                      )
                    })
                    .reverse()
                    .map((obj: any, idx: number) => {
                      const grp_id = obj.id
                      if (obj?.objects) {
                        return (
                          <div key={idx}>
                            {selectedSingleId === grp_id && (
                              <SingleLayerExport
                                isOpenSlider={layerState.isOpenSlider}
                                show={showSingleLayer}
                                selectedSingleId={selectedSingleId}
                              />
                            )}
                            <Block
                              onClick={() => {
                                editor.objects.select(obj.id)
                              }}
                              className={clsx(classes.eachLayerSection, "pointer p-relative eachLayerSec")}
                              $style={{
                                fontSize: "14px",
                                backgroundColor: "rgb(245,246,247)",
                                ":hover": {
                                  background: "rgb(245,246,247)",
                                },
                              }}
                            >
                              {obj.objects.map((object: any, index: number) => {
                                return (
                                  <Block
                                    key={index}
                                    className="d-flex flex-column align-items-center eachLayerSec p-relative"
                                    $style={{
                                      fontSize: "14px",
                                      backgroundColor: "#E3E6FF",
                                    }}
                                  >
                                    {index === 0 && (
                                      <div
                                        className={"threeDotsIcon"}
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          editor.objects.select(grp_id)
                                          setActiveSingleLayer(object)
                                          setShowSingleLayer(true)
                                          setSelectedSingleId(grp_id)
                                        }}
                                      >
                                        <SingleLayerIcon />
                                      </div>
                                    )}
                                    {index !== 0 && (
                                      <div
                                        onClick={() => {
                                          editor.objects.select(obj.id)
                                          editor.objects.ungroup()
                                        }}
                                      >
                                        <GroupIcon />
                                      </div>
                                    )}
                                    <Block
                                      className="d-flex justify-content-start align-items-center pointer w-100"
                                      key={object.id}
                                    >
                                      {object.text || object.name === "StaticText" ? (
                                        <div
                                          className={clsx(
                                            "d-flex justify-content-center align-items-center",
                                            classes.textLayer
                                          )}
                                        >
                                          <div
                                            style={{ transform: "translateX(-7px)" }}
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
                                          className="m-1"
                                          src={object.preview ?? object.src}
                                          style={{
                                            borderRadius: "4px",
                                            width: layerState.isOpenSlider ? "50px" : "60px",
                                            height: layerState.isOpenSlider ? "50px" : "60px",
                                          }}
                                          alt="nn"
                                        />
                                      )}
                                      {layerState.isOpenSlider &&
                                        (object.text || object.name === "StaticText" ? (
                                          <Block>
                                            {object?.text?.length > 30 ? object?.text?.substring(0, 30) + "..." : object?.text}
                                          </Block>
                                        ) : (
                                          <Block className="ml-2">{"Image " + object.name}</Block>
                                        ))}{" "}
                                    </Block>
                                  </Block>
                                )
                              })}
                            </Block>
                          </div>
                        )
                      } else {
                        return (
                          <div key={obj.id}>
                            {selectedSingleId === obj.id && (
                              <SingleLayerExport
                                isOpenSlider={layerState.isOpenSlider}
                                show={showSingleLayer}
                                selectedSingleId={selectedSingleId}
                              />
                            )}
                            <Block
                              className="d-flex justify-content-start align-items-center pointer p-relative eachLayerSec"
                              $style={{
                                fontSize: "14px",
                                backgroundColor: check_group(obj.id)
                                  ? "#F1F1F5"
                                  : activeObject?.id == obj.id
                                  ? "#F1F1F5"
                                  : "#fff",
                                ":hover": {
                                  background: "#F1F1F5",
                                },
                              }}
                              onClick={() => {
                                if (obj.text || obj.name === "StaticText") {
                                  setLayerState((prev) => ({
                                    ...prev,
                                    isOpenSlider: true,
                                    textLayer: true,
                                    objectLayer: false,
                                    bgLayer: false,
                                  }))
                                } else if (obj.metadata?.type === backgroundLayerType) {
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
                                setShowSingleLayer(false)
                                setActiveLayerPanel(obj)

                                editor.objects.select(obj.id)
                              }}
                            >
                              <div
                                className={"threeDotsIcon"}
                                id={obj.id}
                                onClick={(e) => {
                                  e.stopPropagation()

                                  setSelectedSingleId(obj.id)
                                  editor.objects.select(obj.id)
                                  setActiveSingleLayer(obj)
                                  setShowSingleLayer(true)
                                }}
                              >
                                <SingleLayerIcon />
                              </div>
                              {obj.text || obj.name === "StaticText" ? (
                                <div
                                  className={clsx(
                                    "d-flex justify-content-center align-items-center",
                                    classes.textLayer
                                  )}
                                >
                                  <div
                                    style={{ transform: "translateX(-7px)" }}
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
                                  src={obj.preview ?? obj.src}
                                  alt="nn"
                                  className={clsx(
                                    classes.bgImage,
                                    layerState.isOpenSlider && classes.bgCloseImage,
                                    classes.bgRemovedImg
                                  )}
                                />
                              )}
                              {layerState.isOpenSlider &&
                                (obj.text || obj.name === "StaticText" ? (
                                  <Block>
                                    {obj?.text?.length > 30 ? obj?.text?.substring(0, 30) + "..." : obj?.text}
                                  </Block>
                                ) : (
                                  <Block>{"Image " + obj.name}</Block>
                                ))}
                            </Block>
                          </div>
                        )
                      }
                    })}
                <Block
                  className="d-flex justify-content-start align-items-center pointer p-relative eachLayerSec"
                  $style={{
                    fontSize: "14px",
                    backgroundColor: "#fff",
                    ":hover": {
                      background: "#F1F1F5",
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
                  {!bgUrl?.startsWith("#") ? (
                    <img
                      src={bgUrl}
                      alt="nn"
                      style={{
                        border: "1px solid #92929D",
                      }}
                      className={clsx(classes.bgImage, layerState.isOpenSlider && classes.bgCloseImage)}
                    />
                  ) : (
                    <div
                      style={{
                        backgroundColor: bgUrl,
                      }}
                      className={clsx(classes.bgImage, layerState.isOpenSlider && classes.bgCloseImage)}
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

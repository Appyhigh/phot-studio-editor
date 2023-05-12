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
import clsx from "clsx"
import classes from "./style.module.css"
import TextLayer from "./TextLayer/TextLayer"
interface ToolboxState {
  toolbox: string
}
const DEFAULT_TOOLBOX = "Canvas"

const Container = styled("div", (props) => ({
  minWidth: "300px",
  height: "100%",
  display: "flex",
}))

const Box = styled("div", (props) => ({
  width: "48px",
  height: "48px",
  // @ts-ignore
  backgroundColor: props.$theme.colors.grey400,
  borderRadius: props.$theme.sizing.scale100,
}))

const LayerPanel = () => {
  const [state, setState] = React.useState<ToolboxState>({ toolbox: "Text" })
  const { setActiveSubMenu } = useAppContext()
  const [showObjectLayer, setShowObjectLayer] = useState(false)
  const [showTextLayer, setShowTextLayer] = useState(false)

  const handleCloseObjectLayer = () => {
    setShowObjectLayer(false)
  }

  const handleCloseTextLayer = () => {
    setShowTextLayer(false)
  }

  const editor = useEditor()
  const objects = useObjects() as ILayer[]
  const activeObject = useActiveObject() as any
  const [layerObjects, setLayerObjects] = React.useState<any[]>([])
  const [activeLayerPanel, setActiveLayerPanel] = useState<any>(null)
  const [showObjectTypeText, setShowObjectTypeText] = useState(false)

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
    if (activeObject?.id) {
      setActiveLayerPanel(activeObject)
    }
  }, [activeObject])

  const check_group = (_id: any) => {
    const ans = activeObject?._objects?.filter((x: any) => {
      return x.id === _id
    })
    return ans?.length >= 1 ? true : false
  }
  useEffect(() => {
    if (!showObjectTypeText) {
      setShowObjectLayer(false)
    }
  }, [showObjectTypeText])

  return (
    <div className="d-flex flex-column p-relative">
      <Container
        className="p-relative"
        style={{
          minWidth: showObjectTypeText ? "300px" : "105px",
          maxWidth: "400px",
        }}
      >
        <Block className="flex-center">
          <Block
            className="pointer"
            onClick={() => {
              setShowObjectTypeText(!showObjectTypeText)
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
                    transform: showObjectTypeText ? "scaleX(-1)" : "scaleX(1)",
                  }}
                >
                  <Icons.SliderIcon size={15} />
                </div>
              </div>
            </Block>
          </Block>
        </Block>
        <Block className="d-flex flex-column flex-1" style={{ backgroundColor: "#FFF" }}>
          {showObjectLayer ? (
            <ObjectLayer showLayer={showObjectLayer} handleClose={handleCloseObjectLayer} />
          ) : showTextLayer ? (
            <TextLayer showLayer={showTextLayer} handleClose={handleCloseTextLayer}/>
          ) : (
            <Scrollable autoHide={true}>
              <Block className="p-1">
                {layerObjects.length === 0 ? (
                  <Box />
                ) : (
                  layerObjects
                    .sort((a, b) => b.metadata?.generationDate - a.metadata?.generationDate)
                    .map((object) => {
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
                              setShowTextLayer(true)
                            } else setShowObjectLayer(true)
                            setActiveLayerPanel(object)
                            setShowObjectTypeText(true)
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
                                  showObjectTypeText ? classes.showObjectTextLayer : classes.hideShowObjectLayerText,
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
                                width: showObjectTypeText ? "40px" : "48px",
                                height: showObjectTypeText ? "40px" : "48px",
                              }}
                              alt="nn"
                              className={classes.eachLayer}
                            />
                          )}
                          {showObjectTypeText && <Block>{object.name}</Block>}
                        </Block>
                      )
                    })
                )}
              </Block>
            </Scrollable>
          )}
        </Block>
      </Container>
    </div>
  )
}

export default LayerPanel

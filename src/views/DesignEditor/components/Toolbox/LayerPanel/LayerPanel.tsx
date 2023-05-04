import React, { useState } from "react"
import { useActiveObject, useEditor, useObjects } from "@layerhub-io/react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { ILayer } from "@layerhub-io/types"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { styled } from "baseui"
import classes from "./style.module.css"
import getSelectionType from "~/utils/get-selection-type"
import useAppContext from "~/hooks/useAppContext"

interface ToolboxState {
  toolbox: string
}
const DEFAULT_TOOLBOX = "Canvas"

const Container = styled("div", (props) => ({
  minWidth: "115px",
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

  const editor = useEditor()
  const objects = useObjects() as ILayer[]
  const activeObject = useActiveObject() as any
  const [layerObjects, setLayerObjects] = React.useState<any[]>([])
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [activeLayerPanel, setActiveLayerPanel] = useState<any>(null)
  const [showObjectTypeText, setShowObjectTypeText] = useState(false)

  console.log("type", activeObject?._objects)

  React.useEffect(() => {
    if (objects) {
      console.log(objects)

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

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
          preview: url,
          metadata: { generationDate: new Date().getTime() },
        }
        editor.objects.add(options)
      }
    },
    [editor]
  )

  console.log("active layer", layerObjects)

  return (
    <Container
      className="layerPanelBlock"
      style={{
        minWidth: showObjectTypeText ? "200px" : "105px",
        maxWidth: "400px",
        height: activeObject ? "90%" : "100%",
      }}
    >
      <Block className="flex-center">
        <button
          style={{ height: "25px", width: "25px" }}
          onClick={() => {
            setShowObjectTypeText(!showObjectTypeText)
          }}
        >
          <Block>
            <div style={{ position: "relative", marginRight: "-1px" }}>
              <svg
                style={{ transform: "scaleX(-1)" }}
                width="24"
                height="106"
                viewBox="0 0 24 106"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0C0 10.9874 6.98495 20.613 14.5043 28.6243C19.1998 33.6269 23.1778 40.369 23 48.775C22.8157 57.4869 18.1934 64.9566 13.1406 70.5521C6.01112 78.4474 0 88.0499 0 98.6878V106V0Z"
                  fill="white"
                />
              </svg>
              <div style={{ position: "absolute", top: "36%", left: "35%" }}>
                <svg
                  style={{ transform: showObjectTypeText ? "scaleX(-1)" : "scaleX(1)" }}
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 1.84912L1 7.84912L7 13.8491"
                    stroke="#B6B6B6"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </Block>
        </button>
      </Block>
      <Block className="d-flex flex-column flex-1" style={{ backgroundColor: "#FFF" }}>
        <Scrollable autoHide={true}>
          <Block className="p-1">
            {layerObjects.length === 0 ? (
              <Box />
            ) : (
              layerObjects
                .sort((a, b) => b.metadata.generationDate - a.metadata.generationDate)
                .map((object) => {
                  return (
                    <Block
                      className="d-flex justify-content-start align-items-center pointer"
                      $style={{
                        fontSize: "14px",
                        backgroundColor:
                          activeObject?.id == object.id ||
                          activeLayerPanel?.id == object.id ||
                          activeObject?._objects?.map((x: any) => {
                            return x.id == object.id
                          })
                            ? "rgb(245,246,247)"
                            : "",
                        ":hover": {
                          background: "rgb(245,246,247)",
                        },
                      }}
                      key={object.id}
                      onClick={() => {
                        setActiveLayerPanel(object)
                        editor.objects.select(object.id)
                      }}
                    >
                      {object.text ? (
                        <div style={{ fontFamily: object.fontFamily }}>
                          {object.textLines.map((line: any) => (
                            <div>{line}</div>
                          ))}
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
                          className="mx-1 my-1"
                        />
                      )}
                      {showObjectTypeText && <Block className="objectTypeText">{object.name}</Block>}
                    </Block>
                  )
                })
            )}
          </Block>
        </Scrollable>
      </Block>
    </Container>
  )
}

export default LayerPanel

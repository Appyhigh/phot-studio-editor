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
  minWidth: "80px",
  height: "100%",
  backgroundColor: props.$theme.colors.white,
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
  const activeObject = useActiveObject() as ILayer
  const [layerObjects, setLayerObjects] = React.useState<any[]>([])
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [activeLayerPanel, setActiveLayerPanel] = useState<any>(null)
  const [showObjectTypeText, setShowObjectTypeText] = useState(false)

  React.useEffect(() => {
    if (objects) {
      console.log(objects);
      
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

  return (
    <Container
      className="layerPanelBlock"
      style={{ minWidth: showObjectTypeText ? "180px" : "80px", maxWidth: "400px",height:activeObject?"90%":"100%" }}
      onMouseEnter={() => {
        setShowObjectTypeText(true)
      }}
      onMouseLeave={() => {
        setShowObjectTypeText(false)
      }}
    >
      <Block className="d-flex flex-column flex-1">
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
                          activeObject?.id == object.id || activeLayerPanel?.id == object.id ? "rgb(245,246,247)" : "",
                        ":hover": {
                          background: "rgb(245,246,247)",
                        },
                      }}
                      key={object.id}
                      onClick={() => {
                        setActiveLayerPanel(object)
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
                          style={{ borderRadius: "4px" }}
                          alt="nn"
                          className="mx-1 my-1 layerPanelImg"
                        />
                      )}
                      {showObjectTypeText && (
                        <Block onClick={() => editor.objects.select(object.id)} className="objectTypeText">
                          {object.name}
                        </Block>
                      )}
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

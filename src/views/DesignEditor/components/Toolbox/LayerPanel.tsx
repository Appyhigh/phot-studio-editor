import React, { useState } from "react"
import { useEditor, useObjects } from "@layerhub-io/react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import { ILayer } from "@layerhub-io/types"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { styled } from "baseui"

const Container = styled("div", (props) => ({
  minWidth: "172px",
  maxWidth: "400px",
  height:"90%",
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
  const editor = useEditor()
  const objects = useObjects() as ILayer[]
  const [layerObjects, setLayerObjects] = React.useState<any[]>([])
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [activeLayerPanel, setActiveLayerPanel] = useState<any>(null)

  React.useEffect(() => {
    console.log(objects)

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
    <Container>
      <Block className="d-flex flex-column flex-1">
        <Scrollable>
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
                        ":hover": {
                          background: "rgb(245,246,247)",
                        },
                      }}
                      key={object.id}
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
                          style={{ objectFit: "cover", borderRadius: "4px" }}
                          alt="nn"
                          height="48px"
                          width="48px"
                          className="mx-1 my-1"
                        />
                      )}
                      <Block onClick={() => editor.objects.select(object.id)}>{object.name}</Block>
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

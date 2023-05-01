import React, { useState } from "react"
import { useEditor, useObjects } from "@layerhub-io/react"
import { Block } from "baseui/block"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import { ILayer } from "@layerhub-io/types"
import Locked from "~/components/Icons/Locked"
import Unlocked from "~/components/Icons/Unlocked"
import Eye from "~/components/Icons/Eye"
import EyeCrossed from "~/components/Icons/EyeCrossed"
import Delete from "~/components/Icons/Delete"
import { Button, KIND, SIZE } from "baseui/button"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"

const Layers = () => {
  const editor = useEditor()
  const objects = useObjects() as ILayer[]
  const [layerObjects, setLayerObjects] = React.useState<any[]>([])
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [activeLayerPanel, setActiveLayerPanel] = useState<any>(null)

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
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <Block>Layers</Block>

        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      <Scrollable>
        <Block padding="0 1.5rem">
          {activeLayerPanel ? (
            <div>
              <div>
                <button
                  onClick={() => {
                    setActiveLayerPanel(null)
                  }}
                >
                  Close
                </button>
              </div>
              <div>
                <img src={activeLayerPanel.preview} width="100px" height="100px" />
              </div>
              <button
                onClick={() => {
                  // Get the output image from the backend
                  const url = "https://ik.imagekit.io/rxld8u68i/removed-background.jpeg?updatedAt=1682652974131"
                  // Add the removed background layer
                  addObject(url)
                  // Set the old layer's visibility to hidden
                  editor.objects.update({ visible: false }, activeLayerPanel.id)
                }}
              >
                Remove Background
              </button>
              <button>Option 2</button>
              <button>Option 3</button>
              <button>Option 4</button>
            </div>
          ) : (
            layerObjects
              .sort((a, b) => b.metadata.generationDate - a.metadata.generationDate)
              .map((object) => {
                return (
                  <Block
                    $style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 90px",
                      fontSize: "14px",
                      alignItems: "center",
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
                      <img src={object.preview} style={{ objectFit: "cover" }} alt="nn" height="100px" width="100px" />
                    )}
                    <Block $style={{ cursor: "pointer" }} onClick={() => editor.objects.select(object.id)}>
                      {object.name}
                    </Block>
                    <Block $style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                      {!object.text && (
                        <button
                          onClick={() => {
                            setActiveLayerPanel(object)
                          }}
                        >
                          Applicable AI Options
                        </button>
                      )}

                      {object.locked ? (
                        <Button
                          kind={KIND.tertiary}
                          size={SIZE.mini}
                          onClick={() => editor.objects.unlock(object.id)}
                          overrides={{
                            Root: {
                              style: {
                                paddingLeft: "4px",
                                paddingRight: "4px",
                              },
                            },
                          }}
                        >
                          <Locked size={24} />
                        </Button>
                      ) : (
                        <Button
                          kind={KIND.tertiary}
                          size={SIZE.mini}
                          onClick={() => editor.objects.lock(object.id)}
                          overrides={{
                            Root: {
                              style: {
                                paddingLeft: "4px",
                                paddingRight: "4px",
                              },
                            },
                          }}
                        >
                          <Unlocked size={24} />
                        </Button>
                      )}

                      {object.visible ? (
                        <Button
                          kind={KIND.tertiary}
                          size={SIZE.mini}
                          onClick={() => editor.objects.update({ visible: false }, object.id)}
                          overrides={{
                            Root: {
                              style: {
                                paddingLeft: "4px",
                                paddingRight: "4px",
                              },
                            },
                          }}
                        >
                          <Eye size={24} />
                        </Button>
                      ) : (
                        <Button
                          kind={KIND.tertiary}
                          size={SIZE.mini}
                          onClick={() => editor.objects.update({ visible: true }, object.id)}
                          overrides={{
                            Root: {
                              style: {
                                paddingLeft: "4px",
                                paddingRight: "4px",
                              },
                            },
                          }}
                        >
                          <EyeCrossed size={24} />
                        </Button>
                      )}
                      <Button
                        kind={KIND.tertiary}
                        size={SIZE.mini}
                        onClick={() => editor.objects.remove(object.id)}
                        overrides={{
                          Root: {
                            style: {
                              paddingLeft: "4px",
                              paddingRight: "4px",
                            },
                          },
                        }}
                      >
                        <Delete size={24} />
                      </Button>
                    </Block>
                  </Block>
                )
              })
          )}
        </Block>
      </Scrollable>
    </Block>
  )
}

export default Layers

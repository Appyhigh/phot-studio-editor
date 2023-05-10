import React from "react"
import useAppContext from "~/hooks/useAppContext"
import panelItems from "./panelItems"
import useIsSidebarOpen from "~/hooks/useIsSidebarOpen"
import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"

interface State {
  panel: string
}
const PanelsList = () => {
  const [state, setState] = React.useState<State>({ panel: "Text" })
  const isSidebarOpen = useIsSidebarOpen()
  const { activePanel, activeSubMenu } = useAppContext()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  React.useEffect(() => {
    setState({ panel: activePanel })
  }, [activePanel])

  React.useEffect(() => {
    if (activeSubMenu) {
      setState({ panel: activeSubMenu })
    } else {
      setState({ panel: activePanel })
    }
  }, [activeSubMenu])

  // @ts-ignore
  const Component = panelItems[state.panel]

  return (
    <Block
      id="EditorPanelItem"
      className="d-flex p-relative"
      $style={{
        width: isSidebarOpen ? "360px" : 0,
        flex: "none",
        transition: "ease width 0.1s",
        overflow: "hidden",
    }}
    >
      {Component && (
        <div className="d-flex flex-1 p-relative" style={{ backgroundColor: "#FFF"}}>
          <Component />
        </div>
      )}{" "}
    </Block>
  )
}

export default PanelsList

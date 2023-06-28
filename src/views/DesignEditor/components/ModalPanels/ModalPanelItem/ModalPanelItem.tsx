import React from "react"
import useAppContext from "~/hooks/useAppContext"
import panelItems from "../ModalPanelItems"
import { Block } from "baseui/block"
import classes from "./style.module.css"
import clsx from "clsx"

interface State {
  panel: string
}
const ModalPanelItem = () => {
  const [state, setState] = React.useState<State>({ panel: "Text" })
  const { activePanel, activeSubMenu } = useAppContext()

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
      className={clsx("d-flex p-relative", classes.panelItem)}
      id="EditorPanelItem"
    >
      {Component && (
        <Block className="d-flex  p-relative bg-white">
          <Component />
        </Block>
      )}{" "}
    </Block>
  )
}

export default ModalPanelItem

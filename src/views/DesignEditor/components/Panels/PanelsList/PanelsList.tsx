import { styled, Theme } from "baseui"
import { BASE_ITEMS, VIDEO_PANEL_ITEMS } from "~/constants/app-options"
import useAppContext from "~/hooks/useAppContext"
import Icons from "~/components/Icons"
import { useTranslation } from "react-i18next"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import useEditorType from "~/hooks/useEditorType"
import Scrollable from "~/components/Scrollable"
import { Block } from "baseui/block"
import classes from "./style.module.css"
import clsx from "clsx"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  backgroundColor: $theme.colors.white,
  display: "flex",
  flex: "none",
  borderRight: "2px solid rgb(238, 238, 238)",
}))

const PanelsList = () => {
  const { activePanel } = useAppContext()
  const { t } = useTranslation("editor")
  const editorType = useEditorType()
  //@ts-ignore
  const PANEL_ITEMS = editorType === "VIDEO" ? VIDEO_PANEL_ITEMS : BASE_ITEMS

  return (
    <Container className={classes.panelListSection}>
      <Scrollable autoHide={true}>
        {PANEL_ITEMS.map((panelListItem) => (
          <PanelListItem
            // @ts-ignore
            label={panelListItem.label}
            name={panelListItem.name}
            key={panelListItem.id}
            // @ts-ignore
            icon={panelListItem.icon ? panelListItem.icon : panelListItem.name}
            activePanel={activePanel}
          />
        ))}
      </Scrollable>
    </Container>
  )
}

const PanelListItem = ({ label, icon, activePanel, name }: any) => {
  const { setActivePanel } = useAppContext()

  const setIsSidebarOpen = useSetIsSidebarOpen()

  // @ts-ignore
  const Icon = Icons[icon]
  return (
    <Block
      id="EditorPanelList"
      className={clsx(classes.panelListItem, "flex-center-column", activePanel !== name && classes.inActivePanel)}
      onClick={() => {
        setIsSidebarOpen(true)
        setActivePanel(name)
      }}
    >
      {name === "Images" ? (
        <div className={classes.imagesIcon}>
          <Icon size={24} />
        </div>
      ) : (
        <Icon size={24} />
      )}

      <Block
        className={clsx("text-center", classes.panelListItemEach, activePanel === name && classes.activePanelItem)}
      >
        {label}
      </Block>
    </Block>
  )
}

export default PanelsList

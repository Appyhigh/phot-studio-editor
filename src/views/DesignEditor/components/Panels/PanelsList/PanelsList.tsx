import { styled, Theme } from "baseui"
import { BASE_ITEMS, VIDEO_PANEL_ITEMS } from "~/constants/app-options"
import useAppContext from "~/hooks/useAppContext"
import Icons from "~/components/Icons"
import { useTranslation } from "react-i18next"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import useEditorType from "~/hooks/useEditorType"
import { Block } from "baseui/block"
import classes from "./style.module.css"
import clsx from "clsx"
import PointerIcon from "~/components/Icons/PointerIcon"
import { OBJECT_REMOVER, OBJECT_REPLACER, PRODUCT_PHOTOSHOOT } from "~/constants/contants"
import Scrollable from "~/components/Scrollable"
import { useEffect, useRef } from "react"

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
  const sidebarRef = useRef(null)

  useEffect(() => {
    if (activePanel === OBJECT_REMOVER || activePanel === OBJECT_REPLACER || activePanel === PRODUCT_PHOTOSHOOT) {
      sidebarRef.current.style.overflowY = "visible"
      sidebarRef.current.style.marginTop = "-170px"
    } else {
      sidebarRef.current.style.overflowY = "scroll"
      sidebarRef.current.style.marginTop = "0"
    }
  }, [activePanel])

  return (
    <div className={classes.panelListSection}>
      <div
        ref={sidebarRef}
        style={{
          height: "92vh",
          overflowY: "scroll",
        }}
      >
        {PANEL_ITEMS.map((panelListItem) => (
          <PanelListItem
            sidebarRef={sidebarRef}
            label={panelListItem.label}
            name={panelListItem.name}
            key={panelListItem.id}
            // @ts-ignore
            icon={panelListItem.icon ? panelListItem.icon : panelListItem.name}
            activePanel={activePanel}
          />
        ))}
      </div>
    </div>
  )
}

const PanelListItem = ({ label, icon, activePanel, name, sidebarRef }: any) => {
  const { setActivePanel } = useAppContext()

  const setIsSidebarOpen = useSetIsSidebarOpen()
  // @ts-ignore
  const Icon = Icons[icon]
  return (
    <Block
      id="EditorPanelList"
      className={clsx(classes.panelListItem, "flex-center-column p-relative")}
      onClick={() => {
        // Change the style here
        setIsSidebarOpen(true)
        setActivePanel(name)
      }}
    >
      {name === "Images" ? (
        <div className={clsx(classes.imagesIcon, activePanel !== name && classes.inActivePanel)}>
          <Icon size={24} color={activePanel !== name ? "#9BA6B0" : "#4E19C6"} />
        </div>
      ) : (
        <Icon size={24} color={activePanel !== name ? "#9BA6B0" : "#4E19C6"} />
      )}

      <Block
        className={clsx(
          "text-center p-relative",
          classes.panelListItemEach,
          activePanel === name && classes.activePanelItem
        )}
      >
        {label}
        {activePanel === name &&
          (activePanel === OBJECT_REMOVER || activePanel === OBJECT_REPLACER || activePanel === PRODUCT_PHOTOSHOOT) && (
            <div className={classes.chevronIcon}>
              <PointerIcon />
            </div>
          )}
      </Block>
    </Block>
  )
}

export default PanelsList

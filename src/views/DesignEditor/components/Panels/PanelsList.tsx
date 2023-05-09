import { useStyletron, styled } from "baseui"
import { BASE_ITEMS, VIDEO_PANEL_ITEMS } from "~/constants/app-options"
import useAppContext from "~/hooks/useAppContext"
import Icons from "~/components/Icons"
import { useTranslation } from "react-i18next"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import useEditorType from "~/hooks/useEditorType"
import Scrollable from "~/components/Scrollable"
import { Block } from "baseui/block"

const Container = styled("div", (props) => ({
  width: "100px",
  backgroundColor: props.$theme.colors.white,
  display: "flex",
  flex: "none",
  borderRight: "2px solid rgb(238, 238, 238)",
}))

const PanelsList = () => {
  const { activePanel } = useAppContext()
  const { t } = useTranslation("editor")
  const editorType = useEditorType()
  const PANEL_ITEMS = editorType === "VIDEO" ? VIDEO_PANEL_ITEMS : BASE_ITEMS

  return (
    <Container>
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
  const [css, theme] = useStyletron()

  // @ts-ignore
  const Icon = Icons[icon]
  return (
    <Block
      id="EditorPanelList"
      onClick={() => {
        setIsSidebarOpen(true)
        setActivePanel(name)
      }}
      $style={{
        padding:"16px 15px",
        backgroundColor: theme.colors.white,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: "0.8rem",
        userSelect: "none",
        transition: "all 0.5s",
        gap: "0.1rem",
        ":hover": {
          cursor: "pointer",
          backgroundColor: theme.colors.white,
          transition: "all 1s",
        },
      }}
    >
      <Icon size={24} />
      <div
        className="text-center"
        style={{
          fontWeight: activePanel ? 500 : 400,
          minWidth:"100px",
          color: activePanel===name ? "#000" : "#92929D",
        }}
      >
        {label}
      </div>
    </Block>
  )
}

export default PanelsList

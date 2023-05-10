import { useStyletron, styled, Theme } from "baseui"
import { BASE_ITEMS, VIDEO_PANEL_ITEMS } from "~/constants/app-options"
import useAppContext from "~/hooks/useAppContext"
import Icons from "~/components/Icons"
import { useTranslation } from "react-i18next"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import useEditorType from "~/hooks/useEditorType"
import Scrollable from "~/components/Scrollable"
import { Block } from "baseui/block"

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
  const PANEL_ITEMS = editorType === "VIDEO" ? VIDEO_PANEL_ITEMS : BASE_ITEMS
  const [css, theme] = useStyletron()

  return (
    <Container
      $style={{
        width: "90px",
        // @ts-ignore
        [theme.mediaQuery.large]: {
          width: "100px",
        },
      }}
    >
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
      className="d-flex justify-content-center align-items-center flex-column"
      onClick={() => {
        setIsSidebarOpen(true)
        setActivePanel(name)
      }}
      $style={{
        padding: "16px 15px",
        backgroundColor: theme.colors.white,
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
      <Block
        className="text-center"
        $style={{
          fontWeight: activePanel ? 500 : 400,
          minWidth: "90px",
          color: activePanel === name ? theme.colors.black :theme.colors.borderAccent,
          [theme.mediaQuery.large]: {
            width: "100px",
          },
        }}
      >
        {label}
      </Block>
    </Block>
  )
}

export default PanelsList

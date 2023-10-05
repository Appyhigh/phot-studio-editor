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
import { useEffect, useRef, useState } from "react"
import { useAuth } from "~/hooks/useAuth"
import { getCookie } from "~/utils/common"
import { COOKIE_KEYS } from "~/utils/enum"
import { Skeleton } from "baseui/skeleton"
import { useLocation } from "react-router-dom"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  backgroundColor: $theme.colors.white,
  display: "flex",
  flex: "none",
  borderRight: "2px solid rgb(238, 238, 238)",
}))

const PanelsList = () => {
  const router = useLocation()
  const { activePanel, activeCategory, setActiveCategory } = useAppContext()
  const { t } = useTranslation("editor")
  const editorType = useEditorType()
  //@ts-ignore
  const PANEL_ITEMS = editorType === "VIDEO" ? VIDEO_PANEL_ITEMS : BASE_ITEMS
  const sidebarRef = useRef(null)
  const [isAiToolsOpen, setIsAiToolsOpen] = useState(false)
  const { authState } = useAuth()
  const { user } = authState
  const [openCategory, setOpenCategory] = useState(null)
  const [isLogin, setIsLogin] = useState(false)
  const [toolHover, setToolHover] = useState(-1)
  const toggleAiTools = () => {
    setIsAiToolsOpen(!isAiToolsOpen)
  }

  useEffect(() => {
    if (activePanel) {
      setIsAiToolsOpen(true)
    }
  }, [])

  const toggleCategory = (category: any) => {
    setOpenCategory(openCategory === category ? null : category)
    setActiveCategory(openCategory === category ? null : category)
  }

  useEffect(() => {
    if (getCookie(COOKIE_KEYS.AUTH) == "invalid_cookie_value_detected") {
      setIsLogin(false)
    } else {
      setIsLogin(true)
    }
  }, [getCookie(COOKIE_KEYS.AUTH)])


  return (
    <div className={classes.panelListSection}>
      <div
        ref={sidebarRef}
        className={clsx(
          classes.panelListContainer,
          (activePanel === OBJECT_REMOVER || activePanel === OBJECT_REPLACER || activePanel === PRODUCT_PHOTOSHOOT) &&
          classes.sidebarActiveModal
        )}
      >
        {router.pathname === "/home" && (
          <div className={classes.siderbarTopSection}>
            <Block className="d-flex justify-content-start pointer">
              <Icons.PhotAILogo size={23} />
            </Block>
          </div>
        )}

        <div className={classes.AllToolsTreeSection}>
          <div className={classes.ToolsTreeSection}>
            {isLogin && (
              <>
                {user ? (
                  <div className={classes.profileContainer}>
                    <div className={classes.headerProfile}>
                      <div className={classes.roundProfileDP}>
                        {user?.avatar ? (
                          <img src={user?.avatar} width="42px" height="42px" alt="profile-icon" />
                        ) : (
                          <Icons.ProfileIcon size={32} />
                        )}
                      </div>

                      <div className={classes.userInfo}>
                        <div className={classes.userName}>
                          {user?.name?.slice(0, 22)}
                          {user?.name?.length > 22 && "..."}
                        </div>
                        <div className={classes.userPlan}>Free member * Free plan</div>
                      </div>
                    </div>
                    <button className={classes.basePanelBtn}>
                      <span>
                        <Icons.Upgrade size={16} />
                      </span>
                      Upgrade
                    </button>
                  </div>
                ) : (
                  <div className={classes.skeletonLoader}>
                    <Skeleton
                      width="42px"
                      height="42px"
                      animation
                      overrides={{
                        Root: {
                          style: {
                            borderRadius: "50%",
                          },
                        },
                      }}
                    />
                    <div className={classes.userInfoSke}>
                      <Skeleton width="80%" height="20px" animation />
                    </div>
                  </div>
                )}
              </>
            )}
            <div
              className={clsx(classes.panelItemSectionContainer, toolHover === 0 && classes.hoveredTool)}
              onMouseEnter={() => setToolHover(0)}
              onMouseLeave={() => setToolHover(-1)}
            >
              <div className={clsx(classes.panelItemSection, toolHover === 0 && classes.activeTool)}>
                <Icons.CreateRounded size={16} color={toolHover === 0 ? '#6729F3' : '#696974'} />
                <p>Create</p>
              </div>
              <Icons.RightArrow size={16} color={toolHover === 0 ? '#6729F3' : '#696974'} />
            </div>

            <div className={classes.AiToolsTreeSection}>
              <div
                onClick={toggleAiTools}
                className={clsx(classes.panelItemSectionContainer, toolHover === 1 && classes.hoveredTool)}

                onMouseEnter={() => setToolHover(1)}
                onMouseLeave={() => setToolHover(-1)}>
                <div className={clsx(classes.panelItemSection, toolHover === 1 && classes.activeTool, isAiToolsOpen && classes.activeTool)}>
                  <Icons.AiTools size={16} color={toolHover === 1 || isAiToolsOpen ? '#6729F3' : '#696974'} />
                  <p>AI tools</p>
                </div>
                {!isAiToolsOpen ? <Icons.RightArrow size={16} color={toolHover === 1 || isAiToolsOpen ? '#6729F3' : '#696974'} /> : <Icons.UpArrow size={16} color="#6729F3" />}
              </div>
              {isAiToolsOpen && (
                <div className={classes.AiToolTree}>
                  {PANEL_ITEMS.map((panelListItem) => (
                    <div key={panelListItem.category}>
                      <div
                        onClick={() => {
                          toggleCategory(panelListItem.category)
                          // setActiveCategory(panelListItem.category)
                        }}
                        className={classes.panelCategoriesName}
                      >
                        <p>{panelListItem.category}</p>
                      </div>
                      {panelListItem.items.map((item) => (
                        <PanelListItem
                          sidebarRef={sidebarRef}
                          label={item.label}
                          name={item.name}
                          key={item.id}
                          // @ts-ignore
                          icon={item.icon ? item.icon : item.name}
                          activePanel={activePanel}
                        />
                      ))}
                    </div>
                  ))}
                  {/* {PANEL_ITEMS.map((panelListItem) => (
                  <PanelListItem
                    sidebarRef={sidebarRef}
                    label={panelListItem.label}
                    name={panelListItem.name}
                    key={panelListItem.id}
                    // @ts-ignore
                    icon={panelListItem.icon ? panelListItem.icon : panelListItem.name}
                    activePanel={activePanel}
                  />
                ))} */}
                </div>
              )}
            </div>
            <div className={clsx(classes.panelItemSectionContainer, toolHover === 2 && classes.hoveredTool)} onMouseEnter={() => setToolHover(2)}
              onMouseLeave={() => setToolHover(-1)}>
              <div className={clsx(classes.panelItemSection, toolHover === 2 && classes.activeTool)}>
                <Icons.Assets size={16} color={toolHover === 2 ? '#6729F3' : '#696974'} />
                <p>Assets</p>
              </div>
            </div>
            <div className={clsx(classes.panelItemSectionContainer, toolHover === 3 && classes.hoveredTool)} onMouseEnter={() => setToolHover(3)}
              onMouseLeave={() => setToolHover(-1)}>
              <div className={clsx(classes.panelItemSection, toolHover === 3 && classes.activeTool)}>
                <Icons.Designs size={16} color={toolHover === 3 ? '#6729F3' : '#696974'} />
                <p>Your designs</p>
              </div>
            </div>
            <div className={clsx(classes.panelItemSectionContainer, toolHover === 4 && classes.hoveredTool)} onMouseEnter={() => setToolHover(4)}
              onMouseLeave={() => setToolHover(-1)}>
              <div className={clsx(classes.panelItemSection, toolHover === 4 && classes.activeTool)}>
                <Icons.Brand size={16} color={toolHover === 4 ? '#6729F3' : '#696974'} />
                <p>Brand</p>
              </div>
            </div>

            <div className={classes.lineBorder}></div>
            <div className={clsx(classes.panelItemSectionContainer, toolHover === 5 && classes.hoveredTool)} onMouseEnter={() => setToolHover(5)}
              onMouseLeave={() => setToolHover(-1)}>
              <div className={clsx(classes.panelItemSection, toolHover === 5 && classes.activeTool)}>
                <Icons.sideBarTempletes size={16} color={toolHover === 5 ? '#6729F3' : '#696974'} />
                <p>Templates</p>
              </div>
            </div>
          </div>
          <div className={classes.siderbarFooterSection}>
            <div className={clsx(classes.panelItemSectionContainer, toolHover === 6 && classes.hoveredTool)} onMouseEnter={() => setToolHover(6)}
              onMouseLeave={() => setToolHover(-1)}>
              <div className={clsx(classes.panelItemSection, toolHover === 6 && classes.activeTool)}>
                <Icons.ManageSubs size={16} color={toolHover === 6 ? '#6729F3' : '#696974'} />
                <p>Manage Subscriptions</p>
              </div>
            </div>

            <div className={clsx(classes.panelItemSectionContainer, toolHover === 7 && classes.hoveredTool)} onMouseEnter={() => setToolHover(7)}
              onMouseLeave={() => setToolHover(-1)}>
              <div className={clsx(classes.panelItemSection, toolHover === 7 && classes.activeTool)}>
                <Icons.Settings size={16} color={toolHover === 7 ? '#6729F3' : '#696974'} />
                <p>Prefrences</p>
              </div>
            </div>
          </div>
        </div>

        {/* {PANEL_ITEMS.map((panelListItem) => (
          <PanelListItem
            sidebarRef={sidebarRef}
            label={panelListItem.label}
            name={panelListItem.name}
            key={panelListItem.id}
            // @ts-ignore
            icon={panelListItem.icon ? panelListItem.icon : panelListItem.name}
            activePanel={activePanel}
          />
        ))} */}
      </div>
    </div>
  )
}

const PanelListItem = ({ label, icon, activePanel, name, sidebarRef }: any) => {
  const { setActivePanel } = useAppContext()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const isModalOpen =
    activePanel === OBJECT_REMOVER || activePanel === OBJECT_REPLACER || activePanel === PRODUCT_PHOTOSHOOT
  const [isHovered, setIsHovered] = useState(false)
  // @ts-ignore
  const Icon = Icons[icon]
  return (
    <Block
      id="EditorPanelList"
      className={clsx(classes.panelListItem, "p-relative")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (!(activePanel === name && isModalOpen)) {
          // Change the style here
          setIsSidebarOpen(true)
          setActivePanel(name)
        }
      }}
      style={{ marginBottom: name == "ProductPhotoshoot" ? "-70px" : "" }}
    >
      {name === "Images" ? (
        <Icon size={24} color={isHovered ? "#4E19C6" : "#F1F1F5"} />
      ) : (
        <>
          {!isModalOpen ? (
            <Icon size={24} color={isHovered ? "#4E19C6" : "#F1F1F5"} />
          ) : (
            <Icon size={24} color={isHovered ? "#4E19C6" : activePanel !== name ? "#F1F1F5" : "#4E19C6"} />
          )}
        </>
      )}

      <Block
        className={clsx(
          "text-center p-relative",
          classes.panelListItemEach,
          activePanel === name && isModalOpen && classes.activePanelItem,
          isHovered && classes.activePanelItem
        )}
      >
        {label}
        {activePanel === name && isModalOpen && (
          <div className={classes.chevronIcon}>
            <PointerIcon width="20px" />
          </div>
        )}
      </Block>
    </Block>
  )
}

export default PanelsList

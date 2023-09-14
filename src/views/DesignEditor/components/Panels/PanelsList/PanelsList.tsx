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

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  backgroundColor: $theme.colors.white,
  display: "flex",
  flex: "none",
  borderRight: "2px solid rgb(238, 238, 238)",
}))

const PanelsList = () => {
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
        style={{
          height: "93vh",
        }}
        className={clsx(
          classes.panelListContainer,
          (activePanel === OBJECT_REMOVER || activePanel === OBJECT_REPLACER || activePanel === PRODUCT_PHOTOSHOOT) &&
          classes.sidebarActiveModal
        )}
      >
        <div className={classes.siderbarTopSection}>
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
                      <div className={classes.userName}>{user?.name.slice(0, 22)}</div>
                      {/* <div className={classes.userPlan}>Free member * Free plan</div> */}
                    </div>
                  </div>
                  {/* <button
              className={classes.basePanelBtn}
            >
              <span className="pr-1">
                <Icons.Upgrade size={16} />
              </span>
              Upgrade
            </button> */}
                </div>
              ) : (
                <div className={classes.skeletonLoader}>
                  <div className={classes.roundProfileDPSke}></div>
                  <div className={classes.userInfoSke}>
                    <div className={classes.userNameSke}></div>
                  </div>
                </div>
              )}
            </>
          )}

          <div className={classes.ToolsTreeSection}>
            {/* <div className={classes.panelItemSectionContainer} >
              <div className={classes.panelItemSection}>
                <Icons.CreateRounded size={16} />
                <p>Create</p>
              </div>
              <Icons.RightArrow size={16} />
            </div> */}

            <div className={classes.AiToolsTreeSection}>
              <div onClick={toggleAiTools} className={classes.panelItemSectionContainer}>
                <div className={classes.panelItemSection}>
                  <Icons.AiTools size={16} />
                  <p>AI tools</p>
                </div>
                {!isAiToolsOpen ? <Icons.RightArrow size={16} /> : <Icons.DownArrow size={16} />}
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
                      {
                        panelListItem.items.map((item) => (
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
            {/* <div className={classes.panelItemSectionContainer} >
              <div className={classes.panelItemSection}>
                <Icons.Assets size={16} />
                <p>Assets</p>
              </div>

            </div>
            <div className={classes.panelItemSectionContainer} >
              <div className={classes.panelItemSection}>
                <Icons.Designs size={16} />
                <p>Designs</p>
              </div>
            </div> */}

            {/* <div className={classes.lineBorder}></div>
            <div className={classes.panelItemSectionContainer} >
              <div className={classes.panelItemSection}>
                <Icons.sideBarTempletes size={16} />
                <p>Templates</p>
              </div>
            </div> */}
          </div>
        </div>

        {/* <div className={classes.siderbarFooterSection}>
          <div className={classes.panelItemSectionContainer} >
            <div className={classes.panelItemSection}>
              <Icons.ManageSubs size={16} />
              <p>Manage Subscriptions</p>
            </div>
          </div>

          <div className={classes.panelItemSectionContainer} >
            <div className={classes.panelItemSection}>
              <Icons.Settings size={16} />
              <p>Prefrences</p>
            </div>
          </div>
        </div> */}
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
  const isModalOpen = activePanel === OBJECT_REMOVER || activePanel === OBJECT_REPLACER || activePanel === PRODUCT_PHOTOSHOOT
  // @ts-ignore
  const Icon = Icons[icon]
  return (
    <Block
      id="EditorPanelList"
      className={clsx(classes.panelListItem, "p-relative")}
      onClick={() => {
        // Change the style here
        setIsSidebarOpen(true)
        setActivePanel(name)
      }}
      style={{ marginBottom: name == 'ProductPhotoshoot' ? '-70px' : '' }}
    >
      {name === "Images" ? (
        <Icon size={24} color={"#F1F1F5"} />
      ) : (<>
        {
          !isModalOpen ? <Icon size={24} color={"#F1F1F5"} />
            : <Icon size={24} color={activePanel !== name ? "#F1F1F5" : "#4E19C6"} />
        }
      </>

      )}

      <Block
        className={clsx(
          "text-center p-relative",
          classes.panelListItemEach,
          activePanel === name && isModalOpen && classes.activePanelItem
        )}
      >
        {label}
        {activePanel === name &&
          isModalOpen && (
            <div className={classes.chevronIcon}>
              <PointerIcon width="20px" />
            </div>
          )}
      </Block>
    </Block>
  )
}

export default PanelsList

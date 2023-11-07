import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { useAuth } from "~/hooks/useAuth"
import { useContext, useState } from "react"
import LoginPopup from "~/views/DesignEditor/components/LoginPopup/LoginPopup"
import { signOut } from "firebase/auth"
import { auth } from "~/utils/firebase"
import TextToArtContext from "~/contexts/TextToArtContext"
import BaseButton from "~/components/UI/Button/BaseButton"
import AddPopup from "~/views/DesignEditor/components/Footer/Graphic/AddPopup/AddPopup"
import { LabelSmall } from "baseui/typography"
import { useStyletron } from "baseui"
import { useEditor } from "@layerhub-io/react"
import { backgroundLayerType } from "~/constants/contants"
import DownloadPopup from "~/views/DesignEditor/components/Footer/Graphic/DownloadPopup/DownloadPopup"

const Navbar = () => {
  // @ts-ignore
  const { authState } = useAuth()
  const { user } = authState
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const { textToArtInputInfo } = useContext(TextToArtContext)
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [css, theme] = useStyletron()
  const editor = useEditor()

  const handleCloseAddPopup = () => {
    setShowAddPopup(false)
  }

  const downloadBtnDisable =
    (editor?.frame?.background?.canvas?._objects?.length === 3 &&
      editor?.frame?.background?.canvas?._objects[2]?.metadata?.type === backgroundLayerType) ||
    (editor?.frame?.background?.canvas?._objects?.length === 2 &&
      editor?.frame?.background?.canvas?._objects[1]?.fill === "#ffffff")

  return (
    <Block className={classes.header}>
      <Block className="d-flex justify-content-start pointer">
        <Icons.PhotAILogo size={23} />
      </Block>
      <Block className="d-flex align-items-center justify-content-between w-100">
        <Block display={"flex"} alignItems={"center"}>
          <button className={classes.basePanelBtn}>
            <span className="d-flex align-items-center">
              <Icons.ChevronRight size={16} color="#44444F" />
            </span>
          </button>
          <div className="p-relative addPopupBtn">
            <button
              className={classes.basePanelBtn}
              onMouseOver={() => {
                setShowAddPopup(true)
              }}
            >
              <span className="d-flex align-items-center">
                <span className="pr-1">
                  <Icons.Plus size={16} color="#44444F" />
                </span>
                Add
                <span className="pl-3">
                  <Icons.ArrowDown size={14} color="#44444F" />
                </span>
              </span>
            </button>

            <AddPopup showPopup={showAddPopup} handleClose={handleCloseAddPopup} />
          </div>
          <Block marginLeft={"20px"}>
            <Icons.Save size={26} />
          </Block>
        </Block>
        <Block className="d-flex align-items-center">
          <Icons.Pen />
          <LabelSmall color={theme.colors.primary500} marginLeft={"8px"} className="pointer">
            Untitled design - Whiteboard
          </LabelSmall>
          <LabelSmall
            className="pointer"
            color={theme.colors.primary500}
            $style={{ textDecoration: "underline", marginLeft: "8px" }}
          >
            Save
          </LabelSmall>
        </Block>
        <Block className="d-flex align-items-center justify-content-center">
          <Block className="mr-2">
            <Icons.Search2 />
          </Block>
          <Block className="mr-2">
            <Icons.ActivityIcon size={24} />
          </Block>
          <Block className="mr-2">
            <Icons.Info />
          </Block>
          <Block className="mr-2">
            <Icons.Bell />
          </Block>
          <Block className={"p-relative downloadResultBtn ml-3 mr-1"}>
            <BaseButton
              title="Download"
              disabled={downloadBtnDisable ? true : false}
              fontSize="14px"
              padding="15px"
              borderRadius="10px"
              fontFamily="poppins"
              height="38px"
              width="120px"
              // className={clsx(classes.basePannelBtn, downloadBtnDisable && classes.disabledDownloadBtn)}
            />

            {!downloadBtnDisable && <DownloadPopup />}
          </Block>
        </Block>
      </Block>

      {user ? (
        <>
          <BaseButton
            title="Upgrade"
            bgColor="#FF974A"
            width="120px"
            height="38px"
            fontFamily="poppins"
            fontSize="12px"
            borderRadius="10px"
            margin="0px 0px 0px 16px"
          />
          <Block className={clsx(classes.profileWrapper, "ml-2 pointer mt-1")}>
            {user.avatar ? (
              <img src={user.avatar} className="border-circle o-hidden" width="32px" height="32px" />
            ) : (
              <Icons.ProfileIcon size={32} />
            )}
            <div className={classes.profileContainer}>
              <div className={classes.profileCon}>
                <div className={classes.headerProfile}>
                  <div className={classes.roundProfileDP}>
                    {user.avatar ? (
                      <img src={user.avatar} width="24px" height="24px" alt="profile-icon" />
                    ) : (
                      <Icons.ProfileIcon size={32} />
                    )}
                  </div>

                  <div className={classes.userInfo}>
                    <div className={classes.userEmail}>{user.email}</div>
                  </div>
                </div>
                <div className={classes.profilePopupLinks}>
                  <p
                    className={classes.profileLinks}
                    onClick={() => {
                      signOut(auth())
                    }}
                  >
                    <a>Sign out</a>
                  </p>
                </div>
              </div>
            </div>
          </Block>
        </>
      ) : (
        <>
          <BaseButton
            title="Login"
            handleClick={() => {
              setShowLoginPopup(true)
            }}
            width="80px"
            bgColor="#FF974A"
            height="36px"
            fontFamily="poppins"
            fontSize="12px"
            borderRadius="10px"
            disabled={textToArtInputInfo.isImageUploading}
          />
          <LoginPopup
            isOpen={showLoginPopup}
            loginPopupCloseHandler={() => {
              setShowLoginPopup(false)
            }}
          />
        </>
      )}
    </Block>
  )
}

export default Navbar

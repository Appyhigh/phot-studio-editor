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

const Navbar = () => {
  // @ts-ignore
  const { authState } = useAuth()
  const { user } = authState
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const { textToArtInputInfo } = useContext(TextToArtContext)

  return (
    <Block className={classes.header}>
      <Block className="d-flex justify-content-start pointer">
        <Icons.PhotAILogo size={23} />
      </Block>
      <div className="flex-1"></div>

      {user ? (
        <>
          <Block className="d-flex justify-content-end align-items-center mr-1 pointer">
            <Icons.ActivityIcon size={24} />
          </Block>
          <BaseButton
            title={`${user && user?.credits_remaining} Credits`}
            width="120px"
            height="38px"
            bgColor="#F1F1F5"
            borderRadius="10px"
            fontSize="12px"
            txtColor="#92929D"
            fontFamily="poppins"
            margin="0 0 0 17px"
          />

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
                  <p className={classes.profileLinks}>
                    {" "}
                    <a>My Dashboard</a>
                  </p>
                  <p
                    className={classes.profileLinks}
                    onClick={() => {
                      signOut(auth())
                    }}
                  >
                    <a>Sign out</a>
                  </p>
                </div>
                <div className={classes.creditsOfProfile}>
                  <div className={classes.remainingCredits}>Remaining Credits: {user && user?.credits_remaining}</div>
                  <div className={classes.buyMoreCredits}>
                    <a>Buy More</a>
                  </div>
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

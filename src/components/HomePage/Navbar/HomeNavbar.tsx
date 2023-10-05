import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { useAuth } from "~/hooks/useAuth"
import { useContext, useState } from "react"
import LoginPopup from "~/views/DesignEditor/components/LoginPopup/LoginPopup"
import { signOut } from "firebase/auth"
import { auth } from "~/utils/firebase"
import BaseButton from "~/components/UI/Button/BaseButton"
import TextToArtContext from "~/contexts/TextToArtContext"
import CreatePopup from "../CreatePopup/CreatePopup"

const HomeNavbar = () => {
    // @ts-ignore
    const { authState } = useAuth()
    const { user } = authState
    const [showLoginPopup, setShowLoginPopup] = useState(false)
    const { textToArtInputInfo } = useContext(TextToArtContext)
    const [showCreatePopup, setShowCreatePopup] = useState(false)

    return (
        <Block className={classes.header}>
            <Block className="d-flex justify-content-start pointer">
                <span className={classes.SearchBar}>
                    <Icons.SearchBarIcon />
                    <input type="text" placeholder="Search tools" className={classes.SearchBarInput} />
                </span>
            </Block>
            <div className="flex-1"></div>
            <Block className="p-relative addPopupBtn">
                <button
                    className={classes.basePanelBtn}
                    onClick={() => {
                        setShowCreatePopup(!showCreatePopup)
                    }}
                >
                    <span className="d-flex align-items-center">
                        <span className="pr-1">
                            <Icons.Plus size={16} color={"#44444F"} />
                        </span>
                        Create
                        <span className="pl-3">
                            <Icons.ArrowDown size={14} color={"#44444F"} />
                        </span>
                    </span>
                </button>
                {showCreatePopup && <CreatePopup setShowCreatePopup={setShowCreatePopup} />}
            </Block>

            {user ? (
                <>
                    <Block className={clsx(classes.profileWrapper, "ml-2 pointer mt-1")}>
                        {user.avatar ? (
                            <img src={user.avatar} className="border-circle o-hidden" width="32px" height="32px" />
                        ) : (
                            <Icons.ProfileIcon size={32} />
                        )}
                        <Block className={classes.profileContainer}>
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
                        </Block>
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
                        margin="0px 0px 0px 10px"
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

export default HomeNavbar

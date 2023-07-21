import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "~/utils/firebase"
import Lottie from "lottie-react"
import loginLottieData from "~/utils/lottiefiles/login-lottie.json"
import classes from "./Styles.module.css"
import clsx from "clsx"
import PopupCloseIcon from "~/components/Icons/PopupCloseIcon"
import GoogleIcon from "~/components/Icons/GoogleIcon"
import { Modal } from "baseui/modal"
import useAppContext from "~/hooks/useAppContext"
import { ACTIVE_PANEL_TOOL_NAMES } from "~/constants/contants"

interface LoginPopupProps {
  loginPopupCloseHandler: () => void
  isOpen: boolean
}

const LoginPopup = ({ loginPopupCloseHandler, isOpen }: LoginPopupProps) => {
  const loginHandler = async () => {
    try {
      await signInWithPopup(auth(), new GoogleAuthProvider())
      loginPopupCloseHandler()
    } catch (error) {
      console.log("error occured", error)
    }
  }

  const { activePanel } = useAppContext()


  return (
    <Modal
      // onClose={loginPopupCloseHandler}
      isOpen={isOpen}
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            zIndex: 500,
          }),
        },
        Close: {
          style: ({ $theme }) => ({
            display: "none",
          }),
        },
      }}
    >
      <div className={classes.popup}>
        <div className={classes.topHeader}>
          <h3>
            <span>Phot</span>.AI
          </h3>
          <button onClick={loginPopupCloseHandler}>
            <div className={classes.closeIconWrapper}>
              <PopupCloseIcon />
            </div>
          </button>
        </div>
        <div className={classes.iconWrapper}>
          <Lottie animationData={loginLottieData} loop={true} />
        </div>
        <h3 className={classes.mainHeading}>Login to continue!</h3>
        <p className={classes.text}>Please login with google, to use {ACTIVE_PANEL_TOOL_NAMES[activePanel]} tool!</p>
        <div className={classes.loginBtnWrapper}>
          <button
            onClick={()=>{
              loginHandler()
              loginPopupCloseHandler()
            }
              
            }
            className={clsx(classes.loginBtn, "d-flex align-items-center justify-content-center")}
          >
            <div className={clsx("mr-2 d-inline-block", classes.googleCon)}>
              <div className={classes.googleIcon}>
                <GoogleIcon />
              </div>
            </div>{" "}
            <div className={classes.continueWithGoogleText}>Continue with Google</div>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default LoginPopup

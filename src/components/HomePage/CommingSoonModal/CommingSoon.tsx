import { Block } from "baseui/block"
import { Modal, SIZE } from "baseui/modal"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import { useState } from "react"
import clsx from "clsx"
import { COMING_SOON_VIDEO_URL } from "~/utils/common"
import { addEmailForWaitingList } from "~/services/earlyAccess.service"

const CommingSoon = ({ isOpen }: any) => {
  const [userEmail, setUserEmail] = useState("")
  const [isAddedToWishList, setIsAddedToWishList] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [err, setErr] = useState("")

  const HandleJoinWaitingList = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidEmail = emailRegex.test(userEmail)
    if (isValidEmail) {
      try {
        const res = await addEmailForWaitingList(userEmail)
        if (res.status === 201) {
          setIsAddedToWishList(true)
        }
      } catch (error: any) {
        setErr(error.message)
      }
    } else {
      setErr(" * Wrong Email try again ! ")
    }
  }

  const handlePlayPause = () => {
    const video = document.getElementById("videoPlayer")
    if (isPlaying) {
      // @ts-ignore
      video.pause()
    } else {
      // @ts-ignore
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <Modal
      animate
      autoFocus
      size={SIZE.auto}
      isOpen={isOpen}
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            zIndex: 500,
            margin: "",
            outline: `transparent`,
          }),
        },
        Close: {
          style: ({ $theme }) => ({
            outline: `transparent`,
            display: "none",
          }),
        },
        Dialog: {
          style: ({ $theme }) => ({
            backgroundColor: "white",
            width: "46.56% ",
            height: "90vh",
            borderRadius: "10px",
            padding: "37px 35px 37px 26px",
            margin: "0px",
            overflow: "hidden",
          }),
        },
      }}
    >
      <Block className={classes.CoomingSoonMain}>
        <Block className={classes.commingSoonTopBar}>
          <a href="https://www.phot.ai/" className={classes.PhotLogo}>
            <Icons.PhotAILogo size={33} />
          </a>

          <a href="https://www.phot.ai/" style={{ cursor: "pointer" }}>
            <Icons.CommingSoonClose />
          </a>
        </Block>

        <Block className={classes.commingSoonCon}>
          <Block className={classes.commingSoonVideoCon} onClick={handlePlayPause}>
            <video
              id="videoPlayer"
              className={classes.video}
              width="100%"
              height="100%"
              // poster={CommingSoonPoster}
              onEnded={() => setIsPlaying(false)}
            >
              <source src={COMING_SOON_VIDEO_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {!isPlaying && (
              <div className={classes.customVideoIcon}>
                <div className={classes.customVideoCon}>
                  <span style={{ position: "relative" }}>
                    <Icons.EclipsePlay />
                    <span style={{ position: "absolute", zIndex: "1", right: "20px", top: "-32px" }}>
                      <Icons.VideoPlayIcon />
                    </span>
                  </span>
                </div>
              </div>
            )}
          </Block>
          <Block className={classes.commingSoonContentCon}>
            <h2 className={classes.contentHead}>Step into the future of photo editing with AI technology.</h2>
            {!isAddedToWishList ? (
              <>
                {" "}
                <div className={classes.waitingListCont}>
                  <input
                    type="text"
                    placeholder="We will notify you via email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className={clsx(classes.inputField)}
                  />
                  <button
                    style={userEmail ? { background: "#6729F3" } : {}}
                    className={classes.joinButton}
                    onClick={() => HandleJoinWaitingList()}
                  >
                    Join waiting list
                  </button>
                  {err && err.length > 0 && <p className={classes.errorMsg}>{err}</p>}
                </div>
              </>
            ) : (
              <div className={classes.CommingSoonAddedToWishList}>
                <Icons.CongratulationsTick />
                <p className={classes.AddedToWishListMsg}>Congratulations! You've been added to the waitlist!</p>
              </div>
            )}
          </Block>
        </Block>
      </Block>
    </Modal>
  )
}

export default CommingSoon

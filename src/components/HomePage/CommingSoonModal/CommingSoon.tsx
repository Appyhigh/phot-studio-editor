import { Block } from "baseui/block"
import { Modal, SIZE } from "baseui/modal"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import { useState } from "react"
import { CommingSoonVideo } from "../dummy"
import clsx from "clsx"

const CommingSoon = ({ isOpen }: any) => {
    const [userEmail, setUserEmail] = useState("")
    const [videoSource, setVideoSource] = useState(CommingSoonVideo)
    const [isValid, setIsValid] = useState<boolean | null>(true)
    const [isAddedToWishList, setIsAddedToWishList] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false);

    const HandleJoinWaitingList = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isValidEmail = emailRegex.test(userEmail)
        setIsValid(isValidEmail)
        if (isValidEmail) {
            setIsAddedToWishList(true)
        }
        setTimeout(() => {
            setIsValid(true)
        }, 3000)
    }

    const handlePlayPause = () => {
        const video = document.getElementById('videoPlayer');
        if (isPlaying) {
            // @ts-ignore
            video.pause();
        } else {
            // @ts-ignore
            video.play();
        }
        setIsPlaying(!isPlaying);
    };

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
                    <span >
                        <Icons.PhotAILogo size={33} />
                    </span>

                    <span onClick={() => {
                        window.location.href = 'https://www.phot.ai/';
                    }} style={{ cursor: "pointer" }}>
                        <Icons.CommingSoonClose />
                    </span>
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
                            <source src={videoSource} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {!isPlaying && <div className={classes.customVideoIcon} >
                            <div className={classes.customVideoCon} >
                                <span style={{ position: 'relative' }}><Icons.EclipsePlay />
                                    <span style={{ position: 'absolute', zIndex: '1', right: '20px', top: '-32px' }}><Icons.VideoPlayIcon /></span>
                                </span>
                            </div>
                        </div>}
                    </Block>
                    <Block className={classes.commingSoonContentCon}>
                        <h2 className={classes.contentHead}>Step into the future of photo editing with AI technology.</h2>
                        {!isAddedToWishList ? (
                            <>
                                {" "}
                                <div className={classes.waitingListCont}>
                                    <input
                                        type="text"
                                        placeholder="Get notified when ready! write your email"
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
                                    {!isValid && <p className={classes.errorMsg}> * Wrong Email try again ! </p>}
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

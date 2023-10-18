import React, { useState } from "react"
import classes from "./style.module.css"
import { Block } from "baseui/block"
import Icons from "~/components/Icons"

const ColorCardBtn = ({ Width, Height, ColorCode, HandleOnClick }: any) => {
    const [isHover, setIsHover] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    return (
        <Block className={classes.brandColorCardBtn}>
            <span
                className={classes.ColorCon}
                style={{ background: ColorCode ? ColorCode : "" }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => {
                    setIsHover(false)
                    setOpenPopup(false)
                }}
            >
                {isHover && <span className={classes.menuBtn} onClick={() => setOpenPopup(!openPopup)}><Icons.KebabMenu /></span>}

                {openPopup && <div className={classes.displayPopupOption}>
                    <span className={classes.popupOption}>Copy Color Code</span>
                    <span className={classes.popupOption}>Edit</span>
                    <span className={classes.popupOption}>Delete</span>
                </div>}
            </span>
            <h4 className={classes.ColorHashCode}>{ColorCode ? ColorCode.toUpperCase() : "#F259E8"}</h4>
        </Block>
    )
}

export default ColorCardBtn

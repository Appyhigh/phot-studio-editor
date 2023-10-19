import React, { useState } from "react"
import classes from "./style.module.css"
import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import Logo from '../dummyAssets/Frame 1073712052.png'
import clsx from "clsx"

const BrandLogo = ({ Width, Height, HandleOnClick, endImgLogo }: any) => {
    const [isHover, setIsHover] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    return (
        <Block className={classes.brandLogo}>
            <span
                className={classes.ColorCon}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => {
                    setIsHover(false)
                    setOpenPopup(false)
                }}
            >
                <img className={clsx(isHover && classes.logoImage)} style={{ width: '100%', height: '100%', }} src={Logo} alt='logoImage' />
                {isHover && <span className={classes.menuBtn} onClick={() => setOpenPopup(!openPopup)}><Icons.KebabMenu /></span>}

                {openPopup && <div className={classes.displayPopupOption} style={endImgLogo ? { right: '14px' } : {}}>
                    <span className={classes.popupOption}>Replace</span>
                    <span className={classes.popupOption}>Delete</span>
                </div>}
            </span>
        </Block>
    )
}

export default BrandLogo

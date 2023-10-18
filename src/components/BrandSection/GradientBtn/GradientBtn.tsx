import React, { useState } from "react"
import classes from "./style.module.css"
import { Block } from "baseui/block"
import Icons from "~/components/Icons"

const GradiantBtn = ({ Width, Height, ColorCode, HandleOnClick }: any) => {
    const [isHover, setIsHover] = useState(false)
    return (
        <Block className={classes.brandColorCardBtn}>
            <span
                className={classes.ColorCon}
                style={{ background: ColorCode ? ColorCode : "" }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => {
                    setIsHover(false)
                }}
            >
                {isHover && <span className={classes.menuBtn}><Icons.DeleteIcon /></span>}
            </span>

        </Block>
    )
}

export default GradiantBtn

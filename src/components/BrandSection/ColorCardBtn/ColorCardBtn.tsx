import React, { useState } from "react"
import classes from "./style.module.css"
import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import BrandColorPicker from "../ColorPicker/BrandColorPicker"

const ColorCardBtn = ({ ColorCode, index, handleDelete, handleEdit }: any) => {
    const [isHover, setIsHover] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const handleCloseEdit = () => {
        setIsEdit(false)
    }


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
                {isHover && (
                    <span className={classes.menuBtn} onClick={() => setOpenPopup(!openPopup)}>
                        <Icons.KebabMenu />
                    </span>
                )}

                {openPopup && (
                    <div className={classes.displayPopupOption}>
                        <span
                            onClick={() => {
                                navigator.clipboard.writeText(ColorCode)
                                setOpenPopup(false)
                            }}
                            className={classes.popupOption}
                        >
                            Copy Color Code
                        </span>
                        <span onClick={() => setIsEdit(!isEdit)} className={classes.popupOption}>Edit</span>
                        <span
                            onClick={() => {
                                handleDelete(index)
                                setOpenPopup(false)
                            }}
                            className={classes.popupOption}
                        >
                            Delete
                        </span>
                    </div>
                )}
            </span>
            <h4 className={classes.ColorHashCode}>{ColorCode ? ColorCode.toUpperCase() : "#F259E8"}</h4>

            {isEdit && <div
                id={`popup`}
                onMouseLeave={() => setIsEdit(false)}
                style={{ position: "absolute", top: "-13rem", left: "136px", zIndex: "1" }}
            >
                <BrandColorPicker index={index} handleAddColor={handleEdit} close={handleCloseEdit} />
            </div>}

        </Block>
    )
}

export default ColorCardBtn

import { Block } from "baseui/block"
import classes from "./style.module.css"
import Icons from "../../Icons"
import { ASSETS_DATA, SORT_OPTIONS } from "../../Templets/dummy"
import TempletCard from "../../Templets/TempletCard"
import { useState } from "react"

const DesignSection = ({ name }: any) => {
    const [isKebabMenu, setIsKebabMenu] = useState(null)
    const [isClickKebabMenu, setIsClickKebabMenu] = useState(false)
    const [sortDatePopup, setSortDatePopup] = useState(false)
    const [onSortOption, setOnSortOption] = useState(-1)
    const [onSortOptionCate, setOnSortOptionCate] = useState(-1)

    return (
        <Block className={classes.allFilesContainer}>
            <section className={classes.sectionToolsCon}>
                <Block className={classes.sectionTopCon}>
                    <span className="d-flex align-items-center" style={{ gap: "12px", cursor: "pointer" }}>
                        <h3 className={classes.sectionToolHead}>{name}</h3>
                    </span>

                    {name !== "Recent" && (
                        <Block className={classes.sectionTopBtns}>
                            <Block className="p-relative addPopupBtn">
                                <button className={classes.sectionBtns} onClick={() => setSortDatePopup(!sortDatePopup)}>
                                    <span className="d-flex align-items-center">
                                        Sort by: Date
                                        <span className="pl-1">
                                            <Icons.DownArrowFilled size={14} />
                                        </span>
                                    </span>
                                </button>

                                {sortDatePopup && (
                                    <div className={classes.sortbtnPopup}>
                                        {SORT_OPTIONS.map((option, ind) => {
                                            return (
                                                <div className={classes.sortOptionSec} key={ind} onMouseEnter={() => setOnSortOptionCate(ind)} onMouseLeave={() => setOnSortOptionCate(-1)}>
                                                    <h4 className={classes.sortOptionHead}>{option.title}</h4>
                                                    <div className={classes.sortOptionCon}>
                                                        {
                                                            option.options.map((data, idx) => {
                                                                return (
                                                                    <span className={classes.sortOption} key={idx} onMouseEnter={() => setOnSortOption(idx)} onMouseLeave={() => setOnSortOption(-1)}>
                                                                        <p>{data}</p> {onSortOption === idx && onSortOptionCate === ind && <Icons.RightTickMark />}
                                                                    </span>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                )}
                            </Block>
                        </Block>
                    )}
                </Block>

                <Block className={classes.sectionCardWrap}>
                    {name === 'Recent' ?
                        <>
                            {ASSETS_DATA.slice(0, 2).map((data, index) => {
                                return (
                                    <div
                                        key={index}
                                        onMouseEnter={() => setIsKebabMenu(index)}
                                        onMouseLeave={() => {
                                            setIsKebabMenu(null)
                                            setIsClickKebabMenu(false)
                                        }}
                                        style={{ position: "relative" }}
                                    >
                                        <TempletCard data={data} isKebabMenu={isKebabMenu === index} key={index} />

                                        {isKebabMenu === index && (
                                            <span
                                                style={{ position: "absolute", top: "8px", right: "8px", cursor: "pointer" }}
                                                onClick={() => setIsClickKebabMenu(!isClickKebabMenu)}
                                            >
                                                <Icons.KebabMenu />
                                            </span>
                                        )}

                                        {isKebabMenu === index && isClickKebabMenu && (
                                            <div className={classes.cardMenuPopup}>
                                                <span className={classes.cardMenuOption}>Edit</span>
                                                <span className={classes.cardMenuOption}>Rename</span>
                                                <span className={classes.cardMenuOption}>Make a Copy</span>
                                                <span className={classes.cardMenuOption}>Delete</span>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </>
                        :
                        <>
                            {ASSETS_DATA.map((data, index) => {
                                return (
                                    <div
                                        key={index}
                                        onMouseEnter={() => setIsKebabMenu(index)}
                                        onMouseLeave={() => {
                                            setIsKebabMenu(null)
                                            setIsClickKebabMenu(false)
                                        }}
                                        style={{ position: "relative" }}
                                    >
                                        <TempletCard data={data} isKebabMenu={isKebabMenu === index} key={index} />

                                        {isKebabMenu === index && (
                                            <span
                                                style={{ position: "absolute", top: "8px", right: "8px", cursor: "pointer" }}
                                                onClick={() => setIsClickKebabMenu(!isClickKebabMenu)}
                                            >
                                                <Icons.KebabMenu />
                                            </span>
                                        )}

                                        {isKebabMenu === index && isClickKebabMenu && (
                                            <div className={classes.cardMenuPopup}>
                                                <span className={classes.cardMenuOption}>Edit</span>
                                                <span className={classes.cardMenuOption}>Rename</span>
                                                <span className={classes.cardMenuOption}>Make a Copy</span>
                                                <span className={classes.cardMenuOption}>Delete</span>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </>}
                </Block>
            </section>
        </Block>
    )
}

export default DesignSection

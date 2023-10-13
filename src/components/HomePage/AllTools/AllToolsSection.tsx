import { Block } from "baseui/block"
import classes from "./style.module.css"
import HomepageToolCard from "../card/HomepageToolCard"
import clsx from "clsx"
import { useState } from "react"
import { All_TOOLS, ALL_TOOLS_TABS } from "../dummy"

const AllToolsSection = () => {
    const [selectedToolCategoryTab, setSelectedToolCategoryTab] = useState(0)
    return (
        <section className={classes.allToolsCon}>
            <Block className="d-flex justify-content-between align-items-center " style={{ width: "1040px" }}>
                <h3 className={classes.allToolHead}>All TOOLS</h3>
                <ul className={classes.homepageToolsTabs}>
                    {ALL_TOOLS_TABS.map((tab, idx) => (
                        <li key={idx} onClick={() => setSelectedToolCategoryTab(idx)}>
                            <button
                                className={clsx(
                                    classes.homepageToolsTabsBtn,
                                    selectedToolCategoryTab === idx && classes.selectedToolCategoryTab
                                )}
                            >
                                {tab}
                            </button>
                        </li>
                    ))}
                </ul>
            </Block>

            <Block className={classes.allCardWrap}>
                {All_TOOLS.map((data, index) => {
                    return <HomepageToolCard data={data} key={index} />
                })}
            </Block>
        </section>
    )
}
export default AllToolsSection

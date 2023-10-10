import { Block } from "baseui/block"
import classes from "./style.module.css"
import HomepageToolCard from "../card/HomepageToolCard"
import { POPULAR_TOOLS } from "~/components/HomePage/dummy"

const PopularToolsSection = () => {
    return (
        <section className={classes.popularToolsCon}>
            <h3 className={classes.popularToolHead}>POPULAR TOOLS</h3>
            <Block className={classes.popularCardWrap}>
                {POPULAR_TOOLS.map((data, index) => {
                    return <HomepageToolCard data={data} key={index} />
                })}
            </Block>
        </section>
    )
}

export default PopularToolsSection

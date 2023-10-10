import { Block } from "baseui/block"
import classes from "./style.module.css"
import TempletCard from "../TempletCard"
import { TEMPLETS_DATA } from "../dummy"

const TempletSection = () => {
    return (
        <Block className={classes.templetsContainer}>
            {Array.from({ length: 3 }, (_, index) => (
                <section className={classes.sectionToolsCon}>
                    <h3 className={classes.sectionToolHead}>Recently used</h3>
                    <Block className={classes.sectionCardWrap}>
                        {TEMPLETS_DATA.map((data, index) => {
                            return <TempletCard data={data} key={index} />
                        })}
                    </Block>
                </section>

            ))}
        </Block>
    )
}

export default TempletSection

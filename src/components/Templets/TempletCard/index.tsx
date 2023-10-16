import { Block } from "baseui/block";
import classes from "./style.module.css";
import { Modal, SIZE } from "baseui/modal";
import clsx from "clsx";

const TempletCard = ({ data, isKebabMenu }: any) => {
    return (
        <Block className={classes.templeteCard} >
            <div className={clsx(classes.templeteCardImgCon, isKebabMenu && classes.templeteCardImgConHover)}>
                <img src={data.src} alt={data.title} />
            </div>
            <div className={classes.descCon}>
                <h3 className={classes.templeteCardHeader}>{data.title}</h3>
                <p className={classes.templeteCardDesc}>{data.discription}</p>
            </div>

        </Block>
    );
};

export default TempletCard;

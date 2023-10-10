import { Block } from 'baseui/block';
import classes from './style.module.css'
const TempletCard = ({ data }: any) => {
    return (
        <Block className={classes.templeteCard}>
            <div className={classes.templeteCardImgCon}>
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


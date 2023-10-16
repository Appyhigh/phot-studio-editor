import { Block } from 'baseui/block';
import classes from './style.module.css'
import Icons from '~/components/Icons';
const HomepageToolCard = ({ data }: any) => {
    return (
        <Block className={classes.toolCard}>
            <div className={classes.toolCardImgCon}>
                <img src={data.src} alt={data.title} />
            </div>
            <div className={classes.descCon}>
                <h3 className={classes.toolCardHeader}>{data.title}</h3>
                <p className={classes.toolCardDesc}>{data.discription}</p>
            </div>
            {data.title !== 'Product photoshoot' && <div className={classes.comingSoonWrapper}>
                <Icons.CommingSoon />
            </div>}
        </Block>
    );
};
export default HomepageToolCard;

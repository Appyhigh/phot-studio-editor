import { Block } from 'baseui/block'
import classes from './DesignSection/style.module.css'
import Section from '../AssetSection/FileSection/FileSection'
import { PanelSection } from '~/constants/app-options'
import DesignSection from './DesignSection/DesignSection'

const YourDesigns = () => {
    return (
        <Block className={classes.DesignContainer}>
            <DesignSection name="Recent" />
            <DesignSection name="Designs" />
        </Block>
    )
}

export default YourDesigns

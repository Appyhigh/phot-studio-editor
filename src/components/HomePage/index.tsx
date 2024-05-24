import { Block } from 'baseui/block'
import HomeSlider from './Poster/HomeSlider'
import PopularToolsSection from './PopularTools/PopularToolsSection'
import AllToolsSection from './AllTools/AllToolsSection'
import CommingSoon from './CommingSoonModal/CommingSoon'

const Home = () => {

    return (
        <Block style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* <CommingSoon isOpen={true} /> */}
            <HomeSlider />
            <PopularToolsSection />
            <AllToolsSection />
        </Block>
    )
}

export default Home

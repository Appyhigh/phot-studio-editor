import { Block } from "baseui/block"
import HomeSlider from "./Poster/HomeSlider"
import PopularToolsSection from "./PopularTools/PopularToolsSection"
import AllToolsSection from "./AllTools/AllToolsSection"
import CommingSoon from "./CommingSoonModal/CommingSoon"
import { useState } from "react"

const Home = () => {
  const [isComingSoonPopupOpen, setIsComingSoonPopupOpen] = useState(true)

  return (
    <Block style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <CommingSoon
        isOpen={isComingSoonPopupOpen}
        closeHandler={() => {
          setIsComingSoonPopupOpen(false)
        }}
      />
      <HomeSlider />
      <PopularToolsSection />
      <AllToolsSection />
    </Block>
  )
}

export default Home

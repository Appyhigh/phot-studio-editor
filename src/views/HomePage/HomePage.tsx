import React from 'react'
import Panels from '../DesignEditor/components/Panels'
import { Theme, styled } from "baseui"
import HomeNavbar from '~/components/HomePage/Navbar/HomeNavbar'
import { Block } from 'baseui/block'
import PopularTools from '~/components/HomePage/PopularTools/PopularToolsSection'
import AllToolsSection from '~/components/HomePage/AllTools/AllToolsSection'
import HomeSlider from '~/components/HomePage/Poster/HomeSlider'
import classes from './style.module.css'
const HomePage = () => {
  return (
    <EditorContainer>
      <Panels />
      <Block style={{ width: '100%', height: '100%' }}>
        <HomeNavbar />
        <Block className={classes.homeSection} >
          <HomeSlider />
          <PopularTools />
          <AllToolsSection />
        </Block>
      </Block>
    </EditorContainer>
  )
}

export default HomePage



export const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  width: "100vw",
  height: "100vh",
  background: $theme.colors.primaryB,
}))

export const EditorContainer = ({ children }: { children: React.ReactNode }) => {
  return <Container className="d-flex flex-row " style={{ gap: '1px' }}>{children}</Container>
}




import React from 'react'
import Panels from '../DesignEditor/components/Panels'
import { Theme, styled } from "baseui"
import HomeNavbar from '~/components/HomePage/Navbar/HomeNavbar'
import { Block } from 'baseui/block'
import classes from './style.module.css'
import TempletSection from '~/components/Templets'
import Home from '~/components/HomePage'
import useAppContext from '~/hooks/useAppContext'
import AssetSection from '~/components/AssetSection'
import BrandSection from '~/components/BrandSection'
import YourDesigns from '~/components/YourDesigns'

const HomePage = () => {

  const { activeSection } = useAppContext()


  return (
    <EditorContainer>
      <Panels />
      <Block style={{ width: '100%', height: '100%' }}>
        <HomeNavbar />
        <Block className={classes.homeSection} >
          {activeSection === 'Home' && <Home />}
          {activeSection === 'TempletSection' && <TempletSection />}
          {activeSection === 'Assets' && <AssetSection />}
          {activeSection === 'Brand' && <BrandSection />}
          {activeSection === 'YourDesigns' && <YourDesigns />}
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




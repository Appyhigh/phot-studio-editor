import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Common from "./Common"
import Scenes from "./Scenes"
import Toolbox from "../../Toolbox"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  background: $theme.colors.white,
}))

const Graphic = () => {
  return (
    <Container>
      {/* <Scenes /> */}
      {/* <Common /> */}
      <Toolbox />
    </Container>
  )
}

export default Graphic

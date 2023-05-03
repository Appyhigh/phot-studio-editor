import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Common from "./Common"
import Scenes from "./Scenes"
import CanvasEditingPannel from "./CanvasEditingPannel"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  maxWidth: "600px",
}))

const Graphic = () => {
  return (
    <Container>
      {/* <Scenes /> */}
      <CanvasEditingPannel />
      {/* <Common /> */}
    </Container>
  )
}

export default Graphic

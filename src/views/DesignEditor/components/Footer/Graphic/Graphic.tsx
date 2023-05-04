import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Common from "./Common"
import Scenes from "./Scenes"
import Toolbox from "../../Toolbox"
import CanvasEditingPannel from "./CanvasEditingPannel"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent:"center"
}))

const Graphic = () => {
  return (
    <Container>
      {/* <Scenes /> */}
      {/* <Common /> */}
      <CanvasEditingPannel />

      {/* <Toolbox /> */}
      {/* <Common /> */}
    </Container>
  )
}

export default Graphic

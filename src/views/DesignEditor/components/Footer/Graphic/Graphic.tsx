import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Common from "./Common"
import Scenes from "./Scenes"
import Toolbox from "../../Toolbox"
import CanvasEditingPannel from "./CanvasEditingPannel"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  width: "100%",
}))

const Graphic = () => {
  return (
    <Container className="d-flex justify-content-center flex-row">
      {/* <Scenes /> */}
      <Toolbox />
      {/* <Common /> */}
    </Container>
  )
}

export default Graphic

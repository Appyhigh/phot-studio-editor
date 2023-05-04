import { Theme, styled } from "baseui"
import React from "react"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  width: "100vw",
  height: "100vh",
  background: $theme.colors.primaryB,
}))

const EditorContainer = ({ children }: { children: React.ReactNode }) => {
  return <Container className="d-flex flex-column">{children}</Container>
}

export default EditorContainer

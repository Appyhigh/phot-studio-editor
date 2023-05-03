import React from "react"
import { Block } from "baseui/block"

const EditorContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "rgb(241, 242, 246)",
        fontFamily: "Poppins",
      }}
    >
      {children}
    </div>
  )
}

export default EditorContainer

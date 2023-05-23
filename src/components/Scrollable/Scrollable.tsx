import Scrollbars from "@layerhub-io/react-custom-scrollbar"
import React from "react"

export default function ({ children, autoHide ,onScroll}: { children: React.ReactNode; autoHide?: boolean,onScroll?:any }) {
  
  return (
    <div style={{ flex: 1, position: "relative" }}>
      <div style={{ height: "100%", width: "100%", position: "absolute", overflow: "hidden" }}>
        <Scrollbars  onScroll={onScroll} autoHide={autoHide}>{children}</Scrollbars>
      </div>
    </div>
  )
}

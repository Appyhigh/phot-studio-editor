import Scrollbars from "@layerhub-io/react-custom-scrollbar"
import React from "react"

export default function ({
  children,
  autoHide,
  onScroll,
  marginBottom,
}: {
  children: React.ReactNode
  autoHide?: boolean
  onScroll?: any
  marginBottom?: any
}) {
  return (
    <div style={{ flex: 1, position: "relative", marginBottom: marginBottom && marginBottom  }}>
      <div style={{ height: "100%", width: "100%", position: "absolute", top: 0, overflow: "hidden" }}>
        <Scrollbars onScroll={onScroll} autoHide={autoHide}>
          {children}
        </Scrollbars>
      </div>
    </div>
  )
}

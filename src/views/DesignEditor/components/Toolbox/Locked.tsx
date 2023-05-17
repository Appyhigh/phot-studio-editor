import React from "react"
import { Block } from "baseui/block"
import { useEditor } from "@layerhub-io/react"
import { PLACEMENT, StatefulTooltip } from "baseui/tooltip"
import { Button, SIZE, KIND } from "baseui/button"
import UnlockedIcon from "~/components/Icons/Unlocked"
import Common from "./Common/Common"

const Locked = () => {
  const editor = useEditor()

  return (
    <Block
    className="d-flex align-items-center justify-content-between"
    $style={{
      padding: "12px",
      backgroundColor: "#fff",
      borderRadius: "8px",
    }}
  >
    {/* //dont need for now  */}
    {/* <Block>
    </Block> */}
    <Common type="lock" />
  </Block>
  )
}

export default Locked

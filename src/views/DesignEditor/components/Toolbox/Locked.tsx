import React from "react"
import { Block } from "baseui/block"
import { useEditor } from "@layerhub-io/react"
import { PLACEMENT, StatefulTooltip } from "baseui/tooltip"
import { Button, SIZE, KIND } from "baseui/button"
import UnlockedIcon from "~/components/Icons/Unlocked"

const Locked = () => {
  const editor = useEditor()

  return (
    <Block
      $style={{
        display: "flex",
        alignItems: "center",
        backgroundColor:"#FFF",
        padding: "0 12px",
      }}
    >
      <StatefulTooltip placement={PLACEMENT.bottom} showArrow={true} accessibilityType="tooltip" content="Unlock">
        <Button
          onClick={() => {
            editor.objects.unlock()
          }}
          size={SIZE.mini}
          kind={KIND.tertiary}
        >
          <UnlockedIcon size={24} />
        </Button>
      </StatefulTooltip>
    </Block>
  )
}

export default Locked

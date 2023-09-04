import { useEditor, useActiveObject } from "@layerhub-io/react"
import { Block } from "baseui/block"
import { Button, SIZE, KIND } from "baseui/button"
import { PLACEMENT, StatefulPopover } from "baseui/popover"
import AlignCenter from "~/components/Icons/AlignCenter"
import AlignLeft from "~/components/Icons/AlignLeft"
import AlignRight from "~/components/Icons/AlignRight"
import AlignTop from "~/components/Icons/AlignTop"
import AlignMiddle from "~/components/Icons/AlignMiddle"
import AlignBottom from "~/components/Icons/AlignBottom"
import { ToolButton } from "./ToolButton"
import AlignCenterIn from "~/components/Icons/AlignCenterIn"
import { useEffect, useRef, useState } from "react"

const CommonAlign = ({ type }: any) => {
  const [isDisabled, setIsDisabled] = useState("none")
  const editor = useEditor()
  const tooltipRef = useRef(null);

  const handleTooltipMouseLeave = () => {
    // @ts-ignore
    tooltipRef.current.style.display = 'none';
  };

  useEffect(() => {
    editor.on("history:changed", () => {
      setIsDisabled("none")
    })
  }, [])

  return (
    <StatefulPopover
      placement={PLACEMENT.bottomRight}
      content={() =>
        type === "lock" ? null : (
          <Block
            ref={tooltipRef}
            onMouseLeave={handleTooltipMouseLeave}
            padding="12px"
            backgroundColor="#ffffff"
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr"
            gridGap="8px"
          >
            <Button
              onClick={() => {
                editor.objects.alignLeft()
                setIsDisabled("left")
              }}
              kind={KIND.tertiary}
              size={SIZE.mini}
              disabled={isDisabled === "left" ? true : false}
            >
              <AlignLeft size={24} />
            </Button>
            <Button
              onClick={() => {
                editor.objects.alignCenter()
                setIsDisabled("center")
              }}
              kind={KIND.tertiary}
              size={SIZE.mini}
              disabled={isDisabled === "center" ? true : false}
              style={{ opacity: isDisabled === "center" ? "0.5" : "1" }}
            >
              <AlignCenterIn size={24} />
            </Button>
            <Button
              onClick={() => {
                editor.objects.alignRight()
                setIsDisabled("right")
              }}
              kind={KIND.tertiary}
              size={SIZE.mini}
              disabled={isDisabled === "right" ? true : false}
            >
              <AlignRight size={24} />
            </Button>
            <Button
              onClick={() => {
                editor.objects.alignTop()
                setIsDisabled("top")
              }}
              kind={KIND.tertiary}
              size={SIZE.mini}
              disabled={isDisabled === "top" ? true : false}
            >
              <AlignTop size={24} />
            </Button>
            <Button
              onClick={() => {
                editor.objects.alignMiddle()
                setIsDisabled("middle")
              }}
              kind={KIND.tertiary}
              size={SIZE.mini}
              disabled={isDisabled === "middle" ? true : false}
            >
              <AlignMiddle size={24} />
            </Button>
            <Button
              onClick={() => {
                editor.objects.alignBottom()
                setIsDisabled("bottom")
              }}
              kind={KIND.tertiary}
              size={SIZE.mini}
              disabled={isDisabled === "bottom" ? true : false}
            >
              <AlignBottom size={24} />
            </Button>
          </Block>
        )
      }
      returnFocus
      autoFocus
    >
      <div>
        <ToolButton type={type} icon={<AlignCenter size={27} />} name="Align" />
      </div>
    </StatefulPopover>
  )
}

export default CommonAlign

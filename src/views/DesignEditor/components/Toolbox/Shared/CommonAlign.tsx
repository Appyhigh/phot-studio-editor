import { useEditor } from "@layerhub-io/react"
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

const CommonAlign = ({ type }: any) => {
  const editor = useEditor()
  return (
    <StatefulPopover
      placement={PLACEMENT.bottomRight}
      content={() =>
        type === "lock" ? null : (
          <Block
            padding="12px"
            backgroundColor="#ffffff"
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr"
            gridGap="8px"
          >
            <Button onClick={() => editor.objects.alignLeft()} kind={KIND.tertiary} size={SIZE.mini}>
              <AlignLeft size={24} />
            </Button>
            <Button onClick={() => editor.objects.alignCenter()} kind={KIND.tertiary} size={SIZE.mini}>
              <AlignCenterIn size={24}  />
            </Button>
            <Button onClick={() => editor.objects.alignRight()} kind={KIND.tertiary} size={SIZE.mini}>
              <AlignRight size={24} />
            </Button>
            <Button onClick={() => editor.objects.alignTop()} kind={KIND.tertiary} size={SIZE.mini}>
              <AlignTop size={24} />
            </Button>
            <Button onClick={() => editor.objects.alignMiddle()} kind={KIND.tertiary} size={SIZE.mini}>
              <AlignMiddle size={24} />
            </Button>
            <Button onClick={() => editor.objects.alignBottom()} kind={KIND.tertiary} size={SIZE.mini}>
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

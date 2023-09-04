import { useEditor } from "@layerhub-io/react"
import { Block } from "baseui/block"
import { Button, SIZE, KIND } from "baseui/button"
import { PLACEMENT, StatefulPopover } from "baseui/popover"
import { TEXT_EFFECTS } from "~/constants/design-editor"
import { useRef, useState } from "react"

const TextEffectsNew = ({ type }: any) => {
  const editor = useEditor()
  const [color, setColor] = useState("#b32aa9")
  const tooltipRef = useRef(null);

  const handleTooltipMouseLeave = () => {
    // @ts-ignore
    tooltipRef.current.style.display = 'none';
  };

  const EFFECTS = {
    None: {
      fill: "#333333",
      strokeWidth: 0,
      shadow: {
        blur: 2,
        color: "#afafaf",
        offsetX: 10,
        offsetY: 10,
        enabled: false,
      },
    },
    Shadow: {
      fill: "#333333",
      shadow: {
        blur: 2,
        color: "#afafaf",
        offsetX: 10,
        offsetY: 10,
        enabled: true,
      },
    },
    Lift: {
      fill: "#333333",
      shadow: {
        blur: 25,
        color: "rgba(0,0,0,0.45)",
        offsetX: 0,
        offsetY: 0,
        enabled: true,
      },
    },
    Hollow: {
      stroke: "#000000",
      fill: null,
      strokeWidth: 2,
      shadow: {
        blur: 25,
        color: "rgba(0,0,0,0.45)",
        offsetX: 0,
        offsetY: 0,
        enabled: false,
      },
    },
    Splice: {
      stroke: "#000000",
      fill: null,
      strokeWidth: 2,
      shadow: {
        blur: 0,
        color: "#afafaf",
        offsetX: 10,
        offsetY: 10,
        enabled: true,
      },
    },
    Neon: {
      stroke: "#e84393",
      fill: "#fd79a8",
      strokeWidth: 2,
      shadow: {
        blur: 25,
        color: "#fd79a8",
        offsetX: 0,
        offsetY: 0,
        enabled: true,
      },
    },
  }


  const applyEffect = (name: string) => {
    if (editor) {
      //  @ts-ignore
      const effect = EFFECTS[name]
      if (effect) {
        editor.objects.update(effect)
      }
    }
  }
  return (
    <StatefulPopover
      placement={PLACEMENT.bottomRight}
      content={() =>
        type === "lock" ? null : (
          <Block
            onMouseLeave={handleTooltipMouseLeave}
            ref={tooltipRef}
            padding="12px"
            backgroundColor="#ffffff"
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr"
            gridGap="8px"
            marginBottom="3.5px"
          >
            {TEXT_EFFECTS.map((effect, index) => {
              return (
                <Button onClick={() => applyEffect(effect.name)} kind={KIND.tertiary} size={SIZE.mini} key={index}>
                  <img src={effect.preview} alt="" style={{ width: "34px" }} />
                </Button>
              )
            })}
          </Block>
        )
      }
      returnFocus
      autoFocus
    >
      <div style={{ padding: "8px 5px", fontWeight: 500, cursor: "pointer" }}>
        <p >Effects</p>
      </div>
    </StatefulPopover>
  )
}

export default TextEffectsNew

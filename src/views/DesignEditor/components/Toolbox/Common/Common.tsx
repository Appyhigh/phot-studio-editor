import React from "react"
import { Button, SIZE, KIND } from "baseui/button"
import { Checkbox } from "baseui/checkbox"
import { Block } from "baseui/block"
import { StatefulTooltip, PLACEMENT } from "baseui/tooltip"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { StatefulPopover } from "baseui/popover"
import DeleteIcon from "~/components/Icons/Delete"
import UnlockedIcon from "~/components/Icons/Unlocked"
import LockedIcon from "~/components/Icons/Locked"
import DuplicateIcon from "~/components/Icons/Duplicate"
import LayersIcon from "~/components/Icons/Layers"
import AlignCenter from "~/components/Icons/AlignCenter"
import AlignLeft from "~/components/Icons/AlignLeft"
import AlignRight from "~/components/Icons/AlignRight"
import AlignTop from "~/components/Icons/AlignTop"
import AlignMiddle from "~/components/Icons/AlignMiddle"
import BringToFront from "~/components/Icons/BringToFront"
import SendToBack from "~/components/Icons/SendToBack"
import AlignBottom from "~/components/Icons/AlignBottom"
import Opacity from "../Shared/Opacity"
import Eye from "~/components/Icons/Eye"
import EyeCrossed from "~/components/Icons/EyeCrossed"
import Flip from "../Shared/Flip"
import classes from "./style.module.css"
import clsx from "clsx"
import ArrowUp from "~/components/Icons/ArrowUp"
import SendBack from "~/components/Icons/SendBack"
import Locked from "~/components/Icons/Locked"
import Layers from "~/components/Icons/Layers"
const Common = () => {
  const [state, setState] = React.useState({ isGroup: false, isMultiple: false })
  const activeObject = useActiveObject() as any

  const editor = useEditor()

  React.useEffect(() => {
    if (activeObject) {
      setState({ isGroup: activeObject.type === "group", isMultiple: activeObject.type === "activeSelection" })
    }
  }, [activeObject])

  React.useEffect(() => {
    let watcher = async () => {
      if (activeObject) {
        // @ts-ignore
        setState({ isGroup: activeObject.type === "group", isMultiple: activeObject.type === "activeSelection" })
      }
    }
    if (editor) {
      editor.on("history:changed", watcher)
    }
    return () => {
      if (editor) {
        editor.off("history:changed", watcher)
      }
    }
  }, [editor, activeObject])

  return (
    <Block $style={{ display: "flex", alignItems: "center" }}
    >
      <Flip />
      <div
        onClick={() => editor.objects.clone()}
        className="d-flex justify-content-center align-items-center flex-column pointer mx-1"
      >
        <DuplicateIcon size={22} />
        <p className={clsx(classes.subHeadingText)}>Duplicate</p>
      </div>
      <div
        onClick={() => editor.objects.bringToFront()}
        className="d-flex justify-content-center align-items-center flex-column pointer mx-1"
      >
        <ArrowUp />

        <p className={clsx(classes.subHeadingText)}>Front</p>
      </div>
      <div
        onClick={() => editor.objects.sendToBack()}
        className="d-flex justify-content-center align-items-center flex-column pointer mx-1"
      >
        <SendBack />

        <p className={classes.subHeadingText}>Back</p>
      </div>
      <LockUnlock />

      {state.isGroup ? (
        <div
          onClick={() => {
            editor.objects.ungroup()
            setState({ ...state, isGroup: false })
          }}
          className="d-flex justify-content-center align-items-center flex-column pointer mx-1"
        >
          <LayersIcon size={22} />

          <p className={classes.subHeadingText}>Ungroup</p>
        </div>
      ) : !activeObject?._objects?.map((el: any) => el?._objects?.length > 0).includes(true) ? (
        <div
          onClick={() => {
            editor.objects.group()
            setState({ ...state, isGroup: true })
          }}
          className="d-flex justify-content-center align-items-center flex-column pointer mx-1"
        >
          <LayersIcon size={22} />
          <p className={clsx(classes.subHeadingText)}>Group</p>
        </div>
      ) : null}

      {/* {(state.isGroup || !state.isMultiple) && <CommonLayers />} */}
      <CommonAlign />
      <Opacity />
      <Visiblity />

      <div
        onClick={() => editor.objects.remove()}
        className="d-flex justify-content-center align-items-center flex-column pointer mx-1"
      >
        <DeleteIcon size={22} />
        <p className={clsx(classes.subHeadingText)}>Delete</p>
      </div>
    </Block>
  )
}

const CommonLayers = () => {
  const editor = useEditor()
  const [checked, setChecked] = React.useState(true)
  const activeObject = useActiveObject()

  React.useEffect(() => {
    if (activeObject) {
      //  @ts-ignore
      setChecked(!!activeObject.clipPath)
    }
  }, [activeObject])
  return (
    <StatefulPopover
      placement={PLACEMENT.bottomRight}
      content={() => (
        <Block padding="12px" backgroundColor="#ffffff">
          <Block display="grid" gridTemplateColumns="1fr 1fr" gridGap="8px">
            <Button
              startEnhancer={<BringToFront size={24} />}
              onClick={() => editor.objects.bringToFront()}
              kind={KIND.tertiary}
              size={SIZE.mini}
            >
              Bring to front
            </Button>
            <Button
              startEnhancer={<SendToBack size={24} />}
              onClick={() => editor.objects.sendToBack()}
              kind={KIND.tertiary}
              size={SIZE.mini}
            >
              Send to back
            </Button>
          </Block>

          <Block
            $style={{
              display: "flex",
              fontSize: "12px",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: 500,
              fontFamily: "system-ui,",
              padding: "0.5rem 0.5rem",
              cursor: "pointer",
              ":hover": {
                background: "rgb(244,245,246)",
              },
            }}
          >
            <Checkbox
              overrides={{
                Checkmark: {
                  style: {
                    height: "16px",
                    width: "16px",
                  },
                },
              }}
              checked={checked}
              onChange={() => {
                editor.objects.update({ clipToFrame: !checked })
                setChecked(!checked)
              }}
            />
            <Block>Clip to frame</Block>
          </Block>
        </Block>
      )}
      returnFocus
      autoFocus
    >
      <Block>
        <StatefulTooltip placement={PLACEMENT.bottom} showArrow={true} accessibilityType="tooltip" content="Layers">
          <Button size={SIZE.mini} kind={KIND.tertiary}>
            <LayersIcon size={19} />
          </Button>
        </StatefulTooltip>
      </Block>
    </StatefulPopover>
  )
}

const CommonAlign = () => {
  const editor = useEditor()
  return (
    <StatefulPopover
      placement={PLACEMENT.bottomRight}
      content={() => (
        <Block padding="12px" backgroundColor="#ffffff" display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap="8px">
          <Button onClick={() => editor.objects.alignLeft()} kind={KIND.tertiary} size={SIZE.mini}>
            <AlignLeft size={24} />
          </Button>
          <Button onClick={() => editor.objects.alignCenter()} kind={KIND.tertiary} size={SIZE.mini}>
            <AlignCenter size={24} />
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
      )}
      returnFocus
      autoFocus
    >
      <div className="d-flex justify-content-center align-items-center flex-column pointer mx-1">
        <AlignCenter size={24} />
        <p className={clsx(classes.subHeadingText)}>Align</p>
      </div>
    </StatefulPopover>
  )
}

const LockUnlock = () => {
  const [state, setState] = React.useState<{ locked: boolean }>({ locked: false })
  const editor = useEditor()
  const activeObject = useActiveObject()

  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      setState({ locked: !!activeObject.locked })
    }
  }, [activeObject])

  return state.locked ? (
    <StatefulTooltip placement={PLACEMENT.bottom} showArrow={true} accessibilityType="tooltip" content="Lock">
      <Button
        onClick={() => {
          editor.objects.unlock()
          setState({ locked: false })
        }}
        size={SIZE.mini}
        kind={KIND.tertiary}
      >
        <UnlockedIcon size={24} />
      </Button>
    </StatefulTooltip>
  ) : (
    <div
      onClick={() => {
        editor.objects.lock()
        setState({ locked: true })
      }}
      className="d-flex justify-content-center align-items-center flex-column pointer mx-1"
    >
      <Locked size={22} />
      <p className={clsx(classes.subHeadingText, "mt-1")}>Lock</p>
    </div>
  )
}

const Visiblity = () => {
  const [state, setState] = React.useState<{ visible: boolean }>({ visible: true })
  const editor = useEditor()
  const activeObject = useActiveObject()

  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      setState({ visible: !!activeObject.visible })
    }
  }, [activeObject])
  return state.visible ? (
    <div
      onClick={() => {
        editor.objects.update({ visible: false })

        setState({ visible: false })
      }}
      className="d-flex justify-content-center align-items-center flex-column pointer mx-1"
    >
      <Eye size={24} />
      <p className={clsx(classes.subHeadingText)}>Visibility</p>
    </div>
  ) : (
    <div
      onClick={() => {
        editor.objects.update({ visible: true })

        setState({ visible: true })
      }}
      className="d-flex justify-content-center align-items-center flex-column pointer mx-1"
    >
      <EyeCrossed size={24} />
      <p className={clsx(classes.subHeadingText)}>Visibility</p>
    </div>
  )
}

export default Common

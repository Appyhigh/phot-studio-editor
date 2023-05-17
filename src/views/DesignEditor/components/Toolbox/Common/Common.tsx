import React from "react"
import { Button, SIZE, KIND } from "baseui/button"
import { Checkbox } from "baseui/checkbox"
import { Block } from "baseui/block"
import { StatefulTooltip, PLACEMENT } from "baseui/tooltip"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { StatefulPopover } from "baseui/popover"
import DeleteIcon from "~/components/Icons/Delete"
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
import Unlocked from "~/components/Icons/Unlocked"
const Common = ({ type }: any) => {
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
    <Block $style={{ display: "flex", alignItems: "center" }}>
      <Flip type={type} />
      <button
        disabled={type === "lock" ? true : false}
        className={clsx(
          "d-flex justify-content-center align-items-center flex-column ml-1",
          classes.editingBtn,
          type === "lock" && classes.disabledBtn
        )}
        onClick={() => editor.objects.clone()}
      >
        <DuplicateIcon size={22} />
        <p className={clsx(classes.subHeadingText)}>Duplicate</p>
      </button>
      <button
        disabled={type === "lock" ? true : false}
        className={clsx(
          "d-flex justify-content-center align-items-center flex-column ml-1",
          classes.editingBtn,
          type === "lock" && classes.disabledBtn
        )}
        onClick={() => editor.objects.bringToFront()}
      >
        <ArrowUp />

        <p className={clsx(classes.subHeadingText)}>Front</p>
      </button>
      <button
        disabled={type === "lock" ? true : false}
        className={clsx(
          "d-flex justify-content-center align-items-center flex-column ml-1",
          classes.editingBtn,
          type === "lock" && classes.disabledBtn
        )}
        onClick={() => editor.objects.sendToBack()}
      >
        <SendBack />

        <p className={classes.subHeadingText}>Back</p>
      </button>
      <div>
        <LockUnlock />
      </div>

      {state.isGroup ? (
        <button
          disabled={type === "lock" ? true : false}
          className={clsx(
            "d-flex justify-content-center align-items-center flex-column ml-1",
            classes.editingBtn,
            type === "lock" && classes.disabledBtn
          )}
          onClick={() => {
            editor.objects.ungroup()
            setState({ ...state, isGroup: false })
          }}
        >
          <LayersIcon size={22} />

          <p className={classes.subHeadingText}>Ungroup</p>
        </button>
      ) : state.isMultiple && !activeObject?._objects?.map((el: any) => el?._objects?.length > 0).includes(true) ? (
        <button
          onClick={() => {
            editor.objects.group()
            setState({ ...state, isGroup: true })
          }}
          disabled={type === "lock" ? true : false}
          className={clsx(
            "d-flex justify-content-center align-items-center flex-column ml-1",
            classes.editingBtn,
            type === "lock" && classes.disabledBtn
          )}
        >
          <LayersIcon size={22} />
          <p className={clsx(classes.subHeadingText)}>Group</p>
        </button>
      ) : null}

      {/* {(state.isGroup || !state.isMultiple) && <CommonLayers />} */}
      <CommonAlign type={type ? type : ""} />
      <Opacity type={type ? type : ""} />
      <Visiblity type={type ? type : ""} />

      <button
        disabled={type === "lock" ? true : false}
        className={clsx(
          "d-flex justify-content-center align-items-center flex-column ml-1",
          classes.editingBtn,
          type === "lock" && classes.disabledBtn
        )}
        onClick={() => editor.objects.remove()}
      >
        <DeleteIcon size={22} />
        <p className={clsx(classes.subHeadingText)}>Delete</p>
      </button>
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
        )
      }
      returnFocus
      autoFocus
    >
      <button
        disabled={type === "lock" ? true : false}
        className={clsx(
          "d-flex justify-content-center align-items-center flex-column ml-1",
          classes.editingBtn,
          type === "lock" && classes.disabledBtn
        )}
      >
        <AlignCenter size={24} />
        <p className={clsx(classes.subHeadingText)}>Align</p>
      </button>
    </StatefulPopover>
  )
}

const LockUnlock = ({ type }: any) => {
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
    <button
      onClick={() => {
        editor.objects.unlock()
        setState({ locked: false })
      }}
      disabled={type === "lock" ? true : false}
      className={clsx(
        "d-flex justify-content-center align-items-center flex-column ml-1",
        classes.editingBtn,
        type === "lock" && classes.disabledBtn
      )}
    >
      <Unlocked size={22} />
      <p className={clsx(classes.subHeadingText, "mt-1")}>Unlock</p>
    </button>
  ) : (
    <button
      onClick={() => {
        editor.objects.lock()
        setState({ locked: true })
      }}
      disabled={type === "lock" ? true : false}
      className={clsx(
        "d-flex justify-content-center align-items-center flex-column ml-1",
        classes.editingBtn,
        type === "lock" && classes.disabledBtn
      )}
    >
      <Locked size={22} />
      <p className={clsx(classes.subHeadingText, "mt-1")}>Lock</p>
    </button>
  )
}

const Visiblity = ({ type }: any) => {
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
    <button
      disabled={type === "lock" ? true : false}
      className={clsx(
        "d-flex justify-content-center align-items-center flex-column ml-1",
        classes.editingBtn,
        type === "lock" && classes.disabledBtn
      )}
      onClick={() => {
        editor.objects.update({ visible: false })

        setState({ visible: false })
      }}
    >
      <Eye size={24} />
      <p className={clsx(classes.subHeadingText)}>Visibility</p>
    </button>
  ) : (
    <button
      onClick={() => {
        editor.objects.update({ visible: true })

        setState({ visible: true })
      }}
      disabled={type === "lock" ? true : false}
      className={clsx(
        "d-flex justify-content-center align-items-center flex-column ml-1",
        classes.editingBtn,
        type === "lock" && classes.disabledBtn
      )}
    >
      <EyeCrossed size={24} />
      <p className={clsx(classes.subHeadingText)}>Visibility</p>
    </button>
  )
}

export default Common

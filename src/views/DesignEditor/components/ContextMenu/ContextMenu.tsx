import { useActiveObject, useContextMenuRequest, useEditor } from "@layerhub-io/react"
import BringToFront from "~/components/Icons/BringToFront"
import Delete from "~/components/Icons/Delete"
import Duplicate from "~/components/Icons/Duplicate"
import Elements from "~/components/Icons/Elements"
import Locked from "~/components/Icons/Locked"
import Paste from "~/components/Icons/Paste"
import SendToBack from "~/components/Icons/SendToBack"
import Unlocked from "~/components/Icons/Unlocked"
import classes from "./style.module.css"
import clsx from "clsx"
const ContextMenu = () => {
  const contextMenuRequest = useContextMenuRequest()
  const editor = useEditor()
  const activeObject: any = useActiveObject()
  const handleAsComponentHandler = async () => {
    if (editor) {
      const component: any = await editor.scene.exportAsComponent()
      if (component) {
        console.log({ component })
      }
    }
  }
  if (!contextMenuRequest || !contextMenuRequest.target) {
    return <></>
  }

  if (contextMenuRequest.target.type === "Background") {
    return (
      <div // @ts-ignore
        onContextMenu={(e: Event) => e.preventDefault()}
        className={classes.contextMenuSection}
        style={{
          top: `${contextMenuRequest.top}px`,
          left: `${contextMenuRequest.left}px`,
        }}
      >
        <ContextMenuItem
          disabled={true}
          onClick={() => {
            editor.objects.copy()
            editor.cancelContextMenuRequest()
          }}
          icon="Duplicate"
          label="copy"
        >
          <Duplicate size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            editor.objects.paste()
            editor.cancelContextMenuRequest()
          }}
          icon="Paste"
          label="paste"
        >
          <Paste size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          disabled={true}
          onClick={() => {
            editor.objects.remove()
            editor.cancelContextMenuRequest()
          }}
          icon="Delete"
          label="delete"
        >
          <Delete size={24} />
        </ContextMenuItem>
      </div>
    )
  }
  return (
    <>
      <div // @ts-ignore
        onContextMenu={(e: Event) => e.preventDefault()}
        className={classes.contextMenuSection}
        style={{
          top: `${contextMenuRequest.top}px`,
          left: `${contextMenuRequest.left}px`,
        }}
      >
        <ContextMenuItem
          onClick={() => {
            editor.objects.copy()
            editor.cancelContextMenuRequest()
          }}
          icon="Duplicate"
          label="copy"
        >
          <Duplicate size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            editor.objects.paste()
            editor.cancelContextMenuRequest()
          }}
          icon="Paste"
          label="paste"
        >
          <Paste size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            editor.objects.remove()
            editor.cancelContextMenuRequest()
          }}
          icon="Delete"
          label="delete"
        >
          <Delete size={24} />
        </ContextMenuItem>
        <div style={{ margin: "0.5rem 0" }} />
        <ContextMenuItem
          onClick={() => {
            editor.objects.bringForward()
            editor.cancelContextMenuRequest()
          }}
          icon="Forward"
          label="bring forward"
        >
          <BringToFront size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            editor.objects.sendBackwards()
            editor.cancelContextMenuRequest()
          }}
          icon="Backward"
          label="send backward"
        >
          <SendToBack size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            handleAsComponentHandler()
            editor.cancelContextMenuRequest()
          }}
          icon="Elements"
          label="Save as component"
        >
          <Elements size={24} />
        </ContextMenuItem>
        <div style={{ margin: "0.5rem 0" }} />

        {!contextMenuRequest.target.locked ? (
          <ContextMenuItem
            onClick={() => {
              editor.objects.lock()
              editor.cancelContextMenuRequest()
            }}
            icon="Locked"
            label="lock"
          >
            <Locked size={24} />
          </ContextMenuItem>
        ) : (
          <ContextMenuItem
            onClick={() => {
              editor.objects.unlock()
              editor.cancelContextMenuRequest()
            }}
            icon="Unlocked"
            label="unlock"
          >
            <Unlocked size={24} />
          </ContextMenuItem>
        )}
        {activeObject?.type === "StaticImage" && (
          <ContextMenuItem
            onClick={() => {
              // handleAsComponentHandler()
              editor.objects.unsetBackgroundImage()
              setTimeout(() => {
                editor.objects.setAsBackgroundImage()
              }, 50)
              editor.cancelContextMenuRequest()
            }}
            icon="Images"
            label="Set as background image"
          >
            <Elements size={24} />
          </ContextMenuItem>
        )}
      </div>
    </>
  )
}

const ContextMenuItem = ({
  label,
  onClick,
  children,
  disabled = false,
}: {
  icon: string
  label: string
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}) => {
  return (
    <div onClick={onClick} className={clsx(classes.eachMenu, disabled && classes.disabledMenu)}>
      {children} {label}
    </div>
  )
}

export default ContextMenu

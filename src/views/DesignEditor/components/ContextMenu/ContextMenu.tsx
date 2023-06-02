import { useActiveObject, useContextMenuRequest, useEditor, useFrame } from "@layerhub-io/react"
import { useContext, useEffect, useState } from "react"
import Delete from "~/components/Icons/Delete"
import Duplicate from "~/components/Icons/Duplicate"
import Paste from "~/components/Icons/Paste"
import Unlocked from "~/components/Icons/Unlocked"
import MainImageContext from "~/contexts/MainImageContext"
import classes from "./style.module.css"
import clsx from "clsx"
import Icons from "~/components/Icons"
import ArrowUp from "~/components/Icons/ArrowUp"
import SendBack from "~/components/Icons/SendBack"
import EyeCrossed from "~/components/Icons/EyeCrossed"
import Eye from "~/components/Icons/Eye"
import Ungroup from "~/components/Icons/Ungroup"
import DownloadIcon from "~/components/Icons/DownloadIcon"
import DownloadPopup from "../Footer/Graphic/DownloadPopup/DownloadPopup"
import Elements from "~/components/Icons/Elements"
import ContextMenuItem from "./ContextMenuItem"
import { DuplicateFunc } from "../../utils/functions/tools/DuplicateFunc"
import { PasteFunc } from "../../utils/functions/tools/PasteFunc"
import { FrontFunc } from "../../utils/functions/tools/FrontFunc"
import { BackFunc } from "../../utils/functions/tools/BackFunc"
import { LockFunc, UnlockFunc } from "../../utils/functions/tools/LockUnlockFunc"
import { InvisibleFunc, VisibleFunc } from "../../utils/functions/tools/VisibilityFunc"
import { UngroupFunc } from "../../utils/functions/tools/GroupUngroupFunc"
import { SetCanvasBgFunc } from "../../utils/functions/SetCanvasBgFunc"
import { DeleteFunc } from "../../utils/functions/tools/DeleteFunc"
import { EraseBgFunc } from "../../utils/functions/EraseBgFunc"

const ContextMenu = () => {
  const contextMenuRequest = useContextMenuRequest()
  const editor = useEditor()
  const activeObject: any = useActiveObject()
  const { mainImgInfo, setMainImgInfo, setPanelInfo } = useContext(MainImageContext)
  const frame = useFrame()
  const [showDownloadPopup, setShowDownloadPopup] = useState(false)

  useEffect(() => {
    if (!contextMenuRequest || !contextMenuRequest.target) {
      setShowDownloadPopup(false)
    }
  }, [contextMenuRequest])
  // const handleAsComponentHandler = async () => {
  //   if (editor) {
  //     const component: any = await editor.scene.exportAsComponent()
  //     if (component) {
  //       console.log({ component })
  //     }
  //   }
  // }

  if (!activeObject || !contextMenuRequest || !contextMenuRequest.target) {
    return <></>
  }

  if (activeObject && (contextMenuRequest?.target?.type === "Background" || activeObject.name == "Initial Frame")) {
    return <></>
  }
  return (
    <div className={classes.mainContextMenu}>
      <div // @ts-ignore
        onContextMenu={(e: Event) => e.preventDefault()}
        className={classes.contextMenuSection}
        style={{
          top: `${contextMenuRequest.top}px`,
          left: `${contextMenuRequest.left}px`,
        }}
      >
        <ContextMenuItem onClick={() => DuplicateFunc({ editor, activeObject })} icon="Duplicate" label="Duplicate">
          <Duplicate size={24} />
        </ContextMenuItem>
        {/* <ContextMenuItem
          onClick={() => {
            editor.objects.paste()
            editor.cancelContextMenuRequest()
          }}
          icon="Paste"
          label="Paste"
        >
          <Paste size={24} />
        </ContextMenuItem> */}
        <ContextMenuItem
          onClick={() => DeleteFunc({ editor, activeObject, mainImgInfo, setMainImgInfo, setPanelInfo })}
          icon="Delete"
          label="Delete"
        >
          <Delete size={24} />
        </ContextMenuItem>
        <ContextMenuItem onClick={() => FrontFunc({ editor, activeObject })} icon="Forward" label="Bring forward">
          <ArrowUp />
        </ContextMenuItem>
        <ContextMenuItem onClick={() => BackFunc({ editor, activeObject })} icon="Backward" label="Send backward">
          <SendBack />
        </ContextMenuItem>
        {/* <ContextMenuItem
          onClick={() => {
            handleAsComponentHandler()
            editor.cancelContextMenuRequest()
          }}
          icon="Elements"
          label="Save as component"
        >
          <Elements size={24} />
        </ContextMenuItem> */}
        <div style={{ margin: "0.5rem 0" }} />

        {!contextMenuRequest.target.locked ? (
          <ContextMenuItem onClick={() => LockFunc({ editor })} icon="Locked" label="Lock">
            <Unlocked size={22} />
          </ContextMenuItem>
        ) : (
          <ContextMenuItem onClick={() => UnlockFunc({ editor })} icon="Unlocked" label="Unlock">
            <Unlocked size={22} />
          </ContextMenuItem>
        )}

        {activeObject?.visible === true ? (
          <ContextMenuItem onClick={() => InvisibleFunc({ editor })} icon="eye" label="Visibility">
            <Eye size={24} />
          </ContextMenuItem>
        ) : (
          <ContextMenuItem onClick={() => VisibleFunc({ editor })} icon="eye" label="Visibility">
            <EyeCrossed size={24} />
          </ContextMenuItem>
        )}
        {activeObject?.type === "group" && (
          <ContextMenuItem onClick={() => UngroupFunc({ editor })} icon="layers" label="Ungroup">
            <Ungroup size={26} />
          </ContextMenuItem>
        )}
        {activeObject?.type === "StaticImage" && (
          <ContextMenuItem
            onClick={() => SetCanvasBgFunc({ editor, frame })}
            icon="Images"
            label="Set as background image"
          >
            <Elements size={24} />
          </ContextMenuItem>
        )}

        <div className="p-relative">
          <ContextMenuItem
            onClick={() => {
              setShowDownloadPopup(true)
            }}
            icon="download"
            label="Download"
          >
            <DownloadIcon />
          </ContextMenuItem>

          {showDownloadPopup && (
            <DownloadPopup typeOfDownload="single-layer" typeGroup={activeObject?.type === "group" ? true : false} />
          )}
        </div>
        <div className={clsx(classes.chevronTopIcon)}>
          <Icons.SliderBtn size={20} width="10" />
        </div>
      </div>
    </div>
  )
}

export default ContextMenu

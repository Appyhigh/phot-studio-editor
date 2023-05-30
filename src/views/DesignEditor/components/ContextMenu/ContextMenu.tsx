import { useActiveObject, useContextMenuRequest, useEditor, useFrame } from "@layerhub-io/react"
import { useContext } from "react"
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
import { backgroundLayerType, deviceUploadType } from "~/constants/contants"

const ContextMenu = () => {
  const contextMenuRequest = useContextMenuRequest()
  const editor = useEditor()
  const activeObject: any = useActiveObject()
  const { mainImgInfo, setMainImgInfo, setPanelInfo } = useContext(MainImageContext)
  const frame = useFrame()

  const deleteHandler = () => {
    if (activeObject?.id === mainImgInfo.id) {
      // @ts-ignore
      setPanelInfo((prev) => ({
        ...prev,
        uploadSection: true,
        trySampleImg: true,
        uploadPreview: false,
        bgOptions: false,
        bgRemoverBtnActive: false,
      }))
      setMainImgInfo((prev: any) => ({ ...prev, id: "" }))
    }
    editor.objects.remove(activeObject?.id)
  }
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

  if (contextMenuRequest?.target?.type === "Background") {
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
          label="Copy"
        >
          <Duplicate size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            editor.objects.paste()
            editor.cancelContextMenuRequest()
          }}
          icon="Paste"
          label="Paste"
        >
          <Paste size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          disabled={true}
          onClick={() => {
            deleteHandler()
            editor.cancelContextMenuRequest()
          }}
          icon="Delete"
          label="Delete"
        >
          <Delete size={24} />
        </ContextMenuItem>
      </div>
    )
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
        <ContextMenuItem
          onClick={() => {
            editor.objects.copy()
            editor.cancelContextMenuRequest()
          }}
          icon="Duplicate"
          label="Copy"
        >
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
          onClick={() => {
            deleteHandler()
            editor.cancelContextMenuRequest()
          }}
          icon="Delete"
          label="Delete"
        >
          <Delete size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            editor.objects.bringForward()
            editor.objects.update({ name: activeObject.name })
            editor.cancelContextMenuRequest()
          }}
          icon="Forward"
          label="Bring forward"
        >
          <ArrowUp />
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            editor.objects.sendBackwards()
            editor.objects.update({ name: activeObject.name })
            editor.cancelContextMenuRequest()
          }}
          icon="Backward"
          label="Send backward"
        >
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
          <ContextMenuItem
            onClick={() => {
              editor.objects.lock()
              editor.cancelContextMenuRequest()
            }}
            icon="Locked"
            label="Lock"
          >
            <Unlocked size={22} />
          </ContextMenuItem>
        ) : (
          <ContextMenuItem
            onClick={() => {
              editor.objects.unlock()
              editor.cancelContextMenuRequest()
            }}
            icon="Unlocked"
            label="Unlock"
          >
            <Unlocked size={22} />
          </ContextMenuItem>
        )}

        {activeObject?.visible === true ? (
          <ContextMenuItem
            onClick={() => {
              editor.objects.update({ visible: false })
              editor.cancelContextMenuRequest()
            }}
            icon="eye"
            label="Visibility"
          >
            <Eye size={24} />
          </ContextMenuItem>
        ) : (
          <ContextMenuItem
            onClick={() => {
              editor.objects.update({ visible: true })
              editor.cancelContextMenuRequest()
            }}
            icon="eye"
            label="Visibility"
          >
            <EyeCrossed size={24} />
          </ContextMenuItem>
        )}
        {activeObject?.type === "group" && (
          <ContextMenuItem
            onClick={() => {
              editor.objects.ungroup()
              editor.cancelContextMenuRequest()
            }}
            icon="layers"
            label="Ungroup"
          >
            <Ungroup />
          </ContextMenuItem>
        )}
        {activeObject?.type === "StaticImage" && (
          <ContextMenuItem
            onClick={() => {
              // handleAsComponentHandler()
              editor.frame.resize({ width: frame.width, height: frame.height })
              const bgObject = editor?.frame?.background?.canvas?._objects.filter(
                (el: any) => el.type === "BackgroundImage"
              )[0]

              const deviceUploadImg = editor?.frame?.background?.canvas?._objects.filter(
                (el: any) => el.metadata?.type === deviceUploadType || el.metadata?.type === backgroundLayerType
              )[0]

              if (bgObject) {
                editor.objects.removeById(bgObject.id)
              } else if (deviceUploadImg) {
                editor.objects.removeById(deviceUploadImg.id)
              }
              editor.objects.unsetBackgroundImage()
              const options = {
                type: "BackgroundImage",
                metadata: { generationDate: new Date().getTime(), type: deviceUploadType },
              }

              editor.objects.setAsBackgroundImage()
              editor.objects.update({ ...options })

              editor.cancelContextMenuRequest()
            }}
            icon="Images"
            label="Set as background image"
          >
            <Elements size={24} />
          </ContextMenuItem>
        )}

        <div className="p-relative">
          <ContextMenuItem
            onClick={() => {
              editor.cancelContextMenuRequest()
            }}
            icon="download"
            label="Download"
          >
            <DownloadIcon />
          </ContextMenuItem>
          <DownloadPopup typeOfDownload="single-layer" />
        </div>
        <div className={clsx(classes.chevronTopIcon)}>
          <Icons.SliderBtn size={20} width="10" />
        </div>
      </div>
    </div>
  )
}

const ContextMenuItem = ({
  label,
  icon,
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
    <div>
      <div onClick={onClick} className={clsx(classes.eachMenu, disabled && classes.disabledMenu)}>
        <div style={{ width: "25px" }} className={"d-flex justify-content-center mr-2"}>
          {children}
        </div>{" "}
        {label}
        {icon === "download" && (
          <div className={classes.rightIcon}>
            <Icons.SliderIcon size={15} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ContextMenu

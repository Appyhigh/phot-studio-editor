import clsx from "clsx"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import DownloadPopup from "../components/Footer/Graphic/DownloadPopup/DownloadPopup"
import DownloadIcon from "~/components/Icons/DownloadIcon"
import Ungroup from "~/components/Icons/Ungroup"
import Eye from "~/components/Icons/Eye"
import Unlocked from "~/components/Icons/Unlocked"
import SendBack from "~/components/Icons/SendBack"
import ArrowUp from "~/components/Icons/ArrowUp"
import Delete from "~/components/Icons/Delete"
import Duplicate from "~/components/Icons/Duplicate"
import { useActiveObject, useContextMenuRequest, useEditor } from "@layerhub-io/react"
import EyeCrossed from "~/components/Icons/EyeCrossed"
import Paste from "~/components/Icons/Paste"
import { useEffect, useState } from "react"

const SingleLayerExport = ({ isOpenSlider, activeOb, show }: any) => {
  const contextMenuRequest = useContextMenuRequest()

  const editor = useEditor()
  const activeObject: any = useActiveObject()
  const [showDownloadPopup, setShowDownloadPopup] = useState(false)

  useEffect(() => {
    if (!show) {
      setShowDownloadPopup(false)
    }
  }, [show])

  if (activeObject?.type === "Background" && show) {
    return (
      <div // @ts-ignore
        onContextMenu={(e: Event) => e.preventDefault()}
        className={clsx(classes.contextMenuSection, isOpenSlider && classes.contextMenuFull)}
      >
        <ContextMenuItem
          disabled={true}
          onClick={() => {
            editor.objects.clone()
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
    show && (
      <div className={clsx(classes.mainContextMenu, show && classes.showMenu, isOpenSlider && classes.contextMenuFull)}>
        <div className={classes.mainContext}>
          <div // @ts-ignore
            className={classes.contextMenuSection}
          >
            <ContextMenuItem
              onClick={() => {
                editor.objects.clone()
                setTimeout(() => {
                  editor.objects.update({ name: activeObject?.name })
                }, 10)
                editor.cancelContextMenuRequest()
              }}
              icon="Duplicate"
              label="Duplicate"
            >
              <Duplicate size={24} />
            </ContextMenuItem>

            <ContextMenuItem
              onClick={() => {
                editor.objects.remove()
                editor.cancelContextMenuRequest()
              }}
              icon="Delete"
              label="Delete"
            >
              <Delete size={24} />
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => {
                editor.objects.update({ name: activeObject?.name })
                editor.objects.bringToFront()
                editor.cancelContextMenuRequest()
              }}
              icon="Forward"
              label="Bring forward"
            >
              <ArrowUp />
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => {
                editor.objects.update({ name: activeObject?.name })
                editor.objects.sendToBack()
                editor.cancelContextMenuRequest()
              }}
              icon="Backward"
              label="Send backward"
            >
              <SendBack />
            </ContextMenuItem>

            {activeObject?.locked ? (
              <ContextMenuItem
                onClick={() => {
                  editor.objects.unlock()
                  editor.cancelContextMenuRequest()
                }}
                icon="Locked"
                label="Unlock"
              >
                <Unlocked size={22} />
              </ContextMenuItem>
            ) : (
              <ContextMenuItem
                onClick={() => {
                  editor.objects.lock()
                  editor.cancelContextMenuRequest()
                }}
                icon="Unlocked"
                label="Lock"
              >
                <Unlocked size={22} />
              </ContextMenuItem>
            )}

            {activeObject?.type === "group" && (
              <ContextMenuItem
                onClick={() => {
                  editor.objects.ungroup()
                  editor.cancelContextMenuRequest()
                }}
                icon="group"
                label="Ungroup"
              >
                <Ungroup />
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
            <div className="p-relative">
              <ContextMenuItem
                onClick={() => {
                  setShowDownloadPopup(true)
                  editor.cancelContextMenuRequest()
                }}
                icon="download"
                label="Download"
                showDownloadPopup={showDownloadPopup}
              >
                <DownloadIcon />
              </ContextMenuItem>
              {showDownloadPopup && show && (
                <DownloadPopup
                  typeOfDownload="single-layer"
                  typeGroup={activeObject?.type === "group" ? true : false}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

const ContextMenuItem = ({
  label,
  icon,
  onClick,
  children,
  disabled = false,
  showDownloadPopup = false,
}: {
  icon: string
  label: string
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
  showDownloadPopup?: boolean
}) => {
  return (
    <div>
      <div
        onClick={onClick}
        className={clsx(
          classes.eachMenu,
          disabled && classes.disabledMenu,
          showDownloadPopup && classes.selectedDownload
        )}
      >
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

export default SingleLayerExport

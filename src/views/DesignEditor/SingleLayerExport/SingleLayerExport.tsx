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
import { useActiveObject, useContextMenuRequest, useEditor, useFrame } from "@layerhub-io/react"
import EyeCrossed from "~/components/Icons/EyeCrossed"
import Paste from "~/components/Icons/Paste"
import { useContext, useEffect, useState } from "react"
import Elements from "~/components/Icons/Elements"
import { deviceUploadType } from "~/constants/contants"
import { DuplicateFunc } from "../utils/functions/tools/DuplicateFunc"
import { PasteFunc } from "../utils/functions/tools/PasteFunc"
import { FrontFunc } from "../utils/functions/tools/FrontFunc"
import { BackFunc } from "../utils/functions/tools/BackFunc"
import { LockFunc, UnlockFunc } from "../utils/functions/tools/LockUnlockFunc"
import { UngroupFunc } from "../utils/functions/tools/GroupUngroupFunc"
import { InvisibleFunc, VisibleFunc } from "../utils/functions/tools/VisibilityFunc"
import { SetCanvasBgFunc } from "../utils/functions/SetCanvasBgFunc"
import { DeleteFunc } from "../utils/functions/tools/DeleteFunc"
import ImagesContext from "~/contexts/ImagesCountContext"

const SingleLayerExport = ({ isOpenSlider, activeOb, show }: any) => {
  const contextMenuRequest = useContextMenuRequest()

  const editor = useEditor()
  const activeObject: any = useActiveObject()
  const [showDownloadPopup, setShowDownloadPopup] = useState(false)
  const { setImagesCt } = useContext(ImagesContext)
  const frame = useFrame()
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
            if (activeObject?._objects) {
              editor.objects.clone()
              setTimeout(() => {
                editor.objects.position("top", activeObject.top)
                editor.objects.position("left", activeObject.left)
                editor.objects.resize("height", activeObject.height * activeObject.scaleY)
                editor.objects.resize("width", activeObject.width * activeObject.scaleX)
                editor.objects.group()
              }, 100)
            } else {
              let latest_ct = 0
              setImagesCt((prev: any) => {
                latest_ct = prev + 1
                DuplicateFunc({ editor, activeObject, latest_ct }).then(() => {
                  setTimeout(() => {
                    editor.objects.position("top", activeObject.top)
                    editor.objects.position("left", activeObject.left)
                    editor.objects.resize("height", activeObject.height * activeObject.scaleY)
                    editor.objects.resize("width", activeObject.width * activeObject.scaleX)
                  }, 20)
                })
                return prev + 1
              })
            }
          }}
          icon="Duplicate"
          label="copy"
        >
          <Duplicate size={24} />
        </ContextMenuItem>
        <ContextMenuItem onClick={() => PasteFunc({ editor })} icon="Paste" label="paste">
          <Paste size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          disabled={true}
          onClick={() => DeleteFunc({ editor, activeObject })}
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
                if (activeObject?._objects) {
                  editor.objects.clone()
                  setTimeout(() => {
                    editor.objects.position("top", activeObject.top)
                    editor.objects.position("left", activeObject.left)
                    editor.objects.resize("height", activeObject.height * activeObject.scaleY)
                    editor.objects.resize("width", activeObject.width * activeObject.scaleX)
                    editor.objects.group()
                  }, 100)
                } else {
                  let latest_ct = 0
                  setImagesCt((prev: any) => {
                    latest_ct = prev + 1
                    DuplicateFunc({ editor, activeObject, latest_ct }).then(() => {
                      setTimeout(() => {
                        editor.objects.position("top", activeObject.top)
                        editor.objects.position("left", activeObject.left)
                        editor.objects.resize("height", activeObject.height * activeObject.scaleY)
                        editor.objects.resize("width", activeObject.width * activeObject.scaleX)
                      }, 20)
                    })
                    return prev + 1
                  })
                }
              }}
              icon="Duplicate"
              label="Duplicate"
            >
              <Duplicate size={24} />
            </ContextMenuItem>
            <ContextMenuItem onClick={() => DeleteFunc({ editor, activeObject })} icon="Delete" label="Delete">
              <Delete size={24} />
            </ContextMenuItem>
            <ContextMenuItem onClick={() => FrontFunc({ editor, activeObject })} icon="Forward" label="Bring forward">
              <ArrowUp />
            </ContextMenuItem>
            <ContextMenuItem onClick={() => BackFunc({ editor, activeObject })} icon="Backward" label="Send backward">
              <SendBack />
            </ContextMenuItem>

            {activeObject?.locked ? (
              <ContextMenuItem onClick={() => UnlockFunc({ editor })} icon="Unlocked" label="Unlock">
                <Unlocked size={22} />
              </ContextMenuItem>
            ) : (
              <ContextMenuItem onClick={() => LockFunc({ editor })} icon="Lock" label="Lock">
                <Unlocked size={22} />
              </ContextMenuItem>
            )}

            {activeObject?.type === "group" && (
              <ContextMenuItem onClick={() => UngroupFunc({ editor })} icon="group" label="Ungroup">
                <Ungroup size={26} />
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
  lock?: false
}) => {
  const activeObject = useActiveObject()
  return (
    <div>
      <button
        // @ts-ignore
        disabled={activeObject?.locked && icon != "download" && icon != "Unlocked" ? true : false}
        onClick={onClick}
        className={clsx(
          classes.eachMenu,
          disabled && classes.disabledMenu,
          showDownloadPopup && classes.selectedDownload,
          // @ts-ignore
          activeObject?.locked && icon != "download" && icon != "Unlocked" && classes.disabledOption
        )}
      >
        <div
          style={{ width: "25px" }}
          className={clsx(
            "d-flex justify-content-center mr-2",
            // @ts-ignore
            activeObject?.locked && icon != "download" && icon != "Unlocked" && classes.disabledOption
          )}
        >
          {children}
        </div>{" "}
        {label}
        {icon === "download" && (
          <div className={classes.rightIcon}>
            <Icons.SliderIcon size={15} />
          </div>
        )}
      </button>
    </div>
  )
}

export default SingleLayerExport

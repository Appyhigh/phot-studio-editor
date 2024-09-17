import React, { useContext, useEffect } from "react"
import { Block } from "baseui/block"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import DeleteIcon from "~/components/Icons/Delete"
import DuplicateIcon from "~/components/Icons/Duplicate"
import LayersIcon from "~/components/Icons/Layers"
import Opacity from "../Shared/Opacity"
import Flip from "../Shared/Flip"
import LockUnlock from "../Shared/LockUnlock"
import CommonAlign from "../Shared/CommonAlign"
import Visibility from "../Shared/Visibility"
import ArrowUp from "~/components/Icons/ArrowUp"
import SendBack from "~/components/Icons/SendBack"
import Ungroup from "~/components/Icons/Ungroup"
import MainImageContext from "~/contexts/MainImageContext"
import { ToolButton } from "../Shared/ToolButton"
import { DuplicateFunc } from "~/views/DesignEditor/utils/functions/tools/DuplicateFunc"
import { FrontFunc } from "~/views/DesignEditor/utils/functions/tools/FrontFunc"
import { BackFunc } from "~/views/DesignEditor/utils/functions/tools/BackFunc"
import { GroupFunc, UngroupFunc } from "~/views/DesignEditor/utils/functions/tools/GroupUngroupFunc"
import { DeleteFunc } from "~/views/DesignEditor/utils/functions/tools/DeleteFunc"
import ImagesContext from "~/contexts/ImagesCountContext"

const Common = ({ type }: any) => {
  const { mainImgInfo, setMainImgInfo, setPanelInfo } = useContext(MainImageContext)

  const [state, setState] = React.useState({ isGroup: false, isMultiple: false })
  const activeObject = useActiveObject() as any
  const { setImagesCt } = useContext(ImagesContext)

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
      <ToolButton
        type={type}
        func={() => {
          let latest_ct = 0
          setImagesCt((prev: any) => {
            latest_ct = prev + 1
            DuplicateFunc({ editor, activeObject, latest_ct: 'groupImage' }).then(() => {
              setTimeout(() => {
                if (activeObject?.name === 'group') {
                  setTimeout(() => {
                    editor.objects.group()
                    editor.objects.findById(activeObject.id)[0].center()
                  }, 900);
                  editor.objects.position("top", activeObject.top)
                  editor.objects.position("left", activeObject.left)
                  editor.objects.resize("height", activeObject.height * activeObject.scaleY)
                  editor.objects.resize("width", activeObject.width * activeObject.scaleX)
                } else {
                  activeObject.center()
                }
              }, 1000)
            })
            return prev + 1
          })
        }}
        icon={<DuplicateIcon size={22} />}
        name="Duplicate"
      />
      <ToolButton type={type} func={() => FrontFunc({ editor, activeObject })} icon={<ArrowUp />} name="Front" />
      <ToolButton type={type} func={() => BackFunc({ editor, activeObject })} icon={<SendBack />} name="Back" />
      <LockUnlock />
      {state.isGroup ? (
        <ToolButton
          type={type}
          func={() => UngroupFunc({ editor, activeObject, state, setState })}
          icon={<Ungroup size={27} />}
          name="Ungroup"
        />
      ) : state.isMultiple && !activeObject?._objects?.map((el: any) => el?._objects?.length > 0).includes(true) ? (
        <ToolButton
          type={type}
          func={() => {
            GroupFunc({ editor, activeObject, state, setState })
          }}
          icon={<LayersIcon size={27} />}
          name="Group"
        />
      ) : null}
      <CommonAlign type={type ? type : ""} />
      <Opacity type={type ? type : ""} />
      <Visibility type={type ? type : ""} />
      <ToolButton
        type={type}
        func={() => DeleteFunc({ editor, activeObject, mainImgInfo, setMainImgInfo, setPanelInfo })}
        icon={<DeleteIcon size={28} />}
        name="Delete"
      />
    </Block>
  )
}

export default Common

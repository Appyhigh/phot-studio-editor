import React, { useContext } from "react"
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

const Common = ({ type }: any) => {
  const { mainImgInfo, setMainImgInfo, setPanelInfo } = useContext(MainImageContext)

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
      <ToolButton
        type={type}
        func={() => {
          editor.objects.clone()
          setTimeout(() => {
            editor.objects.update({ name: activeObject.name })
          }, 10)
        }}
        icon={<DuplicateIcon size={22} />}
        name="Duplicate"
      />
      <ToolButton
        type={type}
        func={() => {
          editor.objects.update({ name: activeObject.name })
          editor.objects.bringToFront()
        }}
        icon={<ArrowUp />}
        name="Front"
      />
      <ToolButton
        type={type}
        func={() => {
          editor.objects.update({ name: activeObject.name })
          editor.objects.sendToBack()
        }}
        icon={<SendBack />}
        name="Back"
      />
      <LockUnlock />
      {state.isGroup ? (
        <ToolButton
          type={type}
          func={() => {
            editor.objects.ungroup()
            setState({ ...state, isGroup: false })
          }}
          icon={<Ungroup size={27} />}
          name="Ungroup"
        />
      ) : state.isMultiple && !activeObject?._objects?.map((el: any) => el?._objects?.length > 0).includes(true) ? (
        <ToolButton
          type={type}
          func={() => {
            editor.objects.update({ name: activeObject.name })
            editor.objects.group()
            setState({ ...state, isGroup: true })
          }}
          icon={<LayersIcon size={27} />}
          name="Group"
        />
      ) : null}
      <CommonAlign type={type ? type : ""} />
      <Opacity type={type ? type : ""} />
      <Visibility type={type ? type : ""} />
      <ToolButton type={type} func={() => deleteHandler()} icon={<DeleteIcon size={28} />} name="Delete" />
    </Block>
  )
}

export default Common

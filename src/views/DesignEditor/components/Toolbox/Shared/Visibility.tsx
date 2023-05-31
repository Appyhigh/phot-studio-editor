import React from "react"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import Eye from "~/components/Icons/Eye"
import EyeCrossed from "~/components/Icons/EyeCrossed"
import { ToolButton } from "./ToolButton"
import { InvisibleFunc, VisibleFunc } from "~/views/DesignEditor/utils/tools/VisibilityFunc"

const Visibility = ({ type }: any) => {
  const [state, setState] = React.useState<{ visible: boolean }>({ visible: true })
  const editor = useEditor()
  const activeObject = useActiveObject()

  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      setState({ visible: !!activeObject.visible })
    }
  }, [activeObject])
  // @ts-ignore
  return state.visible || activeObject?.visible ? (
    <ToolButton
      type={type}
      func={() => InvisibleFunc({ editor, setState })}
      icon={<Eye size={28} />}
      name="Visibility"
    />
  ) : (
    <ToolButton
      type={type}
      func={() => VisibleFunc({ editor, setState })}
      icon={<EyeCrossed size={25} />}
      name="Visibility"
    />
  )
}

export default Visibility

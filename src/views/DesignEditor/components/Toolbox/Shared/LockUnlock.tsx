import React from "react"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import Locked from "~/components/Icons/Locked"
import Unlocked from "~/components/Icons/Unlocked"
import { ToolButton } from "./ToolButton"
import { LockFunc, UnlockFunc } from "~/views/DesignEditor/utils/tools/LockUnlockFunc"

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
    <ToolButton type={type} func={() => UnlockFunc({ editor, setState })} icon={<Unlocked size={27} />} name="Unlock" />
  ) : (
    <ToolButton type={type} func={() => LockFunc({ editor, setState })} icon={<Locked size={27} />} name="Lock" />
  )
}

export default LockUnlock

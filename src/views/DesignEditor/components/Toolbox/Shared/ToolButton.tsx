import clsx from "clsx"
import classes from "./style.module.css"
import { useActiveObject } from "@layerhub-io/react"

export const ToolButton = ({ type, func, icon, name }: any) => {
  const activeObject = useActiveObject()
  return (
    <button
      disabled={type === "lock" ? true : false}
      className={clsx(
        "d-flex justify-content-center align-items-center flex-column ml-1",
        classes.editingBtn,
        type === "lock" && classes.disabledBtn,
        (name === 'Back' && activeObject?._objects && activeObject?.name !== 'group') && classes.disabledBtn,
        (name === 'Front' && activeObject?._objects && activeObject?.name !== 'group') && classes.disabledBtn
      )}
      onClick={func}
    >
      <>{icon}</>
      <p className={clsx(classes.subHeadingText)}>{name}</p>
    </button>
  )
}

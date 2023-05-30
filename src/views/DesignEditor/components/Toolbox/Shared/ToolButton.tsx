import clsx from "clsx"
import classes from "./style.module.css"

export const ToolButton = ({ type, func, icon, name }: any) => {
  return (
    <button
      disabled={type === "lock" ? true : false}
      className={clsx(
        "d-flex justify-content-center align-items-center flex-column ml-1",
        classes.editingBtn,
        type === "lock" && classes.disabledBtn
      )}
      onClick={func}
    >
      <>{icon}</>
      <p className={clsx(classes.subHeadingText)}>{name}</p>
    </button>
  )
}

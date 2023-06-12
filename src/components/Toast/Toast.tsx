import clsx from "clsx"
import classes from "./style.module.css"
import Icons from "../Icons"

const Toast = ({
  message,
  type,
  style,
  clickHandler,
  hideErrorBtn = false,
}: {
  message: string
  type: string
  style?: object
  clickHandler?: VoidFunction
  hideErrorBtn?: boolean
}) => {
  return (
    <div style={style} className={clsx(classes.toast, type === "success" ? classes.success : classes.error)}>
      <div className={clsx(classes.text)}>{message}</div>
      {type === "success" ? (
        <div className={clsx(classes.closeIcon, "pointer")} onClick={clickHandler}>
          <Icons.Cross />
        </div>
      ) : (
        !hideErrorBtn && (
          <div onClick={clickHandler} className={classes.btn}>
            RETRY
          </div>
        )
      )}
    </div>
  )
}

export default Toast

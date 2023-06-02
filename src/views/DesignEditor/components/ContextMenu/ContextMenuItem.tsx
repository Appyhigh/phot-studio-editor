import clsx from "clsx"
import classes from "./style.module.css"
import Icons from "~/components/Icons"
import { useActiveObject } from "@layerhub-io/react"

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
          // @ts-ignore
          activeObject?.locked && icon != "download" && icon != "Unlocked" && classes.disabledOption
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
      </button>
    </div>
  )
}

export default ContextMenuItem

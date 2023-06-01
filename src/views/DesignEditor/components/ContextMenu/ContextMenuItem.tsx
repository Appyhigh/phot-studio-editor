import clsx from "clsx"
import classes from "./style.module.css"
import Icons from "~/components/Icons"

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
  return (
    <div>
      <div onClick={onClick} className={clsx(classes.eachMenu, disabled && classes.disabledMenu)}>
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

export default ContextMenuItem

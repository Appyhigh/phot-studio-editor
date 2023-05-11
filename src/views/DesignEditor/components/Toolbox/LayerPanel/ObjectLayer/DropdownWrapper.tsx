import Icons from "~/components/Icons"
import classes from "./style.module.css"
import objectLayerOptions from "../Common"
import clsx from "clsx"

const DropdownWrapper = ({
  icon,
  heading,
  activeState,
  idx,
  handleActiveState,
}: {
  icon: string
  heading: string
  activeState: number
  idx: number
  handleActiveState: any
}) => {
  // @ts-ignore
  const Icon = Icons[icon]
  // @ts-ignore
  const Component = objectLayerOptions[heading]

  return (
    <div className={classes.dropdownWrapper}>
      <div
        className={clsx(classes.dropDownHeader, "d-flex flex-1 pointer")}
        onClick={() => {
          handleActiveState(idx)
        }}
      >
        <div className="d-flex align-items-center justify-content-start">
          <Icon size={24} /> <p className={classes.dropdownHeading}>{heading}</p>
        </div>
        <div className="flex-1"></div>
        <div className={idx === activeState ? classes.reverseArrow : ""}>
          <Icons.ChevronDown size={"14"} />
        </div>
      </div>
      <div className={activeState === idx ? classes.expandedDropDowon : classes.collapseDropDown}>
        {Component && <Component />}
      </div>
    </div>
  )
}

export default DropdownWrapper

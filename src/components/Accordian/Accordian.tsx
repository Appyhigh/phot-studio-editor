import { useState } from "react"
import Icons from "../Icons"
import classes from "./style.module.css"
import clsx from "clsx"

const Accordian = ({ label, heading, children, isDone }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={classes.accordianMain}>
      <div
        className={classes.heading}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <div className="d-flex flex-row align-items-center">
          {isDone ? (
            <div>
              <div className={classes.tickIcon}>
                <Icons.TickIcon />
              </div>
            </div>
          ) : (
            <div className={classes.label}>{label}</div>
          )}

          <p>{heading}</p>
        </div>

        <div className="flex-1"></div>
        <div className={clsx(isOpen ? classes.iconOpen : "")}>
          <Icons.ChevronDown size="12" />
        </div>
      </div>
      {isOpen && children}
    </div>
  )
}

export default Accordian

import { useState } from "react"
import classes from "./style.module.css"
import clsx from "clsx"
import Icons from "~/components/Icons"

const Accordian = ({ label, heading, children, isDone ,isopen ,isPrev}: any) => {
  const [isOpen, setIsOpen] = useState(isopen)

  return (
    <div className={classes.accordianMain}>
      <div
        className={classes.heading}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <div className="d-flex flex-row align-items-center">
          {(isDone||(isOpen&&isPrev)) ? (
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
        <div className={clsx(isPrev && isOpen ? classes.iconOpen : "")}>
          <Icons.ChevronDown size="12" />
        </div>
      </div>
      {isOpen &&isPrev && children}
    </div>
  )
}

export default Accordian

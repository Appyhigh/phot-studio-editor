import { useState } from "react"
import classes from "./style.module.css"
import clsx from "clsx"
import Icons from "~/components/Icons"

const Accordian = ({ label, heading, children, isOpen, isComplete, handleClick }: any) => {
  return (
    <div className={classes.accordianMain}>
      <div
        className={classes.heading}
        onClick={() => {
          handleClick()
        }}
      >
        <div className="d-flex flex-row align-items-center">
          {isComplete ? (
            <div>
              <div className={classes.tickIcon}>
                <Icons.TickIcon />
              </div>
            </div>
          ) : (
            <div className={classes.label} style={{ background: isOpen ? "#6729f3" : "#92929d" }}>
              {label}
            </div>
          )}

          <p style={{color:isComplete?"#44444F":"#92929D",fontWeight:"400"}}>{heading}</p>
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

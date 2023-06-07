import clsx from "clsx"
import classes from "./style.module.css"
import { useState } from "react"

const ToggleBtn = ({ handleChange,initialVal }: any) => {
  const [activeToggle, setActiveToggle] = useState(initialVal)

  return (
    <label className={classes.switch}>
      <input
        type="checkbox"
        onChange={() => {
          setActiveToggle((prev:any) => {
            handleChange(!prev)
            return !prev
          })
        }}
        checked={activeToggle}
        className={classes.toggleInput}
      />
      <span className={clsx(classes.slider, classes.round)}></span>
    </label>
  )
}

export default ToggleBtn

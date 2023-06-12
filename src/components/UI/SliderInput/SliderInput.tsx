import { useEffect, useRef, useState } from "react"
import classes from "./style.module.css"

const SliderInput = ({ value, minVal, maxVal, handleChange }: any) => {
  const rangeRef = useRef({} as unknown as HTMLInputElement)
  const [val, setVal] = useState(value)

  useEffect(() => {
    rangeRef.current.style.background = `linear-gradient(to right,#6729F3 0%, #6729F3 ${
        ((value - minVal) / (maxVal - minVal)) * 100
    }%, #DEE2E6 ${((value - minVal) / (maxVal - minVal)) * 100}%, #DEE2E6 100%)`;
}, []);

  return (
    <input
      className={classes.range}
      type="range"
      min={minVal}
      max={maxVal}
      value={val}

      onChange={(e) => {
        handleChange(e.target.value)
        setVal(e.target.value)
      }}
      ref={rangeRef}
      onInput={({ currentTarget }) => {
        const value = currentTarget.value as unknown as number
        const min = currentTarget.min as unknown as number
        const max = currentTarget.max as unknown as number

        currentTarget.style.background = `linear-gradient(to right, #6729F3 0%, #6729F3 ${
          ((value - min) / (max - min)) * 100
        }%, #DEE2E6 ${((value - min) / (max - min)) * 100}%, #DEE2E6 100%)`
      }}
    ></input>
  )
}

export default SliderInput

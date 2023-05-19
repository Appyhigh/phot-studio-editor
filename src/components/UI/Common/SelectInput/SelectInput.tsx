import { useStyletron } from "baseui"
import classes from "./style.module.css"
import SelectedFormat from "~/components/Icons/SelectedFormat"
import clsx from "clsx"
import { useEffect, useState } from "react"

const SelectInput = ({ handleChange, selectedType }: any) => {
  const [css, theme] = useStyletron()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className={classes.selectInputFormatSection}>
      <div
        className={classes.selectedType}
        onClick={() => {
          setShowMenu(!showMenu)
        }}
      >
        {selectedType}
      </div>
      {showMenu&&
      <div
        onChange={(e: any) => {
          handleChange(e.target.value)
        }}
        id="downloadOption"
        className={css({ color: theme.colors.backgroundSecondary, borderRadius: theme.sizing.scale100 })}
      >
        <div
          className={clsx(classes.eachOption, "d-flex flex-row")}
          onClick={() => {
            handleChange("Jpg")
            setShowMenu(false)
          }}
        >
          Jpg
          <div className="ml-auto">{selectedType === "Jpg" && <SelectedFormat />}</div>
        </div>
        <div
          onClick={() => {
            handleChange("Png")
            setShowMenu(false)
          }}
          className={clsx(classes.eachOption, "d-flex flex-row")}
        >
          Png
          <div className="ml-auto">{selectedType === "Png" && <SelectedFormat />}</div>
        </div>
        <div
          onClick={() => {
            handleChange("Jpeg")
            setShowMenu(false)
          }}
          className={clsx(classes.eachOption, "d-flex flex-row")}
        >
          Jpeg
          <div className="ml-auto">{selectedType === "Jpeg" && <SelectedFormat />}</div>
        </div>
        <div
          onClick={() => {
            handleChange("Svg")
            setShowMenu(false)
          }}
          className={clsx(classes.eachOption, "d-flex flex-row")}
        >
          Svg
          <div className="ml-auto">{selectedType === "Svg" && <SelectedFormat />}</div>
        </div>
      </div>
}
    </div>
  )
}

export default SelectInput

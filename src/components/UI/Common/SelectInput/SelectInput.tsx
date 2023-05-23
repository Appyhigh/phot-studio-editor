import { useStyletron } from "baseui"
import classes from "./style.module.css"
import SelectedFormat from "~/components/Icons/SelectedFormat"
import clsx from "clsx"
import { useEffect, useState } from "react"

const SelectInput = ({ handleChange, selectedType, typeOfDownload }: any) => {
  const [css, theme] = useStyletron()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div
      className={clsx(classes.selectInputFormatSection, typeOfDownload === "single-layer" && classes.singleLayerSelect)}
    >
      <div
        className={clsx(classes.selectedType)}
        onClick={() => {
          setShowMenu(!showMenu)
        }}
      >
        {selectedType}
      </div>
      {showMenu && (
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
              handleChange("jpg")
              setShowMenu(false)
            }}
          >
            Jpg
            <div className="ml-auto">{selectedType === "jpg" && <SelectedFormat />}</div>
          </div>
          <div
            onClick={() => {
              handleChange("png")
              setShowMenu(false)
            }}
            className={clsx(classes.eachOption, "d-flex flex-row")}
          >
            Png
            <div className="ml-auto">{selectedType === "png" && <SelectedFormat />}</div>
          </div>
          <div
            onClick={() => {
              handleChange("jpeg")
              setShowMenu(false)
            }}
            className={clsx(classes.eachOption, "d-flex flex-row")}
          >
            Jpeg
            <div className="ml-auto">{selectedType === "jpeg" && <SelectedFormat />}</div>
          </div>
          <div
            onClick={() => {
              handleChange("svg")
              setShowMenu(false)
            }}
            className={clsx(classes.eachOption, "d-flex flex-row")}
          >
            Svg
            <div className="ml-auto">{selectedType === "svg" && <SelectedFormat />}</div>
          </div>
          {/* <div
            onClick={() => {
              handleChange("Pdf")
              setShowMenu(false)
            }}
            className={clsx(classes.eachOption, "d-flex flex-row")}
          >
            Pdf
            <div className="ml-auto">{selectedType === "Pdf" && <SelectedFormat />}</div>
          </div> */}
        </div>
      )}
    </div>
  )
}

export default SelectInput

import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import DropdownWrapper from "./DropdownWrapper"
import { ObjectLayerOption } from "~/views/DesignEditor/utils/ObjectLayerOptions"
import { useState } from "react"
import Scrollable from "~/components/Scrollable"

const ObjectLayer = ({ showLayer, handleClose }: any) => {
  const [activeState, setActiveState] = useState(-1)

  const handleActiveState = (idx: number) => {
    if (idx == activeState) {
      setActiveState(-1)
    } else setActiveState(idx)
  }
  const colors = ["#FF6BB2", "#B69DFF", "#30C5E5", "#7BB872", "#49A8EE", "#3F91A2", "#DA4F7A"]

  return showLayer ? (
    <Scrollable>
      <div className={classes.objectLayerSection}>
        <div
          className="d-flex justify-content-start flex-row align-items-center pointer mt-1"
          onClick={() => {
            handleClose()
          }}
        >
          <Icons.ChevronRight size="16" /> <div className={clsx(classes.panelHeading, "ml-1")}>Object</div>
        </div>
        <div>
          <div className={clsx(classes.layerSubSection, "flex-center mt-3")}>
            <div className={clsx(classes.box, "d-flex justify-content-center align-items-center flex-column mr-1")}>
              <Icons.Image />
              <p>Replace</p>
            </div>
            <div
              className={clsx(
                classes.box,
                " pointer d-flex justify-content-center align-items-center flex-column ml-1"
              )}
            >
              <Icons.TrashIcon size={"20"} />
              <p>Erase</p>
            </div>{" "}
          </div>
          <div className={clsx(classes.modifierSection, classes.panelSubHeading, "mb-2")}>Modifiers</div>
          {ObjectLayerOption.map((each, idx) => (
            <DropdownWrapper
              key={idx}
              icon={each.icon}
              activeState={activeState}
              idx={idx}
              heading={each.name}
              handleActiveState={handleActiveState}
            />
          ))}
        </div>
        <div className={clsx(classes.panelSubHeading, "my-2")}>Colors</div>
        <div className={classes.colorsWrapper}>
          {colors.map((each, idx) => {
            return <div key={idx} className={classes.colorOption} style={{ backgroundColor: each }}></div>
          })}
        </div>
        <div className={clsx(classes.panelSubHeading, "my-2")}>Other tools</div>
        <div className={classes.otherToolsWrapper}>
          {[1, 2, 3, 4].map((each, idx) => (
            <div
            key={idx}
              className={clsx(
                classes.otherToolsBox,
                "d-flex  pointer justify-content-center align-items-center flex-column mr-1 mb-1"
              )}
            >
              <Icons.Image />
              <p>Remove Background</p>
            </div>
          ))}
        </div>
      </div>
    </Scrollable>
  ) : null
}

export default ObjectLayer

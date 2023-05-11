import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import useAppContext from "~/hooks/useAppContext"

const AddPopup = ({ handleClose, showPopup }: any) => {
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const { setActivePanel } = useAppContext()

  return showPopup ? (
    <Block className="addPopup">
      <Block className="addPopupCon">
        <Block className={clsx(classes.box, "d-flex justify-flex-start align-items-start p-absolute flex-column mt-4")}>
          <div className={clsx("p-absolute", classes.chevronTopIcon)}>
            <Icons.SliderBtn size={106} width="10" />
          </div>
          <Block
            className={classes.addSubSection}
            onClick={() => {
              handleClose()
              setIsSidebarOpen(true)
              // @ts-ignore 
              setActivePanel("Images")
            }}
          >
            <Block className={classes.heading}>Image</Block>
            <Block className={classes.subHeading}>Lorem ipsum dolor sit amet consecte. Pulvinar vitae sit</Block>
          </Block>
          <div className={classes.horizontalLine}></div>
          <Block
            className={classes.addSubSection}
            onClick={() => {
              handleClose()
            }}
          >
            <Block className={classes.heading}>Video</Block>
            <Block className={classes.subHeading}>Lorem ipsum dolor sit amet consecte. Pulvinar vitae sit</Block>
          </Block>
          <div className={classes.horizontalLine}></div>
          <Block
            className={classes.addSubSection}
            onClick={() => {
              handleClose()
            }}
          >
            <Block className={classes.heading}>Text</Block>
            <Block className={classes.subHeading}>Lorem ipsum dolor sit amet consecte. Pulvinar vitae sit</Block>
          </Block>
        </Block>
      </Block>
    </Block>
  ) : null
}

export default AddPopup

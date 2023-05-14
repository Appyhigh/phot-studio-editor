import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import React from "react"
import { Modal, ModalBody, ModalButton, ModalFooter, ModalHeader } from "baseui/modal"
import { Button } from "baseui/button"
import UploadImgModal from "~/components/UI/UploadImgModal/UploadImgModal"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { FontItem } from "~/interfaces/common"
import { loadFonts } from "~/utils/fonts"
import { nanoid } from "nanoid"

const AddPopup = ({ handleClose, showPopup }: any) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const editor =useEditor();

  function close() {
    setIsOpen(false)
  }

  const activeObject=useActiveObject()
  const addObject = async () => {
    if (editor) {
      const font: FontItem = {
        name: "OpenSans-Regular",
        url: "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
      }
      await loadFonts([font])
      const options = {
        id: nanoid(),
        type: "StaticText",
        width: 500,
        text: "Click here to edit text",
        fontSize: 92,
        fontFamily: font.name,
        textAlign: "center",
        fontStyle: "normal",
        fontURL: font.url,
        fill: "#333333",
        metadata: { generationDate: new Date().getTime() },
      }
      
      editor.objects.add(options)

      
    }
  }

  return showPopup ? (
    <Block className="addPopup">
      <Block className="addPopupCon">
        <Block className={clsx(classes.box, "d-flex justify-flex-start align-items-start p-absolute flex-column mt-4")}>
          <div className={clsx("p-absolute", classes.chevronTopIcon)}>
            <Icons.SliderBtn size={106} width="10" />
          </div>
          <div
            className={classes.addSubSection}
            onClick={() => {
              setIsOpen(true)
            }}
          >
            <Block className={classes.heading}>Image</Block>
            <Block className={classes.subHeading}>Lorem ipsum dolor sit amet consecte. Pulvinar vitae sit</Block>
          </div>
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
              addObject()
              handleClose()
            }}
          >
            <Block className={classes.heading}>Text</Block>
            <Block className={classes.subHeading}>Lorem ipsum dolor sit amet consecte. Pulvinar vitae sit</Block>
          </Block>
        </Block>
      </Block>
      <UploadImgModal isOpen={isOpen} handleClose={close} />
    </Block>
  ) : null
}

export default AddPopup

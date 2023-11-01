import React, { useState } from "react"
import classes from "./style.module.css"
import { Block } from "baseui/block"
import clsx from "clsx"
import { CREATE_BTN_ITEMS } from "~/constants/app-options"
import Icons from "~/components/Icons"
import { useNavigate } from "react-router-dom"

const CreatePopup = ({ setShowCreatePopup }: any) => {
  return (
    <Block className={classes.createPopup} onMouseLeave={() => setShowCreatePopup(false)}>
      <Block className={classes.createPopupCon}>
        {CREATE_BTN_ITEMS.map((PopupListItems) => (
          <Block key={PopupListItems.category}>
            <div className={classes.popupCategoriesName}>
              <p>{PopupListItems.category}</p>
            </div>
            {PopupListItems.items.map((item) => (
              <PopupListItem
                label={item.label}
                name={item.name}
                key={item.id}
                // @ts-ignore
                icon={item.icon ? item.icon : item.name}
              />
            ))}
          </Block>
        ))}
      </Block>
    </Block>
  )
}

const PopupListItem = ({ label, icon, activePanel, name }: any) => {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  // @ts-ignore
  const Icon = Icons[icon]
  return (
    <Block
      id="EditorPopupList"
      className={clsx(classes.popupListItem, "p-relative")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate("/art-board")
      }}
    >
      <Icon size={24} color={isHovered ? "#4E19C6" : activePanel !== name ? "#F1F1F5" : "#4E19C6"} />
      <Block
        className={clsx("text-center p-relative", classes.popupListItemEach, isHovered && classes.activePopupItem)}
      >
        {label}
      </Block>
    </Block>
  )
}

export default CreatePopup

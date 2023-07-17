import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { useState } from "react"

const Navbar = () => {
  const [showAddPopup, setShowAddPopup] = useState(false)

  const handleCloseAddPopup = () => {
    setShowAddPopup(false)
  }
  return (
    <Block className={classes.header}>
      <Block className="d-flex justify-content-start pointer">
        <Icons.PhotAILogo size={23} />
      </Block>
      <div className="flex-1"></div>
      <Block className={clsx(classes.profileWrapper, "ml-2 pointer ")}>
        <div className="p-relative addPopupBtn">
          <button className={classes.CreateBtn}>
            <span className="d-flex align-items-center">
              <span className="pr-1">
                <Icons.Plus size={16} />
              </span>
              Create
              <span className="pl-3">
                <Icons.ArrowDown size={14} color={"white"} />
              </span>
            </span>
          </button>
        </div>
        <div className={classes.createContainer}>
          <div className={classes.createCon}>
            <div>
            <div className={classes.createLinks}>
              <Icons.BgRemoverPopup size={20} />
              <p>Remove Background</p>
            </div>
            <div className={classes.createLinks}>
              <Icons.TextToArtPopup size={20} />
              <p>Text to Art</p>
            </div>
            <div className={classes.createLinks}>
              <Icons.ProductPhotoPopup size={20} />
              <p>Product Photoshoot</p>
            </div>
            </div>
          </div>
        </div>
      </Block>

      <Block className={clsx(classes.profileWrapper, "ml-2 pointer mt-1")}>
        <Icons.ProfileIcon size={32} />
       
      </Block>
    </Block>
  )
}

export default Navbar

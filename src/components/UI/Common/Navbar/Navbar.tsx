import { Block } from "baseui/block"
import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx";

const Navbar = () => {
  return (
    <Block className={classes.header}>
      <Block className="d-flex justify-content-start pointer">
        <Icons.PhotAILogo size={23} />
      </Block>
      <div className="flex-1"></div>
      <Block className="d-flex justify-content-end align-items-center mr-1 pointer">
        <Icons.ActivityIcon size={24} />
      </Block>
      <button className={clsx(classes.navbarBtn,classes.creditsStatusBtn)}>10 Credits</button>
      <button className={clsx(classes.navbarBtn,classes.upgradeBtn)}>Upgrade</button>
      <Block className="ml-2 pointer mt-1">
        <Icons.ProfileIcon size={32} />
      </Block>
    </Block>
  )
}

export default Navbar

import { Block } from "baseui/block"
import Common from "./Common/Common"
import clsx from "clsx"
import classes from "./style.module.css"

const Locked = () => {

  return (
    <Block className={clsx("d-flex align-items-center justify-content-between", classes.bottomPanel)}>
      {/* //dont need for now  */}
      {/* <Block>
    </Block> */}
      <Common type="lock" />
    </Block>
  )
}

export default Locked

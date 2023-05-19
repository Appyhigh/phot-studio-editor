import { Block } from "baseui/block"
import Common from "./Common/Common"
import classes from "./style.module.css"
import clsx from "clsx"

const Image = () => {
  return (
    <Block className={clsx("d-flex align-items-center justify-content-between",classes.bottomPanel)}>
      {/* //dont need for now  */}
      {/* <Block>
      </Block> */}
      <Common />
    </Block>
  )
}

export default Image

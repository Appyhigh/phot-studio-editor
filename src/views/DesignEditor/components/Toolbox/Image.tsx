import { Block } from "baseui/block"
import Common from "./Common"
import Flip from "./Shared/Flip"
import { useStyletron } from "baseui"

const Image = () => {

  return (
    <Block
      className="d-flex align-items-center justify-content-between"
      $style={{
        padding: "0 12px",
        backgroundColor: "#fff",
      }}
    >
      {/* //dont need for now  */}
      {/* <Block>
        <Flip />
      </Block> */}
      <Common />
    </Block>
  )
}

export default Image

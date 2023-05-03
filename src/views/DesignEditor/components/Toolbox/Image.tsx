import { Block } from "baseui/block"
import Common from "./Common"
import Flip from "./Shared/Flip"

const Image = () => {
  return (
    <Block
      $style={{
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        backgroundColor: "#fff",
        justifyContent: "space-between",
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

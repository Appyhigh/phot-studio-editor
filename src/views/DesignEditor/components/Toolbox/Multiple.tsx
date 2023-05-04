import { Block } from "baseui/block"
import Common from "./Common"

const Multiple = () => {
  return (
    <Block
      $style={{
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        backgroundColor:"#FFF"
      }}
    >
      {/* //not needed for now  */}
      {/* <Block>Multiple</Block> */}
      <Common />
    </Block>
  )
}

export default Multiple



import { Block } from "baseui/block"
import Common from "./Common/Common"

const Image = () => {
  return (
    <Block
      className="d-flex align-items-center justify-content-between"
      $style={{
        padding: "12px",
        backgroundColor: "#fff",
        borderRadius: "8px",
      }}
    >
      {/* //dont need for now  */}
      {/* <Block>
      </Block> */}
      <Common />
    </Block>
  )
}

export default Image

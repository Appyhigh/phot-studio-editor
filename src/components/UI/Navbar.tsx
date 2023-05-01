import { Block } from "baseui/block"

import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Icons from "../Icons"
import { Button } from "baseui/button"
import { SIZE } from "baseui/input"
import BaseBtn from "./Common/BaseBtn"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "50px",
  background: $theme.colors.white,
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  boxShadow: "inset 0px -1px 0px #E2E2EA",
  padding: "10px 20px",
}))

const Navbar = () => {
  return (
    <Container>
      <Block
        $style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Icons.PhotAILogo size={23} />
      </Block>
      <div style={{ flex: 1 }}></div>

      <Block
        $style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Icons.ActivityIcon size={24} />
      </Block>

      <BaseBtn txtColor={"#92929D"} bgColor={"#F1F1F5"} title={"10 Credits"} hoverBgColor={"rgba(241, 241, 245,0.7)"} />
      <BaseBtn txtColor={"#FFFFFF"} bgColor={"#FF974A"} title={"Upgrade"} hoverBgColor={"rgba(255, 151, 74,0.9)"} />

      <Block
        $style={{
          marginLeft: "10px",
          ":hover": {
            cursor: "pointer",
          }
        }}
      >
        <Icons.ProfileIcon size={32} />
      </Block>
    </Container>
  )
}

export default Navbar

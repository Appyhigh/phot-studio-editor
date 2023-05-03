import { Block } from "baseui/block"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Icons from "../Icons"
import BaseBtn from "./Common/BaseBtn"
import { CustomTheme } from "~/theme"
const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "70px",
  background: $theme.colors.white,
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  boxShadow: "inset 0px -1px 0px #E2E2EA",
  padding: "15px 20px",
  
}))

const Navbar = () => {
  
  return (
    <Container>
      <Block className="d-flex justify-content-start pointer">
        <Icons.PhotAILogo size={23} />
      </Block>
      <div className="flex-1"></div>
      <Block className="d-flex justify-content-end align-items-center mr-1 pointer">
        <Icons.ActivityIcon size={24} />
      </Block>
      <BaseBtn txtColor={"#92929D"} bgColor={"#F1F1F5"} title={"10 Credits"} hoverBgColor={"rgba(241, 241, 245,0.7)"} />
      <BaseBtn txtColor={"#FFFFFF"} bgColor={"#FF974A"} title={"Upgrade"} hoverBgColor={"rgba(255, 151, 74,0.9)"} />
      <Block className="ml-2 pointer mt-1">
        <Icons.ProfileIcon size={32} />
      </Block>
    </Container>
  )
}

export default Navbar

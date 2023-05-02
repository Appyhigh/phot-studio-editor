import { Button, KIND } from "baseui/button"

interface BaseBtnProps {
  title: string
  bgColor: string
  txtColor: string
  hoverBgColor?: string
  marginLeft?: string
  padding?: string
  borderColor?: string
  handleClick?: any
}

const BaseBtn = ({
  title,
  bgColor,
  txtColor,
  hoverBgColor,
  marginLeft,
  padding,
  borderColor,
  handleClick,
}: BaseBtnProps) => {
  return (
    <Button
      kind={KIND.secondary}
      onClick={handleClick}
      overrides={{
        Root: {
          style: {
            fontSize: "12px",
            paddingTop: "9px",
            paddingBottom: "9px",
            paddingLeft: padding ? padding : "24px",
            paddingRight: padding ? padding : "24px",
            backgroundColor: bgColor,
            color: txtColor,
            borderBottomRadius: "10px",
            borderTopRadius: "10px",
            borderLeftRadius: "10px",
            borderRightRadius: "10px",
            fontFamily: "Poppins",
            fontWeight: 500,
            marginLeft: marginLeft ? marginLeft : "12px",
            marginRight: "4px",
            ":hover": {
              backgroundColor: hoverBgColor,
              cursor: "pointer",
            },
          },
        },
      }}
    >
      {title}
    </Button>
  )
}

export default BaseBtn

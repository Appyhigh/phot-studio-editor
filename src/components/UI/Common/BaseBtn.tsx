import { Button, KIND } from "baseui/button"

interface BaseBtnProps {
  title: string
  bgColor: string
  txtColor: string
  hoverBgColor?: string
}

const BaseBtn = ({ title, bgColor, txtColor, hoverBgColor }: BaseBtnProps) => {
  return (
    <Button
      kind={KIND.secondary}
      overrides={{
        Root: {
          style: {
            fontSize: "12px",
            paddingTop: "9px",
            paddingBottom: "9px",
            paddingLeft: "24px",
            paddingRight: "24px",
            backgroundColor: bgColor,
            color: txtColor,
            borderBottomRadius: "10px",
            borderTopRadius: "10px",
            borderLeftRadius: "10px",
            borderRightRadius: "10px",
            fontFamily: "Poppins",
            fontWeight: 600,
            marginLeft: "12px",
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

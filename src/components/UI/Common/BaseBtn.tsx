import { Button, KIND } from "baseui/button"
interface BaseBtnProps {
  title: string
  bgColor: string
  txtColor: string
  hoverBgColor?: string
  marginLeft?: string
  padding?: string
  borderColor?: string
  handleClick?: () => void
}

const BaseBtn = ({ title, bgColor, txtColor, marginLeft, padding, borderColor, handleClick }: BaseBtnProps) => {
  return (
    <button
      className="pointer"
      onClick={handleClick}
      style={{
        fontSize: "12px",
        padding: padding ? ` 9px ${padding}` : "9px 24px",
        backgroundColor: bgColor,
        color: txtColor,
        borderRadius: "10px",
        fontFamily: "Poppins",
        fontWeight: 500,
        border: borderColor ? `1px solid ${borderColor}` : `1px solid ${bgColor}`,
        marginLeft: marginLeft ? marginLeft : "12px",
        marginRight: "4px",
      }}
    >
      {title}
    </button>
  )
}

export default BaseBtn

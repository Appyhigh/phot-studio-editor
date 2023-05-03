import { useStyletron } from "baseui"
import { ParagraphXSmall } from "baseui/typography"

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
  const [css, theme] = useStyletron()

  return (
    <button
      className="pointer"
      onClick={handleClick}
      style={{
        padding: padding ? ` 9px ${padding}` : "9px 24px",
        backgroundColor: bgColor,
        borderRadius: "10px",
        border: borderColor ? `1px solid ${borderColor}` : `1px solid ${bgColor}`,
        marginLeft: marginLeft ? marginLeft : "12px",
        marginRight: "4px",
      }}
    >
      <ParagraphXSmall className={css({ color: txtColor })}>{title}</ParagraphXSmall>
    </button>
  )
}

export default BaseBtn

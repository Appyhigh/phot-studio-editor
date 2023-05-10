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
  children?: any
  fontSize?: string
}
const BaseBtn = ({
  title,
  bgColor,
  txtColor,
  marginLeft,
  padding,
  borderColor,
  handleClick,
  children,
  fontSize,
}: BaseBtnProps) => {
  const [css, theme] = useStyletron()

  return (
    <button
      onClick={handleClick}
      className={css({
        cursor:"pointer",
        padding: padding ? ` 9px ${padding}` : "9px 24px",
        backgroundColor: bgColor,
        borderRadius: "10px",
        border: borderColor ? `1px solid ${borderColor}` : `1px solid ${bgColor}`,
        marginLeft: marginLeft ? marginLeft : "12px",
        marginRight: "4px",
      })}
    >
      <ParagraphXSmall className={css({ color: txtColor, fontSize: fontSize ? fontSize : "12px" })}>
        {children || title}
      </ParagraphXSmall>
    </button>
  )
}

export default BaseBtn

import { useStyletron } from "baseui"
import AlignBottom from "~/components/Icons/AlignBottom"
import AlignCenter from "~/components/Icons/AlignCenter"
import TextAlignJustify from "~/components/Icons/TextAlignJustify"

interface BaseButtonProps {
  title?: string
  bgColor?: string
  txtColor?: string
  hoverBgColor?: string
  padding?: string
  handleClick?: () => void
  children?: any
  fontSize?: string
  disabled?: boolean
  width?: string
  height?: string
  margin?:string
  borderRadius?:string
  fontFamily?:string
  fontWeight?:string
  disabledBgColor?:string
}

const BaseButton = ({
  title,
  bgColor,
  txtColor,
  padding,
  handleClick,
  children,
  fontSize,
  disabled,
  width,
  height,
  margin,
  borderRadius,
  fontFamily,
  fontWeight,
  disabledBgColor
}: BaseButtonProps) => {
  const [css, theme] = useStyletron()

  return (
    <button
      onClick={handleClick}
      className={`${css({
        width: width ? width : "100%",
        height: height ? height : "52px",
        cursor: "pointer",
        padding: padding ? ` 9px ${padding}` : "9px 24px",
        backgroundColor: bgColor ? bgColor : `#6729f3`,
        borderRadius: borderRadius? borderRadius: `8px`,
        border: `1px solid transparent`,
        color: txtColor ? txtColor : `#fff`,
        fontWeight:fontWeight?fontWeight: 500,
        fontSize: fontSize ? fontSize : "18px",
        margin:margin?margin:"",
        fontFamily:fontFamily?fontFamily:""
      })} ${''}`}
    
      style={{
       backgroundColor: disabled ? disabledBgColor ? disabledBgColor : "#f1f1f5":"",
        color: disabled ?disabledBgColor? "#fff" :"#92929d" : "",
        cursor: disabled ? "not-allowed" : "",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}
    >
      {children || title}
    </button>
  )
}

export default BaseButton

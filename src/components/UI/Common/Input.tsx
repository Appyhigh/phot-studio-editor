import { Input } from "baseui/input"

const CommonInput = ({ type, placeholder, width, height, value, handleChange }: any) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      onChange={(e: any) => {
        handleChange(e.target.value)
      }}
      value={value}
      overrides={{
        Root: {
          style: {
            borderTopStyle: "none",
            borderBottomStyle: "none",
            borderRightStyle: "none",
            borderLeftStyle: "none",
            outline: "transparent",
            backgroundColor: "transparent",
          },
        },
        InputContainer: {
          style: {
            border: "1px solid #92929D",
            textAlign: "center",
            paddingLeft: 0,
            paddingRight: 0,
            height: height,
            width: width,
            borderRadius: "4px",
            marginRight: "6px",
            backgroundColor: "#fff",
          },
        },
      }}
    />
  )
}

export default CommonInput

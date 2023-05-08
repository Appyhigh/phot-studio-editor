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
        Input:{
          style:{
            backgroundColor: "#fff",
            fontWeight: 400,
            fontSize: "12px",
          }
        },
        InputContainer: {
          style: {
            border: "1px solid #92929D",
            textAlign: "center",
            height: height,
            width: width,
            padding:"1px",
            borderRadius: "4px",
            marginRight: "10px",
            
          },
        },
      }}
    />
  )
}

export default CommonInput

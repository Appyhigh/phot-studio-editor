function InputContainer({ height, width }: { height?: number; width?: number }) {
  return (
    <svg
      width={width ? width : "100%"}
      height={height ? height : "200"}
      viewBox={`0 0 ${width ? width : "320"} ${height ? height : "200"}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        opacity="1"
        x="0.5"
        y="0.5"
        width={width ? width - 1 : "319"}
        height={height ? height - 1 : "199"}
        rx="7.5"
        stroke="#6729F3"
        strokeDasharray="10 10"
      />
    </svg>
  )
}

export default InputContainer

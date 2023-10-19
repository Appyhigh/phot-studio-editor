function Plus({ size, color = "#FAFAFB" }: any) {
  return (
    <svg width={size ? size : "12"} height={size ? size : "12"} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 1V11" stroke={color} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 6H11" stroke={color} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default Plus

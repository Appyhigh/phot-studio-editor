function ImageUpscaler({ size, color }: { size: any; color: any }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M22 2H15V6H18V8.75H22V2Z" fill={color} />
      <path fillRule="evenodd" clipRule="evenodd" d="M2 24H9V20H6V17.25H2V24Z" fill={color} />
      <path fillRule="evenodd" clipRule="evenodd" d="M2 2H9V6H6V8.75H2V2Z" fill={color} />
      <path d="M16 16L19 19L22 22" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.002 15.002H20.148" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M15.002 15.002L15.002 20.148"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ImageUpscaler

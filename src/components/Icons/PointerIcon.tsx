function PointerIcon({ width }: { width?: string }) {
  return (
    <svg width={width ? width : "40"} height="80" viewBox="0 0 24 106" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="40,0 40,80 0,40" fill="red" />
    </svg>
  )
}

export default PointerIcon

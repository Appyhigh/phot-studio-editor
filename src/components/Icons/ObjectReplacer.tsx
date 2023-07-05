function ObjectReplacer({ size,color }: { size: any,color:any }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="21" cy="14" r="6" fill={color}/>
      <path d="M7.5 8L14 20H1L7.5 8Z" fill={color}/>
    </svg>
  )
}

export default ObjectReplacer

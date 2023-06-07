function ChevronRight({ size ,fill}: { size: string ,fill?:string}) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={"none"} xmlns="http://www.w3.org/2000/svg">
      <path d="M15 6L9 12L15 18" stroke={fill?fill:"#B6B6B6"} strokeWidth={fill?"1":"2"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default ChevronRight;


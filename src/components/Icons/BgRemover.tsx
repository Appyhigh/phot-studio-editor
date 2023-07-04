function BgRemover({ size, color }: { size: any; color: any }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 18.5L19 12.5L25 17.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M25 19C25 20.1046 24.1046 21 23 21L14 21L14 7L23 7C24.1046 7 25 7.89543 25 9L25 19Z"
        stroke={color}
        strokeWidth="2"
      />
      <path d="M14 3L14 25" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 6C1.89543 6 1 6.89543 1 8V20C1 21.1046 1.89543 22 3 22H13V6H3ZM5 12C6.10457 12 7 11.1046 7 10C7 8.89543 6.10457 8 5 8C3.89543 8 3 8.89543 3 10C3 11.1046 3.89543 12 5 12ZM2.01189 21.7393C1.71738 21.5716 1.46961 21.3312 1.29297 21.0427L8.16089 14.6326C8.33364 14.4731 8.59416 14.4556 8.78676 14.5904L14 18.5003V19.749L8.54323 15.6406L2.01189 21.7393Z"
        fill={color}
      />
    </svg>
  )
}

export default BgRemover

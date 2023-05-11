function Trash({ size }: { size?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_3048_8277)">
        <circle cx="16" cy="12" r="12" transform="rotate(-180 16 12)" fill="#44444F" />
      </g>
      <path d="M11.1538 8.76953H12.2307H20.8461" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M19.7692 8.76957V16.308C19.7692 16.5936 19.6557 16.8676 19.4538 17.0695C19.2518 17.2715 18.9779 17.385 18.6923 17.385H13.3076C13.022 17.385 12.7481 17.2715 12.5461 17.0695C12.3442 16.8676 12.2307 16.5936 12.2307 16.308V8.76957M13.8461 8.76957V7.69265C13.8461 7.40703 13.9596 7.13311 14.1615 6.93115C14.3635 6.72918 14.6374 6.61572 14.923 6.61572H17.0769C17.3625 6.61572 17.6364 6.72918 17.8384 6.93115C18.0403 7.13311 18.1538 7.40703 18.1538 7.69265V8.76957"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.9231 11.4614V14.6922" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.0769 11.4614V14.6922" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <filter
          id="filter0_d_3048_8277"
          x="0"
          y="0"
          width="32"
          height="32"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3048_8277" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3048_8277" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

export default Trash

function VideoPlayIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_bd_5860_26057)">
        <circle cx="32" cy="28" r="28" fill="black" fill-opacity="0.58" shape-rendering="crispEdges" />
        <circle cx="32" cy="28" r="27" stroke="white" stroke-width="2" shape-rendering="crispEdges" />
      </g>
      <path d="M24 16L44 27.5L24 39V16Z" fill="white" />
      <defs>
        <filter
          id="filter0_bd_5860_26057"
          x="-6"
          y="-10"
          width="76"
          height="76"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5860_26057" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="effect1_backgroundBlur_5860_26057" result="effect2_dropShadow_5860_26057" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_5860_26057" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

export default VideoPlayIcon

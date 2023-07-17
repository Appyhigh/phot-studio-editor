function ProductPhotoshoot({ size, color }: { size: any; color: any }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Frame 1073711804">
        <g id="Group 1000005659">
          <path id="Vector 31" d="M3.5 9V22.5L6 25.5" stroke="#9BA6B0" strokeLinecap="round" />
          <path id="Vector 32" d="M3.5 9V22.5L1 25.5" stroke="#9BA6B0" strokeLinecap="round" />
          <g id="Group 1000005661">
            <path id="Vector 30" d="M12 2.36914L3.90476 6.17866L2 9.512L5.80952 17.131L12 2.36914Z" fill={color} />
            <circle id="Ellipse 1788" cx="3.42857" cy="7.98814" r="1.42857" fill={color} />
          </g>
        </g>
        <g id="Group 1000005660">
          <path id="Vector 31_2" d="M24.5 9V22.5L22 25.5" stroke={color} stroke-linecap="round" />
          <path id="Vector 32_2" d="M24.5 9V22.5L27 25.5" stroke={color} stroke-linecap="round" />
          <g id="Group 1000005663">
            <path id="Vector 34" d="M11 26V17H17V26" stroke={color} stroke-linecap="round" />
          </g>
          <g id="Group 1000005662">
            <path id="Vector 30_2" d="M16 2.36914L24.0952 6.17866L26 9.512L22.1905 17.131L16 2.36914Z" fill={color} />
            <circle
              id="Ellipse 1788_2"
              cx="1.42857"
              cy="1.42857"
              r="1.42857"
              transform="matrix(-1 0 0 1 26 6.55957)"
              fill={color}
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default ProductPhotoshoot

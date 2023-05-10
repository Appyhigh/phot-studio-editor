function DropBox({ size }: { size?: any }) {
  return (
    <svg
      width={size ? size : "100%"}
      height={size ? size : "100%"}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle opacity="0.1" cx="24" cy="24" r="23.5" stroke="#92929D" />
      <g clipPath="url(#clip0_3078_7849)">
        <path
          d="M18.2366 11.1665L24 15.685L15.6956 20.4998L9.99997 16.217L18.2366 11.1665ZM9.99997 25.9493L15.6956 21.6665L24 26.4813L18.2366 30.9998L9.99997 25.9493ZM24 26.4825L32.3043 21.6665L38 25.9493L29.7633 30.9998L24 26.4825ZM24 27.4998L29.719 32.0032L32.1666 30.4865V32.1863L24 36.8332L15.8333 32.1863V30.4865L18.281 32.0032L24 27.4998ZM38 16.217L29.7633 11.1665L24 15.685L32.3043 20.4998L38 16.217Z"
          fill="#0F82E2"
        />
      </g>
      <defs>
        <clipPath id="clip0_3078_7849">
          <rect width="28" height="28" fill="white" transform="translate(9.99997 10)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default DropBox

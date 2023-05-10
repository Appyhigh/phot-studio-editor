function Phone({ size }: { size?: string }) {
  return (
    <svg
      width={size ? size : "100%"}
      height={size ? size : "100%"}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle opacity="0.1" cx="24" cy="24" r="23.5" stroke="#92929D" />
      <path
        d="M29.5955 10H19.3341C18.0499 10 17 11.0499 17 12.3341V35.6659C17 36.9501 18.0499 38 19.3341 38H29.5986C30.8828 38 31.9327 36.9501 31.9327 35.6659V12.3341C31.9296 11.0499 30.8797 10 29.5955 10ZM23.0649 11.8654H25.8646C26.1209 11.8654 26.3302 12.0748 26.3302 12.331C26.3302 12.5872 26.1209 12.7966 25.8646 12.7966H23.0649C22.8087 12.7966 22.5994 12.5872 22.5994 12.331C22.5994 12.0748 22.8087 11.8654 23.0649 11.8654ZM24.4648 37.0626C23.6899 37.0626 23.0649 36.4377 23.0649 35.6628C23.0649 34.8878 23.6899 34.2629 24.4648 34.2629C25.2397 34.2629 25.8646 34.8878 25.8646 35.6628C25.8646 36.4377 25.2397 37.0626 24.4648 37.0626ZM30.9984 33.3318H17.9343V14.6651H30.9984V33.3318Z"
        fill="#6729F3"
      />
      <path
        d="M23.2812 20.0312H20.8438C20.395 20.0312 20.0312 20.395 20.0312 20.8438V23.2812C20.0312 23.73 20.395 24.0938 20.8438 24.0938H23.2812C23.73 24.0938 24.0938 23.73 24.0938 23.2812V20.8438C24.0938 20.395 23.73 20.0312 23.2812 20.0312Z"
        fill="#6729F3"
        fillOpacity="0.5"
      />
      <path
        d="M23.2812 24.9062H20.8438C20.395 24.9062 20.0312 25.27 20.0312 25.7188V28.1562C20.0312 28.605 20.395 28.9688 20.8438 28.9688H23.2812C23.73 28.9688 24.0938 28.605 24.0938 28.1562V25.7188C24.0938 25.27 23.73 24.9062 23.2812 24.9062Z"
        fill="#6729F3"
        fillOpacity="0.5"
      />
      <path
        d="M28.15 24.9062H25.7125C25.2638 24.9062 24.9 25.27 24.9 25.7188V28.1562C24.9 28.605 25.2638 28.9688 25.7125 28.9688H28.15C28.5987 28.9688 28.9625 28.605 28.9625 28.1562V25.7188C28.9625 25.27 28.5987 24.9062 28.15 24.9062Z"
        fill="#6729F3"
        fillOpacity="0.5"
      />
      <path
        d="M28.1562 20.0312H25.7188C25.27 20.0312 24.9062 20.395 24.9062 20.8438V23.2812C24.9062 23.73 25.27 24.0938 25.7188 24.0938H28.1562C28.605 24.0938 28.9688 23.73 28.9688 23.2812V20.8438C28.9688 20.395 28.605 20.0312 28.1562 20.0312Z"
        fill="#6729F3"
        fillOpacity="0.5"
      />
    </svg>
  )
}
export default Phone

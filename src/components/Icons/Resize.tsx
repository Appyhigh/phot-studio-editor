function Resize({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 1.6333L7.5 13.3666M2 7.49997L13 7.49997" stroke="white" stroke-width="2.5" stroke-linecap="round" />
      <path
        d="M6.76621 2L8.23288 2M12.6329 6.76667L12.6329 8.23333M6.76621 13L8.23288 13M2.36621 6.76667V8.23333"
        stroke="white"
        stroke-width="2.5"
        stroke-linecap="round"
      />
    </svg>
  )
}

export default Resize

function ActivityIcon({ size }: { size: number }) {
  return (
    <svg width="24" height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 5C12.5523 5 13 5.44771 13 6V11.5109L17.1139 14.7106C17.5499 15.0497 17.6284 15.678 17.2893 16.1139C16.9503 16.5499 16.322 16.6284 15.8861 16.2893L11.3861 12.7894C11.1425 12.5999 11 12.3086 11 12V6C11 5.44771 11.4477 5 12 5Z"
        fill="#92929D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
        fill="#92929D"
      />
    </svg>
  )
}

export default ActivityIcon

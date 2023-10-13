function ArrowLeft({ color }: any) {
  return (
    <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.346875 12.8156C0.126563 12.6 0 12.3094 0 12C0 11.6906 0.126563 11.4 0.346875 11.1844L8.59687 3.30937C9.04687 2.87812 9.75938 2.89687 10.1859 3.34687C10.6125 3.79687 10.5984 4.50937 10.1484 4.93593L3.93281 10.875H19.875C20.4984 10.875 21 11.3766 21 12C21 12.6234 20.4984 13.125 19.875 13.125H3.93281L10.1531 19.0594C10.6031 19.4906 10.6172 20.1984 10.1906 20.6484C9.76406 21.0984 9.05156 21.1125 8.60156 20.6859L0.351562 12.8109L0.346875 12.8156Z"
        fill={color ? color : "#44444F"}
      />
    </svg>
  )
}

export default ArrowLeft

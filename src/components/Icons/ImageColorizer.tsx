function ImageColorizer({ size,color }: { size: any, color:any }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22 2H15V6H18V8.75H22V2Z" fill={color}/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2 22H9V18H6V15.25H2V22Z" fill={color}/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2 2H9V6H6V8.75H2V2Z" fill={color}/>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.2757 18.5337C16.3586 17.4004 17.2631 16.4954 18.3961 16.4115L12.7776 10.793C12.2725 10.2879 11.3881 10.3533 10.8024 10.9391C10.2166 11.5249 10.1512 12.4092 10.6563 12.9144L16.2757 18.5337Z"
        fill={color}
      />
      <path
        d="M20.163 16.6737C22.121 16.6737 23.7049 18.3096 23.7049 20.332C23.7049 21.0332 23.8702 21.5994 24.0965 22.0578C25.1843 24.2511 27.6819 23.9904 20.163 23.9904C18.2049 23.9904 16.6211 22.3545 16.6211 20.332C16.6211 18.3096 18.2049 16.6737 20.163 16.6737Z"
        fill={color}
      />
    </svg>
  )
}

export default ImageColorizer

function ImageUpscaler({ size, color }: { size: any; color: any }) {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="19" r="19" fill={color} />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M26.8672 11.8901H21.8184V14.7752H23.9821V16.7586H26.8672V11.8901Z" fill={color == '#4E19C6' ? '#FFFFFF' : "#696974"} />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4434 27.7583H17.4922V24.8733H15.3284V22.8898H12.4434V27.7583Z" fill={color == '#4E19C6' ? '#FFFFFF' : "#696974"} />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4434 11.8901H17.4922V14.7752H15.3284V16.7586H12.4434V11.8901Z" fill={color == '#4E19C6' ? '#FFFFFF' : "#696974"} />
      <path d="M22.5391 21.9883L24.7028 24.1521L26.8666 26.3158" stroke={color == '#4E19C6' ? '#FFFFFF' : "#696974"} stroke-width="2.16378" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M21.8203 21.2681H25.532" stroke={color == '#4E19C6' ? '#FFFFFF' : "#696974"} stroke-width="2.16378" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M21.8203 21.2681L21.8203 24.9797" stroke={color == '#4E19C6' ? '#FFFFFF' : "#696974"} stroke-width="2.16378" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

  )
}

export default ImageUpscaler

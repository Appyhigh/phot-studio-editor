function SocialMediaStory({ size,color }: { size: any,color?:string }) {
    return (
    <svg width="38" height="50" viewBox="0 0 38 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.75" y="0.75" width="36.5" height="48.5" rx="3.25" stroke={color} strokeWidth="1.5" />
      <path
        d="M25.32 18.6803C23.6438 17.0041 21.3705 16.0625 19.0001 16.0625C16.6297 16.0625 14.3564 17.0041 12.6803 18.6803C11.0041 20.3564 10.0625 22.6297 10.0625 25.0001C10.0625 27.3705 11.0041 29.6438 12.6803 31.32C14.3564 32.9961 16.6297 33.9377 19.0001 33.9377C21.3705 33.9377 23.6438 32.9961 25.32 31.32C26.9961 29.6438 27.9377 27.3705 27.9377 25.0001C27.9377 22.6297 26.9961 20.3564 25.32 18.6803ZM24.348 19.6531C24.7005 20.0071 25.0172 20.3952 25.2933 20.8115L22.3989 24.2267L19.9996 17.5046C21.6469 17.7198 23.1762 18.4754 24.348 19.6531ZM21.3711 25.4298L19.8105 27.2663L17.4395 26.8366L16.6291 24.5704L18.1897 22.7339L20.5607 23.1636L21.3711 25.4298ZM13.6522 19.6531C14.9506 18.3476 16.6836 17.5649 18.5214 17.4539L20.0262 21.6649L13.0103 20.387C13.2082 20.1288 13.4227 19.8836 13.6522 19.6531ZM12.0091 27.8825C11.6011 26.8862 11.4095 25.8146 11.447 24.7387C11.4845 23.6628 11.7502 22.6071 12.2265 21.6417L16.6274 22.4452L12.0091 27.8825ZM13.6522 30.3471C13.2997 29.9931 12.9831 29.6051 12.7069 29.1887L15.6013 25.7735L18.0007 32.4921C16.3538 32.2779 14.8245 31.5235 13.6522 30.3471ZM24.348 30.3471C23.0496 31.6526 21.3166 32.4353 19.4788 32.5463L17.974 28.3353L24.99 29.6167C24.7919 29.8737 24.5774 30.1177 24.348 30.3471ZM21.3728 27.555L25.9911 22.1178C26.3991 23.114 26.5907 24.1856 26.5532 25.2615C26.5157 26.3374 26.25 27.3931 25.7737 28.3585L21.3728 27.555Z"
        fill={color}
      />
    </svg>
  )
}
export default SocialMediaStory

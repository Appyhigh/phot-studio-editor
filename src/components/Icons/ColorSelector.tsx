
function ColorSelecter({ size, color }: { size?: string, color?: string }) {
    return (
        <svg width={size ? size : "36"} height={size ? size : "36"} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.9384 8.16681C23.1126 8.99162 24.3786 12.8434 23.5528 13.6682C23.4355 13.7853 23.3182 13.9024 23.2035 14.0171C23.5553 14.0171 23.9095 14.0171 24.2613 14.0171C23.8896 13.6458 23.5203 13.277 23.1486 12.9057C22.5573 12.3151 21.966 11.7246 21.3747 11.134C21.2375 10.9969 21.1003 10.8599 20.963 10.7228C20.963 11.0742 20.963 11.428 20.963 11.7794C21.3348 11.4081 24.2414 14.3908 24.6156 14.0171C25.1345 13.4988 23.6721 9.59153 24.191 9.07322C24.2409 9.02339 23.7374 9.00843 23.7873 8.9586C23.8047 8.94115 23.8247 8.92122 23.8447 8.90378C23.8746 8.87387 23.907 8.84646 23.9395 8.81905C24.0567 8.71938 23.8222 8.90128 23.9145 8.8365C24.0567 8.73433 24.2064 8.64712 24.3686 8.57734C24.3087 8.60226 26.4144 9.58089 26.3546 9.60581C26.5542 9.52109 24.5981 8.51006 24.8152 8.48016C24.7478 8.49013 24.683 8.4976 24.6156 8.50757C24.8202 8.48265 25.0223 8.48265 25.2269 8.50757C25.1595 8.4976 24.4713 8.39547 24.404 8.3855C24.6185 8.4154 25.2839 9.4074 25.1066 9.33362C25.0468 9.30871 26.9873 9.55664 26.9275 9.53172C27.0447 9.58405 25.7034 8.68699 25.8107 8.75676C25.8406 8.77669 25.8705 8.79663 25.898 8.81656C25.9529 8.85394 26.0128 8.93119 25.8606 8.78417C25.908 8.82902 25.9604 8.86889 26.0103 8.91374C26.0627 8.96358 26.115 9.0184 26.1625 9.07322C26.2049 9.12306 25.2064 9.51055 25.1066 9.33362C25.1216 9.36353 26.1874 9.10312 26.2074 9.13054C26.2947 9.25762 26.3645 9.39218 26.4244 9.53172C26.3995 9.47192 26.3745 9.41211 26.3496 9.35231C26.4294 9.54667 26.4793 8.36803 26.5092 8.57734C26.4993 8.51006 26.1276 8.85145 26.1177 8.78417C26.1426 8.99099 24.5499 9.1268 24.5225 9.33362C24.5325 9.26634 26.0202 10.5404 26.0302 10.4731C26.0028 10.6675 26.4294 10.5634 26.3546 10.7453C26.3795 10.6855 25.693 9.13303 25.7179 9.07322C25.6605 9.20778 26.3047 10.83 26.2248 10.9521C26.2074 10.9795 26.1874 11.0069 26.1674 11.0343C26.0926 11.139 26.1899 11.0343 26.1974 10.9969C26.1824 11.0667 23.9783 8.12694 23.9384 8.16681C23.6639 8.4459 25.7308 11.9762 26.0302 12.2503C26.3271 12.5219 26.7962 12.5494 27.0881 12.2503C27.6195 11.7096 27.9264 11.0243 27.9912 10.2718C28.0486 9.60897 27.854 8.87637 27.4623 8.33563C27.0506 7.765 26.4968 7.34637 25.8231 7.13456C25.2468 6.95515 24.5906 6.95515 24.0168 7.13456C23.5278 7.28656 23.0837 7.55568 22.7195 7.917C22.6022 8.03163 22.4874 8.14874 22.3702 8.26586C21.8936 8.74181 21.4196 9.21526 20.9431 9.6912C20.5963 10.0376 20.2495 10.3839 19.9027 10.7303C19.6158 11.0169 19.6158 11.5003 19.9027 11.7869C20.2744 12.1581 20.6437 12.5269 21.0154 12.8982C21.6067 13.4888 22.198 14.0794 22.7893 14.6699C22.9265 14.807 23.0638 14.944 23.201 15.0811C23.4879 15.3676 23.9719 15.3676 24.2588 15.0811C25.0846 14.2563 25.9105 13.4315 26.7363 12.6067C26.8535 12.4896 26.9708 12.3724 27.0856 12.2578C27.3625 11.9812 27.3825 11.4729 27.0856 11.2013C26.7887 10.9197 24.2328 7.87277 23.9384 8.16681Z" fill={color ? color : "#44444F"} />
            <path d="M16.7978 15.5083C17.5787 16.2882 18.3596 17.0682 19.1405 17.8481C19.2503 17.9578 19.36 18.0674 19.4698 18.1771C19.4698 17.8257 19.4698 17.4719 19.4698 17.1205C19.1754 17.4146 18.8835 17.7061 18.5891 18.0001C17.8831 18.7053 17.1745 19.413 16.4684 20.1182C15.6152 20.9704 14.7619 21.8226 13.9086 22.6749C13.1701 23.4124 12.4291 24.1525 11.6907 24.8901C11.3339 25.2465 10.9646 25.5953 10.6178 25.9616C10.6128 25.9666 10.6079 25.9716 10.6029 25.9766C10.7126 25.9118 10.8224 25.8495 10.9322 25.7847C10.6079 25.8769 10.2835 25.9716 9.96167 26.0713C9.4527 26.2258 8.93875 26.445 8.40983 26.5173C8.47719 26.5073 8.54206 26.4999 8.60942 26.4899C8.50962 26.5023 8.41232 26.5048 8.31252 26.4949C8.37989 26.5048 8.44475 26.5123 8.51212 26.5223C8.44226 26.5123 8.3749 26.4974 8.30753 26.47C8.36741 26.4949 8.42729 26.5198 8.48717 26.5447C8.45972 26.5323 8.43478 26.5173 8.40733 26.5048C8.30005 26.4525 8.55453 26.6469 8.44974 26.5372C8.34995 26.4326 8.51461 26.6593 8.48717 26.5945C8.47469 26.5622 8.45224 26.5347 8.43976 26.5023C8.46471 26.5622 8.48966 26.622 8.51461 26.6818C8.49715 26.6344 8.48467 26.5871 8.47719 26.5347C8.48717 26.602 8.49465 26.6668 8.50463 26.7341C8.49465 26.6444 8.49715 26.5572 8.50962 26.47C8.49964 26.5372 8.49216 26.602 8.48218 26.6693C8.51711 26.4126 8.60194 26.1684 8.68177 25.9242C8.77409 25.6377 8.85642 25.3486 8.93376 25.0596C9.02358 24.7207 9.1084 24.3818 9.18325 24.0404C9.11838 24.15 8.23312 26.926 8.16825 27.0356C8.46265 26.7416 11.5683 25.6501 11.8627 25.3561C12.5687 24.6509 13.3034 24.0406 14.0095 23.3354C14.8628 22.4832 15.6152 20.9704 16.4684 20.1182C17.2069 19.3806 18.7313 18.9147 19.4698 18.1771C19.8266 17.8207 17.4938 15.892 17.8431 15.5282C17.8481 15.5232 17.8531 15.5183 17.8581 15.5133C18.135 15.2367 18.155 14.7283 17.8581 14.4567C17.5587 14.1826 17.0947 14.1602 16.8003 14.4567C16.426 14.8305 16.0518 15.2043 15.675 15.5806C14.8118 16.4427 13.9486 17.3049 13.0853 18.1671C12.1323 19.119 11.1792 20.0709 10.2261 21.0228C9.55999 21.6881 8.89634 22.3509 8.23019 23.0162C8.09297 23.1533 7.91334 23.2953 7.81354 23.4648C7.72622 23.6143 7.70376 23.7987 7.66384 23.9656C7.59898 24.2348 7.53161 24.5064 7.45926 24.773C7.37443 25.0845 7.27963 25.3885 7.18232 25.695C7.08752 25.999 6.9952 26.3229 7.00019 26.6419C7.00768 27.0207 7.14989 27.4019 7.44928 27.6486C7.74867 27.8953 8.11293 28.0224 8.50463 28C9.13585 27.9626 9.73962 27.7059 10.3384 27.5215C10.5829 27.4468 10.8274 27.3745 11.0719 27.3022C11.284 27.2399 11.4861 27.1976 11.6582 27.0356C11.6857 27.0082 11.7131 26.9808 11.7406 26.9534C12.2745 26.4201 12.8059 25.8894 13.3398 25.3561C14.2629 24.4341 15.186 23.5121 16.1117 22.5876C17.0298 21.6706 17.9504 20.7511 18.8685 19.8341C19.3975 19.3059 19.9239 18.7801 20.4528 18.2518C20.4778 18.2269 20.5027 18.202 20.5277 18.1771C20.8146 17.8905 20.8146 17.4071 20.5277 17.1205C19.7468 16.3406 18.9659 15.5606 18.1849 14.7807C18.0752 14.671 17.9654 14.5614 17.8556 14.4517C17.5787 14.1751 17.0697 14.1552 16.7978 14.4517C16.5233 14.7483 16.5009 15.2118 16.7978 15.5083Z" fill={color ? color : "#44444F"} />
            <path d="M22.5955 18.6098C22.5705 18.6348 22.5406 18.6572 22.5156 18.6821C22.6579 18.5426 22.6129 18.6098 22.5506 18.6497C22.4907 18.6871 22.4283 18.7195 22.3635 18.7469C22.4233 18.722 22.4832 18.6971 22.5431 18.6721C22.4558 18.7045 22.3684 18.7295 22.2786 18.7444C22.346 18.7344 22.4109 18.727 22.4782 18.717C22.3635 18.7319 22.2512 18.7319 22.1389 18.717C22.2063 18.727 22.2711 18.7344 22.3385 18.7444C22.2462 18.7295 22.1589 18.707 22.074 18.6721C22.1339 18.6971 22.1938 18.722 22.2537 18.7469C22.1888 18.7195 22.1264 18.6896 22.0666 18.6497C21.9967 18.6049 21.9842 18.5475 22.1015 18.6821C22.079 18.6547 22.0466 18.6323 22.0217 18.6098C22.0167 18.6049 22.0142 18.6024 22.0092 18.5974C21.9792 18.57 21.9518 18.5401 21.9243 18.5127C21.7946 18.3831 21.6624 18.251 21.5326 18.1214C21.0711 17.6604 20.612 17.2019 20.1505 16.741C19.1001 15.6919 18.0497 14.6428 17.0019 13.5962C16.8422 13.4368 16.68 13.2748 16.5203 13.1153C16.4829 13.0779 16.448 13.043 16.4106 13.0057C16.4056 13.0007 16.3981 12.9932 16.3931 12.9882C16.3831 12.9783 16.3881 12.9832 16.3682 12.9608C16.3507 12.9434 16.3357 12.9259 16.3207 12.906C16.4006 13.0106 16.4181 13.0331 16.3731 12.9708C16.3307 12.901 16.2908 12.8312 16.2584 12.7565C16.2833 12.8163 16.3083 12.8761 16.3332 12.9359C16.3008 12.8487 16.2758 12.7615 16.2609 12.6718C16.2709 12.739 16.2783 12.8038 16.2883 12.8711C16.2733 12.7565 16.2733 12.6443 16.2883 12.5322C16.2783 12.5995 16.2709 12.6643 16.2609 12.7316C16.2758 12.6394 16.2983 12.5521 16.3332 12.4674C16.3083 12.5272 16.2833 12.587 16.2584 12.6468C16.2758 12.6045 16.2958 12.5621 16.3183 12.5222C16.3332 12.4948 16.4455 12.3378 16.3582 12.45C16.2733 12.5596 16.3756 12.435 16.4006 12.4101C16.433 12.3777 16.468 12.3428 16.5004 12.3104C16.6526 12.1584 16.8048 12.0064 16.9595 11.8519C17.3162 11.4956 17.673 11.1393 18.0298 10.7829C18.0747 10.7381 18.1196 10.6932 18.1645 10.6484C18.187 10.6259 18.2094 10.606 18.2319 10.5836C18.2793 10.5412 18.3142 10.5537 18.1645 10.6334C18.1944 10.616 18.2244 10.5935 18.2543 10.5761C18.3042 10.5462 18.3566 10.5213 18.4115 10.4989C18.3516 10.5238 18.2917 10.5487 18.2319 10.5736C18.3192 10.5412 18.4065 10.5163 18.4963 10.5013C18.429 10.5113 18.3641 10.5188 18.2967 10.5288C18.4115 10.5138 18.5238 10.5138 18.636 10.5288C18.5687 10.5188 18.5038 10.5113 18.4364 10.5013C18.5288 10.5163 18.6161 10.5387 18.7009 10.5736C18.641 10.5487 18.5812 10.5238 18.5213 10.4989C18.5861 10.5263 18.6485 10.5562 18.7084 10.596C18.7783 10.6409 18.7907 10.6982 18.6735 10.5636C18.6959 10.5911 18.7284 10.6135 18.7533 10.6359C18.7583 10.6409 18.7608 10.6434 18.7658 10.6484C18.7957 10.6758 18.8232 10.7057 18.8506 10.7331C18.9803 10.8627 19.1126 10.9947 19.2423 11.1243C19.7039 11.5853 20.1629 12.0438 20.6245 12.5048C21.6749 13.5539 22.7252 14.6029 23.7731 15.6495C23.9328 15.809 24.0949 15.971 24.2546 16.1304C24.292 16.1678 24.327 16.2027 24.3644 16.2401C24.3694 16.2451 24.3769 16.2525 24.3819 16.2575C24.3918 16.2675 24.3868 16.2625 24.4068 16.2849C24.4243 16.3024 24.4392 16.3198 24.4542 16.3398C24.3744 16.2351 24.3569 16.2127 24.4018 16.275C24.4442 16.3447 24.4841 16.4145 24.5166 16.4893C24.4916 16.4295 24.4667 16.3697 24.4417 16.3099C24.4742 16.3971 24.4991 16.4843 24.5141 16.574C24.5041 16.5067 24.4966 16.4419 24.4866 16.3746C24.5016 16.4893 24.5016 16.6014 24.4866 16.7135C24.4966 16.6463 24.5041 16.5815 24.5141 16.5142C24.4991 16.6064 24.4767 16.6936 24.4417 16.7783C24.4667 16.7185 24.4916 16.6587 24.5166 16.5989C24.4991 16.6413 24.4792 16.6836 24.4567 16.7235C24.4392 16.7534 24.3843 16.8107 24.3794 16.8431C24.3794 16.8331 24.5066 16.6961 24.4293 16.7758C24.4168 16.7883 24.4043 16.8032 24.3918 16.8157C24.3868 16.8207 24.3818 16.8257 24.3744 16.8331C24.3469 16.8606 24.3195 16.888 24.2945 16.9129C24.1623 17.045 24.0276 17.1795 23.8953 17.3116C23.5461 17.6604 23.1968 18.0093 22.8475 18.3582C22.7626 18.4404 22.6778 18.5251 22.5955 18.6098C22.3185 18.8864 22.2986 19.3948 22.5955 19.6664C22.8949 19.9405 23.3589 19.9629 23.6533 19.6664C24.2446 19.0758 24.8434 18.4902 25.4272 17.8947C25.789 17.5259 26.016 17.0126 25.9911 16.4918C25.9686 15.9984 25.774 15.5449 25.4297 15.1935C25.2875 15.049 25.1403 14.9045 24.9981 14.7624C24.2721 14.0373 23.5485 13.3147 22.8225 12.5895C22.0491 11.817 21.2757 11.0446 20.5022 10.2721C20.2927 10.0628 20.0856 9.85596 19.876 9.64664C19.8161 9.58684 19.7588 9.52952 19.6939 9.4772C19.1974 9.07352 18.5288 8.89908 17.905 9.09843C17.3462 9.27785 16.9794 9.70395 16.5802 10.1051C16.2035 10.4814 15.8268 10.8577 15.4475 11.2364C15.2629 11.4208 15.0808 11.6152 14.971 11.8569C14.704 12.4375 14.7015 13.1103 15.0359 13.6685C15.1856 13.9202 15.4001 14.1145 15.6047 14.3189C16.2783 14.9917 16.9545 15.667 17.6281 16.3398C18.4315 17.1421 19.2348 17.9445 20.0382 18.7469C20.2877 18.9961 20.5372 19.2453 20.7867 19.4944C21.106 19.8134 21.4578 20.1025 21.9219 20.1847C22.5606 20.2968 23.1843 20.1249 23.6533 19.6689C23.9353 19.3973 23.9477 18.8815 23.6533 18.6123C23.3514 18.3332 22.8949 18.3183 22.5955 18.6098Z" fill={color ? color : "#44444F"} />
        </svg>
    )
}

export default ColorSelecter
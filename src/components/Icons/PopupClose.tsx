function PopupClose({ size }: { size?: number }) {
    return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_5654_51254)">
                <rect x="5" y="5" width="40" height="40" rx="20" fill="white" />
            </g>
            <g clip-path="url(#clip0_5654_51254)">
                <path d="M19 19.375L24.625 25L19 30.625" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M30.3691 30.5042L25.0173 24.6187L30.9028 19.2668" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <filter id="filter0_d_5654_51254" x="0" y="0" width="50" height="50" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5654_51254" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5654_51254" result="shape" />
                </filter>
                <clipPath id="clip0_5654_51254">
                    <rect width="20" height="20" fill="white" transform="translate(15 15)" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default PopupClose
function ScrollCircleRight({ size }: { size?: number }) {
    return (
        <svg width={size ? size : "56"} height={size ? size : "56"} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_5861_13973)">
                <rect x="44" y="13" width="32" height="32" rx="16" transform="rotate(90 44 13)" fill="white" />
                <path d="M26 34L31 29L26 24" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <filter id="filter0_d_5861_13973" x="0" y="0" width="56" height="56" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-1" />
                    <feGaussianBlur stdDeviation="6" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.21 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5861_13973" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5861_13973" result="shape" />
                </filter>
            </defs>
        </svg>
    )
}
export default ScrollCircleRight

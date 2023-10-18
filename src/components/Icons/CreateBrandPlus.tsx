
function CreateBrandPlus({ color, size }: { color?: string, size?: number }) {
    return (
        <svg width={size ? size : "72"} height={size ? size : "72"} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5" clip-path="url(#clip0_5478_17541)">
                <path d="M25.0967 36H47.0673" stroke="#828282" stroke-width="2.51196" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M36.0801 25.0057V46.9943" stroke="#828282" stroke-width="2.51196" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_5478_17541">
                    <rect width="70.3059" height="70.3636" fill="white" transform="translate(0.927734 0.818176)" />
                </clipPath>
            </defs>
        </svg>

    )
}

export default CreateBrandPlus
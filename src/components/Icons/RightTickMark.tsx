
function RightTickMark({ size }: { size?: number }) {
    return (
        <svg width={size ? size : "18"} height={size ? size : "18"} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_5473_16684)">
                <path d="M2.8125 10.125L6.75 14.0625L15.75 5.0625" stroke="#6729F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_5473_16684">
                    <rect width="18" height="18" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default RightTickMark
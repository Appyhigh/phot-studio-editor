
function EclipsePlay() {
    return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_bd_6626_688)">
                <circle cx="32" cy="28" r="28" fill="black" fill-opacity="0.58" shape-rendering="crispEdges" />
                <circle cx="32" cy="28" r="27" stroke="white" stroke-width="2" shape-rendering="crispEdges" />
            </g>
            <defs>
                <filter id="filter0_bd_6626_688" x="-6" y="-10" width="76" height="76" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_6626_688" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect1_backgroundBlur_6626_688" result="effect2_dropShadow_6626_688" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_6626_688" result="shape" />
                </filter>
            </defs>
        </svg>
    )
}

export default EclipsePlay
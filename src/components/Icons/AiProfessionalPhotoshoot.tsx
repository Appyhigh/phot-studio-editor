function AiProfessionalPhotoshoot({ size, color }: { size: any; color: any }) {
    return (
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="19" cy="19" r="19" fill={color} />
            <path d="M11.7275 13.4141V23.9301L13.6749 26.267" stroke={color == '#4E19C6' ? '#FFFFFF' : "#696974"} stroke-width="0.778962" stroke-linecap="round" />
            <path d="M11.7275 13.4141V23.9301L9.78013 26.267" stroke={color == '#4E19C6' ? '#FFFFFF' : "#696974"} stroke-width="0.778962" stroke-linecap="round" />
            <path d="M18.3477 8.24907L12.0418 11.2165L10.5581 13.8131L13.5256 19.748L18.3477 8.24907Z" fill={color == '#4E19C6' ? '#FFFFFF' : "#696974"} />
            <circle cx="11.6709" cy="12.6261" r="1.1128" fill={color} />
            <path d="M28.0837 13.4141V23.9301L26.1363 26.267" stroke={color == '#4E19C6' ? '#FFFFFF' : "#696974"} stroke-width="0.778962" stroke-linecap="round" />
            <path d="M28.0837 13.4141V23.9301L30.0311 26.267" stroke={color == '#4E19C6' ? '#FFFFFF' : "#696974"} stroke-width="0.778962" stroke-linecap="round" />
            <path d="M17.5682 26.6568V19.6461H22.2419V26.6568" stroke={color == '#4E19C6' ? '#FFFFFF' : "#696974"} stroke-width="0.778962" stroke-linecap="round" />
            <path d="M21.4626 8.24921L27.7685 11.2167L29.2522 13.8132L26.2847 19.7482L21.4626 8.24921Z" fill={color == '#4E19C6' ? '#FFFFFF' : "#696974"} />
            <circle cx="1.1128" cy="1.1128" r="1.1128" transform="matrix(-1 0 0 1 29.2522 11.5135)" fill={color == '#4E19C6' ? '#FFFFFF' : "#696974"} />
        </svg>
    )

}

export default AiProfessionalPhotoshoot

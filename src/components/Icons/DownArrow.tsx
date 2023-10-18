function DownArrow({ width, height, color }: { width?: string, height?: string, color?: string }) {
    return (
        <svg width={width ? width : "15"} height={height ? height : "8"} viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.72888 7.72898C7.36751 8.09034 6.78318 8.09034 6.42566 7.72898L0.270925 1.57809C-0.0904398 1.21672 -0.0904398 0.632389 0.270925 0.274868C0.632289 -0.0826521 1.21662 -0.0864964 1.57414 0.274868L7.0715 5.77223L12.5727 0.271024C12.9341 -0.0903406 13.5184 -0.0903406 13.8759 0.271024C14.2334 0.632389 14.2373 1.21672 13.8759 1.57424L7.72888 7.72898Z" fill={color ? color : "#44444F"} />
        </svg>
    )
}

export default DownArrow

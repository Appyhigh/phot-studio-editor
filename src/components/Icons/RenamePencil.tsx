
function RenamePencil({ size }: { size?: number }) {
    return (
        <svg width={size ? size : "20"} height={size ? size : "20"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.6484 5.84219L14.157 2.35078C14.0555 2.24921 13.9349 2.16863 13.8022 2.11366C13.6695 2.05868 13.5272 2.03039 13.3836 2.03039C13.24 2.03039 13.0977 2.05868 12.965 2.11366C12.8323 2.16863 12.7117 2.24921 12.6102 2.35078L2.97656 11.9852C2.87479 12.0866 2.7941 12.2071 2.73912 12.3399C2.68415 12.4726 2.65599 12.6149 2.65625 12.7586V16.25C2.65625 16.5401 2.77149 16.8183 2.9766 17.0234C3.18172 17.2285 3.45992 17.3438 3.75 17.3438H7.24141C7.38508 17.344 7.52739 17.3159 7.66013 17.2609C7.79288 17.2059 7.91343 17.1252 8.01485 17.0234L17.6484 7.38906C17.75 7.2875 17.8306 7.16692 17.8856 7.03421C17.9405 6.9015 17.9688 6.75927 17.9688 6.61562C17.9688 6.47198 17.9405 6.32975 17.8856 6.19704C17.8306 6.06433 17.75 5.94375 17.6484 5.84219ZM7.35156 16.3602C7.3224 16.3895 7.28278 16.4061 7.24141 16.4062H3.75C3.70856 16.4062 3.66882 16.3898 3.63952 16.3605C3.61021 16.3312 3.59375 16.2914 3.59375 16.25V12.7586C3.59393 12.7172 3.6105 12.6776 3.63985 12.6484L10.625 5.6625L14.3367 9.375L7.35156 16.3602ZM16.9852 6.72656L15 8.71172L11.2883 5L13.2734 3.01406C13.288 2.99953 13.3052 2.98801 13.3242 2.98015C13.3431 2.97228 13.3635 2.96824 13.384 2.96824C13.4045 2.96824 13.4249 2.97228 13.4438 2.98015C13.4628 2.98801 13.48 2.99953 13.4945 3.01406L16.9852 6.50547C16.9997 6.51998 17.0112 6.53721 17.0191 6.55618C17.0269 6.57515 17.031 6.59548 17.031 6.61602C17.031 6.63655 17.0269 6.65688 17.0191 6.67585C17.0112 6.69482 16.9997 6.71205 16.9852 6.72656Z" fill="#696974" />
        </svg>
    )
}

export default RenamePencil

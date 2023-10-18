function DownloadSimple({ size }: { size?: number }) {
    return (
        <svg width={size ? size : "20"} height={size ? size : "20"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.3438 11.875V16.25C17.3438 16.5401 17.2285 16.8183 17.0234 17.0234C16.8183 17.2285 16.5401 17.3438 16.25 17.3438H3.75C3.45992 17.3438 3.18172 17.2285 2.9766 17.0234C2.77148 16.8183 2.65625 16.5401 2.65625 16.25V11.875C2.65625 11.7507 2.70564 11.6315 2.79354 11.5435C2.88145 11.4556 3.00068 11.4062 3.125 11.4062C3.24932 11.4062 3.36855 11.4556 3.45646 11.5435C3.54436 11.6315 3.59375 11.7507 3.59375 11.875V16.25C3.59375 16.2914 3.61021 16.3312 3.63951 16.3605C3.66882 16.3898 3.70856 16.4062 3.75 16.4062H16.25C16.2914 16.4062 16.3312 16.3898 16.3605 16.3605C16.3898 16.3312 16.4062 16.2914 16.4062 16.25V11.875C16.4062 11.7507 16.4556 11.6315 16.5435 11.5435C16.6315 11.4556 16.7507 11.4062 16.875 11.4062C16.9993 11.4062 17.1185 11.4556 17.2065 11.5435C17.2944 11.6315 17.3438 11.7507 17.3438 11.875ZM9.66875 12.2063C9.75664 12.294 9.87578 12.3433 10 12.3433C10.1242 12.3433 10.2434 12.294 10.3313 12.2063L13.4563 9.08125C13.5391 8.99239 13.5841 8.87486 13.582 8.75342C13.5798 8.63199 13.5306 8.51612 13.4448 8.43024C13.3589 8.34435 13.243 8.29516 13.1216 8.29302C13.0001 8.29087 12.8826 8.33595 12.7937 8.41875L10.4688 10.743V3.125C10.4688 3.00068 10.4194 2.88145 10.3315 2.79354C10.2435 2.70564 10.1243 2.65625 10 2.65625C9.87568 2.65625 9.75645 2.70564 9.66854 2.79354C9.58064 2.88145 9.53125 3.00068 9.53125 3.125V10.743L7.20625 8.41875C7.11739 8.33595 6.99986 8.29087 6.87842 8.29302C6.75699 8.29516 6.64112 8.34435 6.55524 8.43024C6.46935 8.51612 6.42016 8.63199 6.41802 8.75342C6.41587 8.87486 6.46095 8.99239 6.54375 9.08125L9.66875 12.2063Z" fill="#696974" />
        </svg>
    )
}

export default DownloadSimple
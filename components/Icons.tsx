interface Props {
    width?: number;
    height?: number;
    className?: string;
    strokeWidth?: number;
}

const DefaultProps = {
    width: 20,
    height: 20,
    strokeWidth: 2
};

export const Icons = {
    ArrowBack: ({
        height = DefaultProps.height,
        width = DefaultProps.width,
        strokeWidth = DefaultProps.strokeWidth,
        className
    }: Props) => (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="currentColor"
            className={className}
        >
            <path
                d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    ArrowDown: ({
        height = DefaultProps.height,
        width = DefaultProps.width,
        strokeWidth = DefaultProps.strokeWidth,
        className
    }: Props) => (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="currentColor"
            className={className}
        >
            <path
                d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    Eye: ({ className }: Props) => (
        <svg
            width="20"
            height="17"
            viewBox="0 0 20 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M3.59484 0.176057C3.50496 0.0705051 3.37949 0.00739455 3.24602 0.000609393C3.11255 -0.00617576 2.98203 0.0439201 2.88316 0.139877C2.78429 0.235833 2.72517 0.36979 2.71882 0.512279C2.71246 0.654767 2.75939 0.794115 2.84927 0.899667L4.61153 2.98005C1.45979 4.96093 0.104202 8.13577 0.0448949 8.28049C0.0153211 8.3485 0 8.42259 0 8.49757C0 8.57256 0.0153211 8.64664 0.0448949 8.71465C0.0787846 8.78701 0.781996 10.4604 2.35787 12.1337C3.93374 13.8071 6.32297 15.5528 10 15.5528C11.5375 15.5626 13.0584 15.2138 14.4565 14.5307L16.4052 16.8191C16.4518 16.8756 16.5091 16.921 16.5734 16.9522C16.6377 16.9833 16.7074 16.9996 16.7779 17C16.9043 17.0009 17.026 16.949 17.1168 16.8553C17.1673 16.8088 17.2083 16.7518 17.2375 16.6878C17.2667 16.6238 17.2834 16.5542 17.2865 16.4831C17.2897 16.4121 17.2793 16.341 17.256 16.2744C17.2326 16.2078 17.1968 16.1469 17.1507 16.0955L3.59484 0.176057ZM7.72092 6.62523L11.5335 11.1026C10.9612 11.4835 10.2819 11.6379 9.61396 11.5391C8.94598 11.4402 8.33165 11.0943 7.87802 10.5616C7.42439 10.0288 7.16021 9.34308 7.1315 8.62378C7.10279 7.90448 7.31138 7.19722 7.72092 6.62523ZM10 14.4674C7.33966 14.4674 5.01821 13.4362 3.10344 11.4011C2.29604 10.547 1.61345 9.56823 1.07853 8.49757C1.44285 7.75587 2.78149 5.31369 5.31475 3.80315L7.02618 5.81117C6.41824 6.58181 6.09287 7.56178 6.1105 8.56914C6.12812 9.5765 6.48753 10.5428 7.122 11.2887C7.75647 12.0345 8.6229 12.5093 9.56042 12.6248C10.4979 12.7403 11.4429 12.4886 12.2198 11.9166L13.7279 13.6895C12.5462 14.2115 11.2788 14.476 10 14.4674ZM19.9551 8.71465C19.9212 8.8051 19.074 10.795 17.1677 12.6221C17.0741 12.7102 16.9535 12.7585 16.8288 12.7578C16.757 12.7571 16.6862 12.7406 16.6206 12.7095C16.555 12.6784 16.4961 12.6333 16.4475 12.5769C16.4028 12.5236 16.3684 12.4613 16.3463 12.3937C16.3242 12.3261 16.3149 12.2546 16.3188 12.1831C16.3228 12.1116 16.3399 12.0417 16.3693 11.9773C16.3986 11.913 16.4396 11.8555 16.4899 11.8081C17.4747 10.8641 18.2976 9.74376 18.9215 8.49757C18.3866 7.42691 17.704 6.44816 16.8966 5.59409C14.9818 3.55893 12.6603 2.52779 10 2.52779C9.44081 2.52542 8.88244 2.57384 8.33093 2.67251C8.20308 2.68554 8.07535 2.64643 7.97341 2.56303C7.87148 2.47963 7.80288 2.35813 7.78142 2.22295C7.75996 2.08777 7.78722 1.94893 7.85773 1.83432C7.92823 1.71972 8.03675 1.63786 8.16148 1.60519C8.76892 1.49561 9.38396 1.44115 10 1.44237C13.677 1.44237 16.1849 3.29663 17.6421 4.86143C19.0994 6.42624 19.9212 8.20813 19.9551 8.28049C19.9847 8.3485 20 8.42259 20 8.49757C20 8.57256 19.9847 8.64664 19.9551 8.71465ZM10.5422 5.4765C10.4097 5.45011 10.2923 5.36858 10.2161 5.24984C10.1398 5.1311 10.1108 4.98488 10.1356 4.84334C10.1603 4.7018 10.2366 4.57655 10.3479 4.49513C10.4591 4.4137 10.5961 4.38279 10.7286 4.40918C11.5574 4.58053 12.3121 5.03334 12.88 5.70004C13.448 6.36674 13.7989 7.21161 13.8804 8.10863C13.8922 8.25124 13.8507 8.39305 13.765 8.50317C13.6793 8.61329 13.5563 8.6828 13.4229 8.69656H13.372C13.2465 8.69705 13.1254 8.64707 13.0327 8.55657C12.9401 8.46608 12.8828 8.34168 12.8722 8.20813C12.812 7.54531 12.5526 6.92106 12.1327 6.4287C11.7127 5.93633 11.1548 5.60229 10.5422 5.4765Z"
                fill="url(#paint0_linear_11_3013)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_11_3013"
                    x1="-3.5"
                    y1="14"
                    x2="24.6814"
                    y2="4.54055"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0.0237305" stopColor="#94783E" />
                    <stop offset="0.216904" stopColor="#F3EDA6" />
                    <stop offset="0.329505" stopColor="#F8FAE5" />
                    <stop offset="0.486109" stopColor="#FFE2BE" />
                    <stop offset="0.723574" stopColor="#D5BE88" />
                    <stop offset="0.809185" stopColor="#F8FAE5" />
                    <stop offset="0.902849" stopColor="#D5BE88" />
                </linearGradient>
            </defs>
        </svg>
    ),
    Edit: ({
        height = DefaultProps.height,
        width = DefaultProps.width,
        strokeWidth = DefaultProps.strokeWidth,
        className
    }: Props) => (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="currentColor"
            className={className}
        >
            <path
                d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
            />
            <path
                d="M13 4L20 11"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
            />
            <path
                d="M14 22L22 22"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    Add: ({
        height = DefaultProps.height,
        width = DefaultProps.width,
        strokeWidth = DefaultProps.strokeWidth,
        className
    }: Props) => (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="currentColor"
            className={className}
        >
            <path
                d="M12 4V20M20 12H4"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    X: ({
        height = DefaultProps.height,
        width = DefaultProps.width,
        strokeWidth = DefaultProps.strokeWidth,
        className
    }: Props) => (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="currentColor"
            className={className}
        >
            <path
                d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    More: ({
        height = DefaultProps.height,
        width = DefaultProps.width,
        strokeWidth = DefaultProps.strokeWidth,
        className
    }: Props) => (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="currentColor"
            className={className}
        >
            <rect
                x="18"
                y="10.5"
                width="3"
                height="3"
                rx="1"
                stroke="currentColor"
                strokeWidth={strokeWidth}
            />
            <rect
                x="10.5"
                y="10.5"
                width="3"
                height="3"
                rx="1"
                stroke="currentColor"
                strokeWidth={strokeWidth}
            />
            <rect
                x="3"
                y="10.5"
                width="3"
                height="3"
                rx="1"
                stroke="currentColor"
                strokeWidth={strokeWidth}
            />
        </svg>
    )
};

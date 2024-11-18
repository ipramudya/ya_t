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
    EyeClosed: ({
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
            className={className}
        >
            <path
                d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
            <path
                d="M3 3L21 21"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    EyeOpen: ({
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
                d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                stroke="currentColor"
                strokeWidth={strokeWidth}
            />
            <path
                d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                stroke="currentColor"
                strokeWidth={strokeWidth}
            />
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
                stroke-linecap="round"
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
                stroke-width={strokeWidth}
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

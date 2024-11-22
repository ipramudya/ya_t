import { cn } from "@/lib";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function MainButton(props: Props) {
    return (
        <button
            className={cn(
                "flex h-12 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r",
                props.disabled
                    ? "cursor-not-allowed from-[rgb(98,205,203)] to-[rgb(69,153,219)] opacity-30"
                    : "from-[rgba(98,205,203,1)] to-[rgba(69,153,219,1)] shadow-2xl shadow-[rgba(98,205,203,0.5)]",
                props.className
            )}
            {...props}
        >
            <span className="text-base font-semibold">{props.children}</span>
        </button>
    );
}

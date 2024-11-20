import type { ComponentType, PropsWithChildren, ReactNode } from "react";

interface ConditionalWrapperProps extends PropsWithChildren {
    condition: boolean;
    Wrapper: ComponentType<{ children: ReactNode }>;
}
export function ConditionalWrapper({
    Wrapper,
    condition,
    children
}: ConditionalWrapperProps) {
    return condition ? <Wrapper>{children}</Wrapper> : children;
}

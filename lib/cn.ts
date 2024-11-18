import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges multiple class names into a single string. This is useful for
 * conditionally applying classes based on props or state.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

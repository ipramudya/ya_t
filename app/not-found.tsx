import { AppContainer, MainButton } from "@/components";
import Link from "next/link";

export default function NotFound() {
    return (
        <AppContainer inputPage>
            <div className="flex min-h-[calc(100dvh-5rem)] flex-col items-center justify-center">
                <h1 className="golden-text mb-4 text-6xl font-bold">404</h1>
                <h2 className="mb-8 text-2xl font-semibold">Page Not Found</h2>
                <p className="mb-12 text-center text-subtitle">
                    The page you are looking for does not exist or has been
                    moved.
                </p>
                <Link href="/" className="w-full max-w-[200px]">
                    <MainButton className="w-full">Go Home</MainButton>
                </Link>
            </div>
        </AppContainer>
    );
}

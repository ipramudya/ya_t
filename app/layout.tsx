import "./globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { type PropsWithChildren } from "react";
import { JotaiProvider } from "@/components";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "YouApp Project",
    description: "Frontend assessment project for YouApp"
};

const inter = Inter({
    subsets: ["latin"],
    display: "swap"
});

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Toaster richColors position="top-right" />
                <JotaiProvider>{children}</JotaiProvider>
            </body>
        </html>
    );
}

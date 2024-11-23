"use client";

import { useUser } from "@/hooks/useUser";
import { Box } from "./Box";
import { EditButton } from "./EditButton";

export function BannerProfile() {
    const { user } = useUser();

    return (
        <Box className="mb-6 flex min-h-[190px] items-end overflow-hidden bg-brand-700">
            <h3 className="relative z-10 font-semibold">@{user?.username || "johndoe123"},</h3>
            <EditButton className="absolute right-3 top-3 z-10" />
            {user && user.profileURL && (
                <div className="absolute left-0 top-0 h-full w-full">
                    <div className="absolute inset-0 z-[1] bg-black/40"></div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={user.profileURL}
                        alt="user-profile"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
            )}
        </Box>
    );
}

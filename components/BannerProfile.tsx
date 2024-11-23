/* eslint-disable @next/next/no-img-element */

"use client";

import { useUser } from "@/hooks/useUser";
import { calculateAge } from "@/lib";
import { calculateZodiac } from "@/lib/zodiac";
import { useMemo } from "react";
import { Box } from "./Box";

export function BannerProfile() {
    const { user } = useUser();

    return (
        <Box className="mb-6 flex min-h-[190px] items-end overflow-hidden bg-brand-700">
            {!user ? (
                <h3 className="relative z-10 font-semibold">@johndoe123,</h3>
            ) : (
                <div className="relative z-10 flex flex-col">
                    <h3 className="mb-1 ml-4 font-bold">{`@${user.username}, ${calculateAge(user.birthday)}`}</h3>
                    <p className="mb-3 ml-4 text-sm font-semibold capitalize">{user.gender}</p>
                    <ZodiacAndHoroscope birthday={user.birthday} />
                </div>
            )}

            {user && user.profileURL && (
                <div className="absolute left-0 top-0 h-full w-full">
                    <div className="absolute inset-0 z-[1] bg-black/40"></div>
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

function ZodiacAndHoroscope({ birthday }: { birthday: Date }) {
    const { horoscope, zodiac } = useMemo(() => {
        return calculateZodiac(birthday.toISOString());
    }, [birthday]);

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full bg-[#121615] px-4 py-2">
                <p className="text-sm font-semibold capitalize text-white">{horoscope}</p>
            </div>
            <div className="flex items-center justify-center rounded-full bg-[#121615] px-4 py-2">
                <p className="text-sm font-semibold capitalize text-white">{zodiac}</p>
            </div>
        </div>
    );
}

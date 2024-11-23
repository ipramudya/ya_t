/* eslint-disable @next/next/no-img-element */

"use client";

import { useMemo } from "react";
import { useUser } from "@/hooks/useUser";
import { calculateAge, calculateZodiac } from "@/lib";
import { Box } from "./Box";
import { ZodiacHoroscopeIcons } from "./ZodiacHoroscopeIcons";

interface CalculatedBirthday {
    age: string;
    horoscope: string;
    zodiac: string;
}

const DEFAULT_CALCULATED_DATA: CalculatedBirthday = {
    age: "N/A",
    horoscope: "N/A",
    zodiac: "N/A"
};

export function BannerProfile() {
    const { user } = useUser();

    const calculatedBirthday = useMemo<CalculatedBirthday>(() => {
        if (!user?.birthday) return DEFAULT_CALCULATED_DATA;

        const birthday = new Date(user.birthday);
        const age = calculateAge(birthday);
        const { horoscope, zodiac } = calculateZodiac(birthday.toISOString());

        return {
            age: age.toString(),
            horoscope,
            zodiac
        };
    }, [user?.birthday]);

    return (
        <Box className="mb-6 flex min-h-[190px] items-end overflow-hidden bg-brand-700">
            {!user ? (
                <h3 className="relative z-10 font-semibold">@johndoe123,</h3>
            ) : (
                <div className="relative z-10 flex flex-col">
                    <h3 className="mb-1 ml-4 font-bold">
                        @{user.username}, {calculatedBirthday.age}
                    </h3>
                    <p className="mb-3 ml-4 text-sm font-semibold capitalize">{user.gender}</p>
                    <ZodiacAndHoroscope
                        zodiac={calculatedBirthday.zodiac}
                        horoscope={calculatedBirthday.horoscope}
                    />
                </div>
            )}

            {user?.profileURL && (
                <div className="absolute left-0 top-0 h-full w-full">
                    <div className="absolute inset-0 z-[1] bg-black/40" />
                    <img
                        src={user.profileURL}
                        alt={`${user.username}'s profile`}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
            )}
        </Box>
    );
}

interface ZodiacHoroscopeProps {
    zodiac: string;
    horoscope: string;
}

function ZodiacAndHoroscope({ horoscope, zodiac }: ZodiacHoroscopeProps) {
    const zodiacIcon = ZodiacHoroscopeIcons[zodiac as keyof typeof ZodiacHoroscopeIcons] || "";
    const horoscopeIcon =
        ZodiacHoroscopeIcons[horoscope as keyof typeof ZodiacHoroscopeIcons] || "";

    return (
        <div className="flex items-center gap-2">
            {[
                { icon: horoscopeIcon, label: horoscope },
                { icon: zodiacIcon, label: zodiac }
            ].map(({ icon, label }) => (
                <div
                    key={label}
                    className="flex items-center justify-center rounded-full bg-[#121615] px-4 py-2"
                >
                    <span className="mr-2 text-white">{icon}</span>
                    <p className="text-sm font-semibold capitalize text-white">{label}</p>
                </div>
            ))}
        </div>
    );
}

"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { Box } from "./Box";
import { EditButton } from "./EditButton";

export function InterestSection() {
    const router = useRouter();
    const { user } = useUser();

    function handleNavigateToInterest() {
        router.push("/interest");
    }

    return (
        <Box className="flex min-h-[120px] flex-col justify-center gap-8 bg-brand-800">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Interest</h3>
                <EditButton onClick={handleNavigateToInterest} />
            </div>
            {!user || user.interests.length === 0 ? (
                <p className="text-sm text-subtitle">Add in your interest to find a better match</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest) => (
                        <InterestItem key={`interest-${interest}`} interest={interest} />
                    ))}
                </div>
            )}
        </Box>
    );
}

function InterestItem({ interest }: { interest: string }) {
    return (
        <div className="flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)] px-4 py-2">
            <p className="text-sm font-semibold capitalize text-white">{interest}</p>
        </div>
    );
}

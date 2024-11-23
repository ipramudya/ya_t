"use client";

import { useRouter } from "next/navigation";
import { Box } from "./Box";
import { EditButton } from "./EditButton";

export function InterestSection() {
    const router = useRouter();

    function handleNavigateToInterest() {
        router.push("/interest");
    }

    return (
        <Box className="flex min-h-[120px] flex-col justify-center gap-8 bg-brand-800">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Interest</h3>
                <EditButton onClick={handleNavigateToInterest} />
            </div>
            <p className="text-sm text-subtitle">Add in your interest to find a better match</p>
        </Box>
    );
}

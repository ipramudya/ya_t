"use client";

import { api } from "@/api";
import { AppContainer, Box, Header } from "@/components";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState, type KeyboardEvent } from "react";
import { toast } from "sonner";

export default function Page() {
    const { user, updateUser } = useUser();
    const [interests, setInterests] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();

            // Prevent duplicate entries
            if (!interests.includes(inputValue.trim())) {
                setInterests([...interests, inputValue.trim()]);
            }
            setInputValue("");
        }
    }

    function removeInterest(indexToRemove: number) {
        setInterests(
            interests.filter(function (_, index) {
                return index !== indexToRemove;
            })
        );
    }

    async function handleSave() {
        setIsSubmitting(true);

        try {
            const response = await api.profileService.addInterests(interests);
            toast.success(response.message);

            // Update the user context
            updateUser(response.data);
        } catch (error) {
            console.log("error saving interests:", error);
            toast.error("failed to save your interests");
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }

    useEffect(() => {
        if (user && user.interests.length > 0) {
            setInterests(user.interests);
        }
    }, [user]);

    return (
        <AppContainer inputPage>
            <Header>
                <button
                    className="blue-gradient-text size-fit text-sm font-semibold disabled:opacity-50"
                    onClick={handleSave}
                    disabled={isSubmitting}
                >
                    Save
                </button>
            </Header>
            <div className="mt-10 flex flex-col">
                <h3 className="golden-text mb-3 text-sm font-bold">Tell everyone about yourself</h3>
                <h2 className="text-xl font-bold">What interest you?</h2>
                <p className="text-sm text-[rgba(255,255,255,0.33)]">
                    Please only add unique interests. Press enter to add interest to the list.
                </p>
                <Box className="mt-9 min-h-12 bg-white-input">
                    <div className="flex flex-wrap gap-2">
                        {interests.map(function (interest, index) {
                            return (
                                <div
                                    key={`interest-${index}`}
                                    className="flex h-[31px] items-center justify-center gap-2 rounded bg-white/10 px-2"
                                >
                                    <span className="text-sm">{interest}</span>
                                    <button
                                        onClick={() => removeInterest(index)}
                                        className="text-sm hover:text-white/50"
                                    >
                                        <span className="text-base">×</span>
                                    </button>
                                </div>
                            );
                        })}
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/60"
                        />
                    </div>
                </Box>
            </div>
        </AppContainer>
    );
}

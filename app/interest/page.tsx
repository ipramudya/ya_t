"use client";

import { AppContainer, Box, Header } from "@/components";
import { useState, type KeyboardEvent } from "react";

export default function Page() {
    const [interests, setInterests] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
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

    function handleSave() {
        // Handle saving interests
        console.log("Saved interests:", interests);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }

    return (
        <AppContainer inputPage>
            <Header>
                <button
                    className="blue-gradient-text size-fit text-sm font-semibold"
                    onClick={handleSave}
                >
                    Save
                </button>
            </Header>
            <div className="mt-10 flex flex-col">
                <h3 className="golden-text mb-3 text-sm font-bold">
                    Tell everyone about yourself
                </h3>
                <h2 className="mb-9 text-xl font-bold">What interest you?</h2>
                <Box className="min-h-12 bg-white-input">
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

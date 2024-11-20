"use client";

import { atom, useAtom, useSetAtom } from "jotai";
import { PropsWithChildren } from "react";
import { Box } from "./Box";
import { ConditionalWrapper } from "./ConditionalWrapper";
import { EditButton } from "./EditButton";
import { Icons } from "./Icons";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";

const isEditedAtom = atom(false);

export function EditProfileSection() {
    const [isEdited, setIsEdited] = useAtom(isEditedAtom);

    function handleEditStateChanged() {
        setIsEdited((state) => !state);
    }

    return (
        <Box className="mb-6 flex min-h-[120px] flex-col justify-center gap-8 bg-brand-800 pb-8">
            <ConditionalWrapper
                condition={isEdited}
                Wrapper={({ children }) => <Form>{children}</Form>}
            >
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">About</h3>
                    {isEdited ? (
                        <SaveAndUpdateButton />
                    ) : (
                        <EditButton onClick={handleEditStateChanged} />
                    )}
                </div>
                {!isEdited && <Section />}
            </ConditionalWrapper>
        </Box>
    );
}

const hasData = true;

function Section() {
    // TODO: get data if exists

    return hasData ? (
        <div className="flex flex-col gap-3">
            <p className="text-sm">
                <span className="text-[rgba(255,255,255,0.33)]">Birthday:</span>
                <span className="text-white"> 28 / 08 / 1995 (Age 28)</span>
            </p>
            <p className="text-sm">
                <span className="text-[rgba(255,255,255,0.33)]">
                    Horoscope:
                </span>
                <span className="text-white"> Virgo</span>
            </p>
            <p className="text-sm">
                <span className="text-[rgba(255,255,255,0.33)]">Zodiac:</span>
                <span className="text-white"> Pig</span>
            </p>
            <p className="text-sm">
                <span className="text-[rgba(255,255,255,0.33)]">Height:</span>
                <span className="text-white"> 172 cm</span>
            </p>
            <p className="text-sm">
                <span className="text-[rgba(255,255,255,0.33)]">Weight:</span>
                <span className="text-white"> 60 kg</span>
            </p>
        </div>
    ) : (
        <p className="text-sm text-subtitle">
            Add in your your to help others know you better
        </p>
    );
}

function Form({ children }: PropsWithChildren) {
    return (
        <form action="">
            {children}

            <div className="mt-8 flex flex-col">
                <div className="flex items-center gap-4">
                    <button className="flex size-[57px] items-center justify-center rounded-[17px] bg-[rgba(255,255,255,0.08)]">
                        <Icons.Add width={24} height={24} />
                    </button>
                    <span className="text-sm">Add image</span>
                </div>
                <div className="mt-8 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                        <label
                            htmlFor="name"
                            className="shrink-0 text-sm text-[rgba(255,255,255,0.33)]"
                        >
                            Display name:
                        </label>
                        <InputField
                            dimmension="sm"
                            color="outlined"
                            id="name"
                            placeholder="Enter name"
                            className="max-w-[200px]"
                        />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <label
                            htmlFor="gender"
                            className="shrink-0 text-sm text-[rgba(255,255,255,0.33)]"
                        >
                            Gender:
                        </label>
                        <SelectField id="gender" className="max-w-[200px]">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </SelectField>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <label
                            htmlFor="birthday"
                            className="shrink-0 text-sm text-[rgba(255,255,255,0.33)]"
                        >
                            Birthday:
                        </label>
                        <InputField
                            type="date"
                            dimmension="sm"
                            color="outlined"
                            id="birthday"
                            className="max-w-[200px]"
                        />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <label
                            htmlFor="horoscope"
                            className="shrink-0 text-sm text-[rgba(255,255,255,0.33)]"
                        >
                            Horoscrope:
                        </label>
                        <InputField
                            dimmension="sm"
                            color="outlined"
                            id="horoscope"
                            placeholder="--"
                            className="max-w-[200px]"
                        />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <label
                            htmlFor="zodiac"
                            className="shrink-0 text-sm text-[rgba(255,255,255,0.33)]"
                        >
                            Zodiac:
                        </label>
                        <InputField
                            dimmension="sm"
                            color="outlined"
                            id="zodiac"
                            placeholder="--"
                            className="max-w-[200px]"
                        />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <label
                            htmlFor="height"
                            className="shrink-0 text-sm text-[rgba(255,255,255,0.33)]"
                        >
                            Height:
                        </label>
                        <InputField
                            dimmension="sm"
                            color="outlined"
                            id="height"
                            placeholder="Add height"
                            className="max-w-[200px]"
                        />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <label
                            htmlFor="weight"
                            className="shrink-0 text-sm text-[rgba(255,255,255,0.33)]"
                        >
                            Weight:
                        </label>
                        <InputField
                            dimmension="sm"
                            color="outlined"
                            id="weight"
                            placeholder="Add weight"
                            className="max-w-[200px]"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

function SaveAndUpdateButton() {
    const setIsEdited = useSetAtom(isEditedAtom);

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setIsEdited((state) => !state);
    }

    return (
        <button className="size-fit" type="submit" onClick={handleSubmit}>
            <span className="golden-text text-sm">Save & Update</span>
        </button>
    );
}

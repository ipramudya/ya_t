/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { atom, useAtom, useSetAtom } from "jotai";
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { Box } from "./Box";
import { ConditionalWrapper } from "./ConditionalWrapper";
import { EditButton } from "./EditButton";
import { Icons } from "./Icons";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";

interface ProfileFormData {
    name: string;
    gender: "male" | "female";
    birthday: string;
    horoscope: string;
    zodiac: string;
    height: string;
    weight: string;
}

const PROFILE_FIELDS = [
    {
        id: "name",
        label: "Display name:",
        type: "text",
        placeholder: "Enter name",
        validation: { required: "Name is required" }
    },
    {
        id: "gender",
        label: "Gender:",
        type: "select",
        options: ["Male", "Female"],
        validation: { required: "Gender is required" }
    },
    {
        id: "birthday",
        label: "Birthday:",
        type: "date",
        validation: { required: "Birthday is required" }
    },
    {
        id: "horoscope",
        label: "Horoscope:",
        type: "text",
        placeholder: "--",
        readOnly: true
    },
    {
        id: "zodiac",
        label: "Zodiac:",
        type: "text",
        placeholder: "--",
        readOnly: true
    },
    {
        id: "height",
        label: "Height:",
        type: "text",
        placeholder: "Add height",
        validation: {
            required: "Height is required",
            pattern: {
                value: /^\d+$/,
                message: "Please enter a valid number"
            }
        }
    },
    {
        id: "weight",
        label: "Weight:",
        type: "text",
        placeholder: "Add weight",
        validation: {
            required: "Weight is required",
            pattern: {
                value: /^\d+$/,
                message: "Please enter a valid number"
            }
        }
    }
];

const MOCK_PROFILE_DATA = {
    birthday: "28 / 08 / 1995",
    age: 28,
    horoscope: "Virgo",
    zodiac: "Pig",
    height: "172 cm",
    weight: "60 kg"
};

const isEditedAtom = atom(false);

export function EditProfileSection() {
    const [isEdited, setIsEdited] = useAtom(isEditedAtom);
    const handleEditStateChanged = () => setIsEdited((prev) => !prev);

    return (
        <Box className="mb-6 flex min-h-[120px] flex-col justify-center gap-8 bg-brand-800 pb-8">
            <ConditionalWrapper condition={isEdited} Wrapper={ProfileForm}>
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">About</h3>
                    {isEdited ? (
                        <SaveAndUpdateButton />
                    ) : (
                        <EditButton onClick={handleEditStateChanged} />
                    )}
                </div>
                {!isEdited && <ProfileSection />}
            </ConditionalWrapper>
        </Box>
    );
}

const hasData = true; // TODO: Replace with actual data check
function ProfileSection() {
    if (!hasData) {
        return (
            <p className="text-sm text-subtitle">
                Add in your your to help others know you better
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {Object.entries(MOCK_PROFILE_DATA).map(([key, value]) => (
                <p key={key} className="text-sm">
                    <span className="text-[rgba(255,255,255,0.33)]">{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</span>
                    <span className="text-white">{` ${value}`}</span>
                </p>
            ))}
        </div>
    );
}

function ProfileForm({ children }: PropsWithChildren) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ProfileFormData>({
        defaultValues: {
            name: "",
            gender: "male",
            birthday: "",
            horoscope: "",
            zodiac: "",
            height: "",
            weight: ""
        }
    });

    const setIsEdited = useSetAtom(isEditedAtom);

    const onSubmit = handleSubmit(async (data) => {
        try {
            // TODO: Handle form submission
            console.log(data);
            setIsEdited(false);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    });

    return (
        <form onSubmit={onSubmit}>
            {children}
            <div className="mt-8 flex flex-col">
                <ImageUploadButton />
                <div className="mt-8 flex flex-col gap-3">
                    {PROFILE_FIELDS.map((field) => (
                        <FormField
                            key={field.id}
                            {...field}
                            register={register}
                            error={errors[field.id as keyof ProfileFormData]}
                        />
                    ))}
                </div>
            </div>
        </form>
    );
}

function ImageUploadButton() {
    return (
        <div className="flex items-center gap-4">
            <button
                type="button"
                className="flex size-[57px] items-center justify-center rounded-[17px] bg-[rgba(255,255,255,0.08)]"
            >
                <Icons.Add width={24} height={24} />
            </button>
            <span className="text-sm">Add image</span>
        </div>
    );
}

function FormField({
    id,
    label,
    type,
    placeholder,
    options,
    validation,
    register,
    error,
    readOnly
}: any) {
    const commonProps = {
        id,
        className: "max-w-[200px]",
        dimmension: "sm",
        color: "outlined",
        readOnly,
        ...register(id, validation)
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between gap-3">
                <label
                    htmlFor={id}
                    className="shrink-0 text-sm text-[rgba(255,255,255,0.33)]"
                >
                    {label}
                </label>
                {type === "select" ? (
                    <SelectField {...commonProps}>
                        {options?.map((option: string) => (
                            <option
                                key={option.toLowerCase()}
                                value={option.toLowerCase()}
                            >
                                {option}
                            </option>
                        ))}
                    </SelectField>
                ) : (
                    <InputField
                        {...commonProps}
                        type={type}
                        placeholder={placeholder}
                    />
                )}
            </div>
            {error && (
                <span className="mt-1 text-xs text-red-500">
                    {error.message as string}
                </span>
            )}
        </div>
    );
}

function SaveAndUpdateButton() {
    return (
        <button className="size-fit" type="submit">
            <span className="golden-text text-sm">Save & Update</span>
        </button>
    );
}

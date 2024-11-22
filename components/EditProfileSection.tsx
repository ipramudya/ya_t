/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { atom, useAtom, useSetAtom } from "jotai";
import { PropsWithChildren, useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Box } from "./Box";
import { ConditionalWrapper } from "./ConditionalWrapper";
import { EditButton } from "./EditButton";
import { Icons } from "./Icons";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { calculateZodiac } from "@/lib/zodiac";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFieldConfig, profileSchema } from "@/lib/validations/profileSchema";
import { ProfileFormInputs } from "@/types/profile";
import { cn } from "@/lib";
import { useAuth } from "@/hooks/useAuth";

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
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const form = useForm<ProfileFormInputs>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            gender: "male",
            birthday: "",
            horoscope: "",
            zodiac: "",
            height: "",
            weight: "",
            profileImage: undefined
        }
    });
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = form;

    const setIsEdited = useSetAtom(isEditedAtom);

    const onSubmit = handleSubmit(async (data) => {
        try {
            const formData = new FormData();

            // Add all form fields
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value as string);
                }
            });

            // Add file separately if it exists
            if (selectedFile) {
                formData.append("profileImage", selectedFile);
            }

            console.log(
                "FormData entries:",
                Object.fromEntries(formData.entries())
            );
            setIsEdited(false);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    });

    const birthday = watch("birthday");

    useEffect(() => {
        if (birthday) {
            try {
                const { horoscope, zodiac } = calculateZodiac(birthday);
                setValue("horoscope", horoscope);
                setValue("zodiac", zodiac);
            } catch (error) {
                toast.error(
                    `"error calculating zodiac, ${(error as Error).message}"`
                );
            }
        }
    }, [birthday, setValue]);

    return (
        <FormProvider {...form}>
            <form onSubmit={onSubmit}>
                {children}
                <div className="mt-8 flex flex-col">
                    <ImageUploadButton onFileSelect={setSelectedFile} />
                    <div className="mt-8 flex flex-col gap-3">
                        {Object.keys(profileSchema.shape).map((fieldName) => (
                            <FormField
                                key={fieldName}
                                id={fieldName}
                                {...getFieldConfig(
                                    fieldName as keyof ProfileFormInputs
                                )}
                                register={register}
                                error={
                                    errors[fieldName as keyof ProfileFormInputs]
                                }
                            />
                        ))}
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}

function ImageUploadButton({
    onFileSelect
}: {
    onFileSelect: (file: File | null) => void;
}) {
    const { watch } = useFormContext<ProfileFormInputs>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files);
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const selectedImage = watch("profileImage");

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <div className="flex items-center gap-4">
            <div className="flex size-[57px] items-center justify-center rounded-[17px] bg-[rgba(255,255,255,0.08)]">
                {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full w-full rounded-[17px] object-cover"
                    />
                ) : (
                    <Icons.Add width={24} height={24} />
                )}
            </div>
            <label htmlFor="profileImage" className="cursor-pointer text-sm">
                {selectedImage ? "Change image" : "Add image"}
            </label>
            <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
            />
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
    const {
        formState: { isSubmitting, isValid }
    } = useFormContext<ProfileFormInputs>();

    return (
        <button
            className="size-fit"
            type="submit"
            disabled={isSubmitting || !isValid}
        >
            <span
                className={cn(
                    "golden-text text-sm",
                    isSubmitting ||
                        (!isValid && "cursor-not-allowed opacity-50")
                )}
            >
                Save & Update
            </span>
        </button>
    );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { api } from "@/api";
import { useUser } from "@/hooks/useUser";
import { calculateAge, cn, formatDate } from "@/lib";
import { getFieldConfig, profileSchema } from "@/lib/validations/profileSchema";
import { calculateZodiac } from "@/lib/zodiac";
import { ProfileFormInputs } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { PropsWithChildren, useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { Box } from "./Box";
import { ConditionalWrapper } from "./ConditionalWrapper";
import { EditButton } from "./EditButton";
import { Icons } from "./Icons";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";

const isEditedAtom = atom(false);
const isSubmittingAtom = atom(false);

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

function ProfileSection() {
    const { user } = useUser();

    if (!user) {
        return (
            <p className="text-sm text-subtitle">Add in your your to help others know you better</p>
        );
    }

    const birthday = new Date(user.birthday);
    const { horoscope, zodiac } = calculateZodiac(birthday.toISOString());

    const profileData = {
        birthday: formatDate(birthday),
        age: calculateAge(birthday),
        horoscope: horoscope || "N/A",
        zodiac: zodiac || "N/A",
        height: user.height ? `${user.height} cm` : "N/A",
        weight: user.weight ? `${user.weight} kg` : "N/A"
    };

    return (
        <div className="flex flex-col gap-3">
            {Object.entries(profileData).map(([key, value]) => (
                <p key={key} className="text-sm">
                    <span className="text-[rgba(255,255,255,0.33)]">
                        {`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
                    </span>
                    <span className="text-white">{` ${value}`}</span>
                </p>
            ))}
        </div>
    );
}

function ProfileForm({ children }: PropsWithChildren) {
    const { user, updateUser } = useUser();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const setIsSubmitting = useSetAtom(isSubmittingAtom);
    const setIsEdited = useSetAtom(isEditedAtom);

    // Calculate initial horoscope and zodiac if birthday exists
    const initialBirthday = user?.birthday
        ? new Date(user.birthday).toISOString().split("T")[0]
        : "";
    const initialZodiacValues = initialBirthday
        ? calculateZodiac(initialBirthday)
        : { horoscope: "", zodiac: "" };

    const [derivedValues, setDerivedValues] = useState(initialZodiacValues);

    const form = useForm<ProfileFormInputs>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            displayName: user?.displayName || "",
            gender: user?.gender || "male",
            height: user?.height?.toString() || "",
            weight: user?.weight?.toString() || "",
            birthday: initialBirthday,
            horoscope: initialZodiacValues.horoscope,
            zodiac: initialZodiacValues.zodiac,
            profileImage: undefined
        }
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = form;

    const birthday = watch("birthday");

    useEffect(() => {
        if (birthday) {
            try {
                const values = calculateZodiac(birthday);
                setDerivedValues(values);
            } catch (error) {
                toast.error(`Error calculating zodiac: ${(error as Error).message}`);
            }
        }
    }, [birthday]);

    const onSubmit = handleSubmit(async (data) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();

            // Add all form fields
            Object.entries(data).forEach(([key, value]) => {
                if (
                    value !== undefined &&
                    value !== null &&
                    !["horoscope", "zodiac"].includes(key)
                ) {
                    formData.append(key, value as string);
                }
            });

            // Add file separately if it exists
            if (selectedFile) {
                formData.append("profileImage", selectedFile);
            }

            const response = await api.profileService.upsertProfile(formData);
            toast.success(response.message);

            // Update the user context
            updateUser(response.data);

            setIsEdited(false);
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Failed to update profile");
        } finally {
            setIsSubmitting(false);
        }
    });

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
                                {...getFieldConfig(fieldName as keyof ProfileFormInputs)}
                                value={
                                    fieldName === "horoscope" || fieldName === "zodiac"
                                        ? derivedValues[fieldName]
                                        : undefined
                                }
                                readOnly={fieldName === "horoscope" || fieldName === "zodiac"}
                                register={register}
                                error={errors[fieldName as keyof typeof errors]}
                            />
                        ))}
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}

function ImageUploadButton({ onFileSelect }: { onFileSelect: (file: File | null) => void }) {
    const { user } = useUser();
    const [previewUrl, setPreviewUrl] = useState<string | null>(user?.profileURL || null);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
            // Revoke previous object URL if it exists
            if (previewUrl && !previewUrl.includes("http")) {
                URL.revokeObjectURL(previewUrl);
            }
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl && !previewUrl.includes("http")) {
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
                {previewUrl ? "Change image" : "Add image"}
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
    error,
    readOnly,
    value
}: any) {
    const { register } = useFormContext<ProfileFormInputs>();

    const fieldProps = {
        id,
        type,
        placeholder,
        dimmension: "sm" as const,
        color: "outlined" as const,
        readOnly,
        className: "max-w-[200px]",
        ...(readOnly ? { value } : register(id, validation))
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between gap-3">
                <label htmlFor={id} className="shrink-0 text-sm text-[rgba(255,255,255,0.33)]">
                    {label}
                </label>
                {type === "select" ? (
                    <SelectField {...fieldProps}>
                        {options?.map((option: string) => (
                            <option key={option.toLowerCase()} value={option.toLowerCase()}>
                                {option}
                            </option>
                        ))}
                    </SelectField>
                ) : (
                    <InputField {...fieldProps} />
                )}
            </div>
            {error && <span className="mt-1 text-xs text-red-500">{error.message as string}</span>}
        </div>
    );
}

function SaveAndUpdateButton() {
    const setIsEdited = useSetAtom(isEditedAtom);
    const isSubmitting = useAtomValue(isSubmittingAtom);
    const {
        formState: { isValid }
    } = useFormContext<ProfileFormInputs>();

    function handleCancel() {
        setIsEdited((state) => !state);
    }

    return (
        <div className="flex items-center gap-4">
            <button
                className="size-fit"
                type="button"
                disabled={isSubmitting}
                onClick={handleCancel}
            >
                <span
                    className={cn(
                        "text-sm font-semibold",
                        isSubmitting && "cursor-not-allowed opacity-50"
                    )}
                >
                    Cancel
                </span>
            </button>
            <button className="size-fit" type="submit" disabled={isSubmitting || !isValid}>
                <span
                    className={cn(
                        "golden-text text-sm",
                        (isSubmitting || !isValid) && "cursor-not-allowed opacity-50"
                    )}
                >
                    Save & Update
                </span>
            </button>
        </div>
    );
}

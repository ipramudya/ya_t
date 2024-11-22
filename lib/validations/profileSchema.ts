import { ProfileFormInputs } from "@/types/profile";
import { z } from "zod";

export const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    gender: z.enum(["male", "female"], {
        required_error: "Gender is required"
    }),
    birthday: z.string().min(1, "Birthday is required"),
    horoscope: z.string(),
    zodiac: z.string(),
    height: z
        .string()
        .min(1, "Height is required")
        .regex(/^\d+$/, "Please enter a valid number"),
    weight: z
        .string()
        .min(1, "Weight is required")
        .regex(/^\d+$/, "Please enter a valid number")
});

export const getFieldConfig = (fieldName: keyof ProfileFormInputs) => {
    const configs = {
        name: {
            label: "Display name:",
            type: "text",
            placeholder: "Enter name"
        },
        gender: {
            label: "Gender:",
            type: "select" as const,
            options: ["Male", "Female"]
        },
        birthday: {
            label: "Birthday:",
            type: "date"
        },
        horoscope: {
            label: "Horoscope:",
            type: "text",
            placeholder: "--",
            readOnly: true
        },
        zodiac: {
            label: "Zodiac:",
            type: "text",
            placeholder: "--",
            readOnly: true
        },
        height: {
            label: "Height:",
            type: "text",
            placeholder: "Add height"
        },
        weight: {
            label: "Weight:",
            type: "text",
            placeholder: "Add weight"
        },
        profileImage: {
            label: "Profile Image:",
            type: "file",
            accept: "image/*"
        }
    } as const;

    return configs[fieldName];
};

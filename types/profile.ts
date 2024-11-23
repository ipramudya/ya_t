export interface ProfileFormInputs {
    displayName: string;
    gender: "male" | "female";
    birthday: string;
    horoscope: string;
    zodiac: string;
    height: string;
    weight: string;
    profileImage?: File;
}

export interface ProfileDatabaseRequest {
    displayName: string;
    gender: "male" | "female";
    birthday: Date;
    height: number;
    weight: number;
    interest?: string[];
    userId: string;
    profileURL: string;
}

export interface ProfileFormInputs {
    name: string;
    gender: "male" | "female";
    birthday: string;
    horoscope: string;
    zodiac: string;
    height: string;
    weight: string;
    profileImage?: File;
}

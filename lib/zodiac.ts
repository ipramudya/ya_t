interface DateRange {
    startMonth: number;
    startDay: number;
    endMonth: number;
    endDay: number;
}

interface HoroscopeInfo {
    name: string;
    dateRange: DateRange;
}

const HOROSCOPE_DATA: HoroscopeInfo[] = [
    {
        name: "Aries",
        dateRange: { startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 }
    },
    {
        name: "Taurus",
        dateRange: { startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 }
    },
    {
        name: "Gemini",
        dateRange: { startMonth: 5, startDay: 21, endMonth: 6, endDay: 21 }
    },
    {
        name: "Cancer",
        dateRange: { startMonth: 6, startDay: 22, endMonth: 7, endDay: 22 }
    },
    {
        name: "Leo",
        dateRange: { startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 }
    },
    {
        name: "Virgo",
        dateRange: { startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 }
    },
    {
        name: "Libra",
        dateRange: { startMonth: 9, startDay: 23, endMonth: 10, endDay: 23 }
    },
    {
        name: "Scorpius",
        dateRange: { startMonth: 10, startDay: 24, endMonth: 11, endDay: 21 }
    },
    {
        name: "Sagittarius",
        dateRange: { startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 }
    },
    {
        name: "Capricornus",
        dateRange: { startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 }
    },
    {
        name: "Aquarius",
        dateRange: { startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 }
    },
    {
        name: "Pisces",
        dateRange: { startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 }
    }
];

const CHINESE_ZODIAC = [
    "Rat",
    "Ox",
    "Tiger",
    "Rabbit",
    "Dragon",
    "Snake",
    "Horse",
    "Goat",
    "Monkey",
    "Rooster",
    "Dog",
    "Pig"
];

export interface ZodiacResult {
    horoscope: string;
    zodiac: string;
}

export function calculateZodiac(birthDate: string): ZodiacResult {
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    // Calculate Horoscope
    const horoscopeInfo = HOROSCOPE_DATA.find((sign) => {
        const { dateRange } = sign;

        // Handle special case for Capricorn (spans December-January)
        if (dateRange.startMonth === 12) {
            return (
                (month === 12 && day >= dateRange.startDay) ||
                (month === 1 && day <= dateRange.endDay)
            );
        }

        return (
            (month === dateRange.startMonth && day >= dateRange.startDay) ||
            (month === dateRange.endMonth && day <= dateRange.endDay)
        );
    });

    if (!horoscopeInfo) {
        throw new Error("invalid date or unable to calculate horoscope");
    }

    // Calculate Chinese Zodiac
    const zodiacIndex = (year - 1900) % 12;
    const zodiac = CHINESE_ZODIAC[zodiacIndex];

    return {
        horoscope: horoscopeInfo.name,
        zodiac
    };
}

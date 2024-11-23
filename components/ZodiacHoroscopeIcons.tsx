import {
    TbZodiacAries,
    TbZodiacTaurus,
    TbZodiacGemini,
    TbZodiacCancer,
    TbZodiacLeo,
    TbZodiacVirgo,
    TbZodiacLibra,
    TbZodiacScorpio,
    TbZodiacSagittarius,
    TbZodiacAquarius,
    TbZodiacPisces
} from "react-icons/tb";

import {
    GiRooster,
    GiRat,
    GiCow,
    GiTiger,
    GiRabbit,
    GiDragonHead,
    GiSandSnake,
    GiHorseHead,
    GiGoat,
    GiMonkey,
    GiSittingDog,
    GiPig
} from "react-icons/gi";

export const ZodiacHoroscopeIcons = {
    Aries: <TbZodiacAries />,
    Taurus: <TbZodiacTaurus />,
    Gemini: <TbZodiacGemini />,
    Cancer: <TbZodiacCancer />,
    Leo: <TbZodiacLeo />,
    Virgo: <TbZodiacVirgo />,
    Libra: <TbZodiacLibra />,
    Scorpio: <TbZodiacScorpio />,
    Sagittarius: <TbZodiacSagittarius />,
    Aquarius: <TbZodiacAquarius />,
    Pisces: <TbZodiacPisces />,

    Rooster: <GiRooster />,
    Rat: <GiRat />,
    Ox: <GiCow />,
    Tiger: <GiTiger />,
    Rabbit: <GiRabbit />,
    Dragon: <GiDragonHead />,
    Snake: <GiSandSnake />,
    Horse: <GiHorseHead />,
    Goat: <GiGoat />,
    Monkey: <GiMonkey />,
    Dog: <GiSittingDog />,
    Pig: <GiPig />
} as const;

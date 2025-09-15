export type NightreignLocationType =
    "Spawn" |
    "Circle" |
    "MajorCamp" |
    "MinorCamp" |
    "FieldBoss" |
    "Castle" |
    "Evergaol" |
    "RotBlessing" |
    "FrenzyTower" |
    "ScalesMerchant";

export type ShiftingEarth = "Base" | "Crater" | "Mountain" | "Woods" | "City";

export type NightreignLocation = {
    name: string,
    type: NightreignLocationType
    xPercent: number,
    yPercent: number,
};


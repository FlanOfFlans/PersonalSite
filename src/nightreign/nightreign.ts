export enum LocationType {
    Spawn,
    Circle,
    MajorCamp,
    MinorCamp,
    FieldBoss,
    Castle,
    Evergaol,
    RotBlessing,
    FrenzyTower,
    ScalesMerchant,
}

export type NightreignLocation = {
    name: string,
    x: number,
    y: number,
    type: LocationType
};


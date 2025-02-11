export function linify(input: string): number[][] {
    const lines =
        input.split("\n").map((line) =>
            line
                .split(" ")
                .filter((i) => i != "")
                .map((i) => parseInt(i))
        ) ?? [];

    return lines;
}

export type Coord = {
    x: number;
    y: number;
};

export function getAdjacentCells<T>(grid: T[][], coord: Coord): {value: T, coord: Coord}[]
{
    let cells: {value: T, coord: Coord}[] = [];
    const xLength = grid.at(0)?.length ?? 0;
    const yLength = grid.length;

    let left = undefined;
    let up = undefined;
    if (coord.x != 0) {
        left = {value: grid.at(coord.y)?.at(coord.x - 1), coord: {x: coord.x - 1, y: coord.y}};
    }
    if (coord.y != 0) {
        up = {value: grid.at(coord.y - 1)?.at(coord.x), coord: {x: coord.x, y: coord.y - 1}};
    }
    const right = {value: grid.at(coord.y)?.at(coord.x + 1), coord: {x: coord.x + 1, y: coord.y}};
    const down = {value: grid.at(coord.y + 1)?.at(coord.x), coord: {x: coord.x, y: coord.y + 1}};

    cells = [left, right, up, down].filter(n => n?.value != undefined) as {value: T, coord: Coord}[];
    return cells;
}

// % operator provides remainder, not modulo
// This gives correct results over negative numbers
export function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

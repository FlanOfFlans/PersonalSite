<template>
    <DayCard
        :day="15"
        :test-input="testInput"
        :puzzle-solution-1="solvePuzzle1"
        :puzzle-solution-2="solvePuzzle2"
    />
</template>
<script setup lang="ts">
import DayCard from "@c/AOC/DayCard.vue";
import { Coord } from "../../utils";

enum Tiles {
    Wall = "#",
    Space = ".",
    Crate = "O",
    LeftCrate = "[",
    RightCrate = "]",
    Robot = "@"
}

enum Steps {
    Left = "<",
    Right = ">",
    Up = "^",
    Down = "v"
}

function solvePuzzle1(input: string): number {
    let { map, initialPos: pos, steps } = parseInput(input);

    for(const step of steps) {
        pos = tryStep(map, pos, step).newPos;
    }

    return sumGps(map);
}

function solvePuzzle2(input: string): number {
    let { map, initialPos: pos, steps } = parseInput(input, true);
    let count = 0;

    for(const step of steps) {
        pos = tryStep(map, pos, step).newPos;
    }

    return sumGps(map, true);
}

function parseInput(input: string, wide = false): { map: Tiles[][], initialPos: Coord, steps: Steps[] } {
    let [mapString, stepString] = input.split("\n\n");
    let map = mapString.split("\n").map(line => line.split("")) as Tiles[][];

    if (wide) {
        map = map.map(line => line.flatMap(tile => {
            switch(tile) {
                case Tiles.Crate:
                    return ["[", "]"] as Tiles[];
                case Tiles.Robot:
                    return ["@", "."] as Tiles[];
                case Tiles.Space:
                    return [".", "."] as Tiles[];
                case Tiles.Wall:
                    return ["#", "#"] as Tiles[];
                case Tiles.LeftCrate:
                case Tiles.RightCrate:
                    throw new Error("Invalid symbol in input");
            }
        }))
    }
    const steps = stepString.split("").filter(c => c != "\n") as Steps[];

    const robotY = map.findIndex(line => line.includes(Tiles.Robot));
    const robotX = map[robotY].findIndex(c => c == Tiles.Robot);

    if (robotY == -1 || robotX == -1) {
        throw new Error("Can't find robot in input");
    }

    return { map, initialPos: {x: robotX, y: robotY}, steps }
}

function tryStep(map: Tiles[][], from: Coord, dir: Steps, makeStep: boolean = true): { success: boolean, newPos: Coord } {
    let step: Coord;
    switch(dir) {
        case Steps.Down:
            step = { x: 0, y: 1 };
            break;
        case Steps.Up:
            step = { x: 0, y: -1 };
            break;
        case Steps.Left: 
            step = { x: -1, y: 0 };
            break;
        case Steps.Right:
            step = { x: 1, y: 0 };
            break;
    }

    const destination = { x: from.x + step.x, y: from.y + step.y };
    const destinationTile = map[destination.y][destination.x];
    const fromTile = map[from.y][from.x];

    let pushLeft = { success: true, newPos: {x: destination.x + step.x, y: destination.y + step.y}};
    let pushRight = { success: true, newPos: {x: destination.x + step.x, y: destination.y + step.y}};
    switch(destinationTile) {
        case Tiles.Robot:
        case Tiles.Wall:
            return { success: false, newPos: from };
        
        case Tiles.Space:
            if (makeStep) {
                map[from.y][from.x] = Tiles.Space;
                map[destination.y][destination.x] = fromTile;
            }
            return { success: true, newPos: destination };
        
        case Tiles.Crate:
            const canPush = tryStep(map, destination, dir, makeStep).success;
            if (!canPush) {
                return { success: false, newPos: from };
            }

            else {
                if (makeStep) {
                    map[from.y][from.x] = Tiles.Space;
                    map[destination.y][destination.x] = fromTile;
                }
                return { success: true, newPos: destination };
            }
        
        case Tiles.LeftCrate:;
            if (dir == Steps.Up || dir == Steps.Down) {
                pushRight = tryStep(map, {x: destination.x + 1, y: destination.y}, dir, false);
                pushLeft = tryStep(map, destination, dir, false);
            }

            else if (dir == Steps.Right) {
                pushRight = tryStep(map, {x: destination.x + 1, y: destination.y}, dir, false);
            }

            else {
                pushLeft = tryStep(map, destination, dir, false);
            }

            if (pushLeft.success && pushRight.success) {
                if (makeStep && (dir == Steps.Up || dir == Steps.Right || dir == Steps.Down)) {
                    pushRight = tryStep(map, {x: destination.x + 1, y: destination.y}, dir, true);
                    pushLeft = tryStep(map, destination, dir, true);
                }

                else if (makeStep && dir == Steps.Left) {
                    pushLeft = tryStep(map, destination, dir, true);
                    pushRight = tryStep(map, {x: destination.x + 1, y: destination.y}, dir, true);
                }

                if (makeStep) {
                    map[from.y][from.x] = Tiles.Space;
                    map[destination.y][destination.x] = fromTile;
                }

                return { success: true, newPos: destination };
            }

            else {
                return { success: false, newPos: from };
            }

        case Tiles.RightCrate:
            if (dir == Steps.Up || dir == Steps.Down) {
                pushLeft = tryStep(map, {x: destination.x - 1, y: destination.y}, dir, false);
                pushRight = tryStep(map, destination, dir, false);
            }

            else if (dir == Steps.Left) {
                pushLeft = tryStep(map, {x: destination.x - 1, y: destination.y}, dir, false);
            }

            else {
                pushRight = tryStep(map, destination, dir, false);
            }

            if (pushLeft.success && pushRight.success) {
                if (makeStep && (dir == Steps.Up || dir == Steps.Left || dir == Steps.Down)) {
                    pushLeft = tryStep(map, {x: destination.x - 1, y: destination.y}, dir, true);
                    pushRight = tryStep(map, destination, dir, true);
                }

                else if (makeStep && dir == Steps.Right) {
                    pushLeft = tryStep(map, {x: destination.x - 1, y: destination.y}, dir, true);
                    pushRight = tryStep(map, destination, dir, true);
                }

                if (makeStep) {
                    map[from.y][from.x] = Tiles.Space;
                    map[destination.y][destination.x] = fromTile;
                }

                return { success: true, newPos: destination };
            }

            else {
                return { success: false, newPos: from };
            }
    }
}

function sumGps(map: Tiles[][], wide = false) {
    let sum = 0;
    for(let y = 0; y < map.length; y++) {
        for(let x = 0; x < map[y].length; x++) {
            if (map[y][x] == (wide ? Tiles.LeftCrate : Tiles.Crate)) {
                sum += 100 * y + x;
            }
        }
    }

    return sum;
}

const testInput = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`;
</script>
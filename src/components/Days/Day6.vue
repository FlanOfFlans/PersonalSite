<template>
    <DayCard
        :day="4"
        :test-input="testInput"
        :puzzle-solution-1="solvePuzzle1"
        :puzzle-solution-2="solvePuzzle2"
    />
</template>
<script setup lang="ts">
import { routerViewLocationKey } from "vue-router";
import DayCard from "../DayCard.vue";
import { ref } from "vue";

const dirs = ["^", ">", "V", "<"];

type Coord = {
    x: number;
    y: number;
};

type PathResult = {
    tiles: number;
    loop: boolean;
    map: string[][];
};

function solvePuzzle1(input: string): number {
    let map = input.split("\n").map((l) => l.split(""));
    let guardY = map.findIndex(
        (l) => l.includes("v") || l.includes("<") || l.includes("^") || l.includes(">")
    );
    let guardX = map[guardY].findIndex((c) => c == "v" || c == "<" || c == "^" || c == ">");

    let pos: Coord = { x: guardX, y: guardY };
    let dir: Coord = { x: 0, y: 0 };

    switch (map[pos.y][pos.x]) {
        case "v":
            dir.y = 1;
            break;

        case "<":
            dir.x = -1;
            break;

        case "^":
            dir.y = -1;
            break;

        case ">":
            dir.x = 1;
            break;
    }

    map[pos.y][pos.x] = getDirGlyph(dir);
    let result = mapPath(map, pos, dir);

    return result.tiles;
}

function solvePuzzle2(input: string): number {
    let map = input.split("\n").map((l) => l.split(""));
    let guardY = map.findIndex(
        (l) => l.includes("v") || l.includes("<") || l.includes("^") || l.includes(">")
    );
    let guardX = map[guardY].findIndex((c) => c == "v" || c == "<" || c == "^" || c == ">");

    let pos: Coord = { x: guardX, y: guardY };
    let dir: Coord = { x: 0, y: 0 };

    switch (map[pos.y][pos.x]) {
        case "v":
            dir.y = 1;
            break;

        case "<":
            dir.x = -1;
            break;

        case "^":
            dir.y = -1;
            break;

        case ">":
            dir.x = 1;
            break;
    }

    map[pos.y][pos.x] = getDirGlyph(dir);
    const mapCopy = map.map((line) => line.slice());
    let result = mapPath(mapCopy, pos, dir);
    let potentialObstacles: Coord[] = [];
    for (let y = 0; y < result.map.length; y++) {
        for (let x = 0; x < result.map[y].length; x++) {
            if (result.map[y][x] != "." && result.map[y][x] != "#" && !(x == pos.x && y == pos.y)) {
                potentialObstacles.push({ x, y });
            }
        }
    }

    let count = 0;
    for (let potentialObstacle of potentialObstacles) {
        let newMap = map.map((line) => line.slice());
        newMap[potentialObstacle.y][potentialObstacle.x] = "#";
        const obstacleResult = mapPath(newMap, pos, dir);
        if (obstacleResult.loop) {
            count += 1;
        }
    }
    return count;
}

function turnRight(dir: Coord) {
    return { x: dir.y * -1, y: dir.x * 1 };
}

function getMapGlyph(map: string[][], pos: Coord, dir: Coord) {
    const target = { x: pos.x + dir.x, y: pos.y + dir.y };
    if (target.y >= 0 && target.y < map.length && target.x >= 0 && target.x < map[0].length) {
        return map[target.y][target.x];
    } else {
        return "!";
    }
}

function getDirGlyph(dir: Coord): string {
    if (dir.x == 0 && dir.y == -1) {
        return "^";
    } else if (dir.x == 1 && dir.y == 0) {
        return ">";
    } else if (dir.x == 0 && dir.y == 1) {
        return "V";
    } else if (dir.x == -1 && dir.y == 0) {
        return "<";
    } else {
        return "X";
    }
}

function mapPath(map: string[][], start: Coord, startDir: Coord): PathResult {
    let pos = { ...start };
    let dir = { ...startDir };
    map[pos.y][pos.x] = "X";
    let count = 1;
    let glyph = "";
    let loop = false;
    while (!loop && (glyph = getMapGlyph(map, pos, dir)) != "!") {
        switch (glyph) {
            case ".":
                map[pos.y + dir.y][pos.x + dir.x] = getDirGlyph(dir);
                count += 1;
            case "^":
            case ">":
            case "V":
            case "<":
                const dirGlyph = getDirGlyph(dir);
                if (glyph == dirGlyph) {
                    loop = true;
                }
            case "X":
                pos.x += dir.x;
                pos.y += dir.y;
                break;
            case "#":
            default:
                dir = turnRight(dir);
                break;
        }
    }

    return { tiles: count, loop: loop, map };
}

const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;
</script>

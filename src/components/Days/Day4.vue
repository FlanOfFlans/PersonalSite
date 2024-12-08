<template>
    <DayCard
        :day="4"
        :test-input="testInput"
        :puzzle-solution-1="solvePuzzle1"
        :puzzle-solution-2="solvePuzzle2"
    />
</template>
<script setup lang="ts">
import DayCard from "../DayCard.vue";
import { ref } from "vue";

const steps = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: -1 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
];

function solvePuzzle1(input: string): number {
    const grid = input.split("\n");
    const coords = find2d(grid, "X");

    let count = 0;
    for (const coord of coords) {
        for (const step of steps) {
            if (stepSearch(grid, step.x, step.y, coord.x, coord.y, "XMAS")) {
                count += 1;
            }
        }
    }

    return count;
}

function solvePuzzle2(input: string): number {
    const grid = input.split("\n");
    const coords = find2d(grid, "A");

    let count = 0;
    for (const coord of coords) {
        let nw_se = false;
        let ne_sw = false;

        if (stepSearch(grid, -1, -1, coord.x, coord.y, "AM")) {
            if (stepSearch(grid, 1, 1, coord.x, coord.y, "AS")) {
                nw_se = true;
            }
        } else if (stepSearch(grid, -1, -1, coord.x, coord.y, "AS")) {
            if (stepSearch(grid, 1, 1, coord.x, coord.y, "AM")) {
                nw_se = true;
            }
        }

        if (stepSearch(grid, 1, -1, coord.x, coord.y, "AM")) {
            if (stepSearch(grid, -1, 1, coord.x, coord.y, "AS")) {
                ne_sw = true;
            }
        } else if (stepSearch(grid, 1, -1, coord.x, coord.y, "AS")) {
            if (stepSearch(grid, -1, 1, coord.x, coord.y, "AM")) {
                ne_sw = true;
            }
        }

        count += nw_se && ne_sw ? 1 : 0;
    }

    return count;
}

function find2d(grid: string[], searchFor: string) {
    let coords: { x: number; y: number }[] = [];

    for (const [i, line] of grid.entries()) {
        for (let j = 0; j < line.length; j++) {
            if (line[j] == searchFor[0]) {
                coords.push({ x: j, y: i });
            }
        }
    }

    return coords;
}

function stepSearch(
    grid: string[],
    xStep: number,
    yStep: number,
    xStart: number,
    yStart: number,
    searchFor: string
): boolean {
    let searching = true;
    for (let i = 0; i < searchFor.length; i++) {
        const x = xStart + i * xStep;
        const y = yStart + i * yStep;

        if (
            y < 0 ||
            x < 0 ||
            y >= grid.length ||
            x >= grid[0].length ||
            grid[y][x] != searchFor[i]
        ) {
            searching = false;
            break;
        }
    }

    return searching;
}

const testInput = ref(
    `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`
);
</script>

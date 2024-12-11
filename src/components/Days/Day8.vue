<template>
    <DayCard
        :day="8"
        :test-input="testInput"
        :puzzle-solution-1="solvePuzzle1"
        :puzzle-solution-2="solvePuzzle2"
    />
</template>
<script setup lang="ts">
import DayCard from "../DayCard.vue";
import { Coord } from "../../utils";

function solvePuzzle1(input: string): number {
    const grid = input.split("\n").map((line) => line.split(""));
    const antennae = new Map<string, Coord[]>();
    let antinodes: Coord[] = [];

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] != ".") {
                let entry = antennae.get(grid[y][x]);
                if (!entry) {
                    antennae.set(grid[y][x], [{ x, y }]);
                } else {
                    entry.push({ x, y });
                }
            }
        }
    }

    for (let entries of antennae.values()) {
        for (let i = 0; i < entries.length; i++) {
            for (let j = i + 1; j < entries.length; j++) {
                const a = entries[i];
                const b = entries[j];
                const step = { x: b.x - a.x, y: b.y - a.y };

                const node1 = { x: b.x + step.x, y: b.y + step.y };
                const node2 = { x: a.x - step.x, y: a.y - step.y };

                if (
                    node1.x >= 0 &&
                    node1.y >= 0 &&
                    node1.x < grid[0].length &&
                    node1.y < grid.length
                ) {
                    antinodes.push(node1);
                }

                if (
                    node2.x >= 0 &&
                    node2.y >= 0 &&
                    node2.x < grid[0].length &&
                    node2.y < grid.length
                ) {
                    antinodes.push(node2);
                }
            }
        }
    }

    antinodes = antinodes.filter(
        (value, index, array) => array.findIndex((c) => c.x == value.x && c.y == value.y) === index
    );
    return antinodes.length;
}

function solvePuzzle2(input: string): number {
    const grid = input.split("\n").map((line) => line.split(""));
    const antennae = new Map<string, Coord[]>();
    let antinodes: Coord[] = [];

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] != ".") {
                let entry = antennae.get(grid[y][x]);
                if (!entry) {
                    antennae.set(grid[y][x], [{ x, y }]);
                } else {
                    entry.push({ x, y });
                }
            }
        }
    }

    for (let entries of antennae.values()) {
        for (let i = 0; i < entries.length; i++) {
            for (let j = i + 1; j < entries.length; j++) {
                const a = entries[i];
                const b = entries[j];
                const step = { x: b.x - a.x, y: b.y - a.y };

                let node1 = { ...b };
                while (
                    node1.x >= 0 &&
                    node1.y >= 0 &&
                    node1.x < grid[0].length &&
                    node1.y < grid.length
                ) {
                    antinodes.push(node1);
                    node1 = { x: node1.x + step.x, y: node1.y + step.y };
                }

                let node2 = { ...a };
                while (
                    node2.x >= 0 &&
                    node2.y >= 0 &&
                    node2.x < grid[0].length &&
                    node2.y < grid.length
                ) {
                    antinodes.push(node2);
                    node2 = { x: node2.x - step.x, y: node2.y - step.y };
                }
            }
        }
    }

    antinodes = antinodes.filter(
        (value, index, array) => array.findIndex((c) => c.x == value.x && c.y == value.y) === index
    );
    return antinodes.length;
}

const testInput = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;
</script>

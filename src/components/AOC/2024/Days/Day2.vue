<template>
    <DayCard
        :day="2"
        :test-input="testInput"
        :puzzle-solution-1="solvePuzzle1"
        :puzzle-solution-2="solvePuzzle2"
    />
</template>
<script setup lang="ts">
import DayCard from "@c/AOC/DayCard.vue";
import { linify } from "@/components/AOC/utils";
import { ref } from "vue";

function solvePuzzle1(input: string): number {
    const lines = linify(input);
    let count = 0;

    lines.forEach((line) => (count += checkLine(line) ? 1 : 0));

    return count;
}

function solvePuzzle2(input: string): number {
    const lines = linify(input);
    let count = 0;

    lines.forEach((line) => {
        let possibleLines: number[][] = [];
        for (let i = 0; i < line.length; i++) {
            let possibleLine = [...line];
            possibleLine.splice(i, 1);
            possibleLines.push(possibleLine);
        }
        if (possibleLines.some((line) => checkLine(line))) {
            count += 1;
        }
    });
    return count;
}

function checkLine(line: number[]): boolean {
    const differences = line
        .map((level, i) => {
            if (line[i + 1] !== undefined) {
                return level - line[i + 1];
            }
        })
        .filter((level) => level !== undefined);

    if (differences.every((d) => d > 0 && d <= 3) || differences.every((d) => d < 0 && d >= -3)) {
        return true;
    }

    return false;
}

const testInput = ref(`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`);
</script>

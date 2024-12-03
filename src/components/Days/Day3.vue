<template>
    <DayCard
        :day="3"
        :test-input="testInput"
        :puzzle-solution-1="solvePuzzle1"
        :puzzle-solution-2="solvePuzzle2"
    />
</template>
<script setup lang="ts">
import DayCard from "../DayCard.vue";
import { ref } from "vue";

function solvePuzzle1(input: string): number {
    const re = /mul\((\d+),(\d+)\)/g;
    const matches = input.matchAll(re);
    let sum = 0;

    for (const match of matches) {
        sum += parseInt(match[1]) * parseInt(match[2]);
    }

    return sum;
}

function solvePuzzle2(input: string): number {
    const mulRegex = /mul\((\d+),(\d+)\)/g;
    const doRegex = /do\(\)/g;
    const dontRegex = /don't\(\)/g;

    const doMatches = input.matchAll(doRegex);
    const doMatchIndices: number[] = [];
    for (const match of doMatches) {
        doMatchIndices.push(match.index);
    }

    doMatchIndices.sort((a, b) => b - a);

    const dontMatches = input.matchAll(dontRegex);
    const dontMatchIndices: number[] = [];
    for (const match of dontMatches) {
        dontMatchIndices.push(match.index);
    }

    dontMatchIndices.sort((a, b) => b - a);

    const matches = input.matchAll(mulRegex);
    let sum = 0;

    for (const match of matches) {
        const doIndex = doMatchIndices.find((i) => i < match.index) ?? 0;
        const dontIndex = dontMatchIndices.find((i) => i < match.index) ?? -1;

        if (doIndex > dontIndex) {
            sum += parseInt(match[1]) * parseInt(match[2]);
        }
    }

    return sum;
}

const testInput = ref(`xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`);
</script>

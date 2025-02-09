<template>
    <DayCard
        :day="1"
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
    let leftList = lines.map((line) => line[0]).sort();
    let rightList = lines.map((line) => line[1]).sort();

    let sum = 0;
    for (let i = 0; i < leftList.length; i++) {
        sum += Math.abs(leftList[i] - rightList[i]);
    }

    return sum;
}

function solvePuzzle2(input: string): number {
    const lines = linify(input);
    let leftList = lines.map((line) => line[0]);
    let rightCounts = new Map<number, number>();

    lines.forEach((line) => {
        const n = line[1];
        const count = rightCounts.get(n) ?? 0;
        rightCounts.set(n, count + 1);
    });

    let sum = 0;
    leftList.forEach((i) => (sum += i * (rightCounts.get(i) ?? 0)));

    return sum;
}

const testInput = ref(`3   4
4   3
2   5
1   3
3   9
3   3`);
</script>

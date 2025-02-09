<template>
    <DayCard
        :day="11"
        :test-input="testInput"
        :puzzle-solution-1="solvePuzzle1"
        :puzzle-solution-2="solvePuzzle2"
    />
</template>
<script setup lang="ts">
import DayCard from "@c/AOC/DayCard.vue";
import { Md5 } from "ts-md5";

function solvePuzzle1(input: string): number {
    let stones = input.split(" ").map(n => parseInt(n));
    
    let sum = 0;
    let memo = new Map<string, number>();
    for(let stone of stones) {
        let blinkStones = blink(stone, 25, memo);
        sum += blinkStones;
    }

    return sum;
}

function solvePuzzle2(input: string): number {
    let stones = input.split(" ").map(n => parseInt(n));
    
    let sum = 0;
    let memo = new Map<string, number>();
    for(let stone of stones) {
        let blinkStones = blink(stone, 75, memo);
        sum += blinkStones;
    }

    return sum;
}

function blink(stone: number, toDepth: number, memo: Map<string, number>): number {
    const blinkHash = hashBlink(stone, toDepth);
    if(memo.has(blinkHash)) {
        return memo.get(blinkHash)!;
    }
    
    if (toDepth == 0) {
        return 1
    }

    const stones = getBlinkValue(stone);
    let sum = 0;
    for(let newStone of stones) {
        sum += blink(newStone, toDepth - 1, memo);
    }

    memo.set(blinkHash, sum);
    return sum;
}

function getBlinkValue(stone: number) {
    if (stone == 0) {
        return [1];
    }

    const stoneString = stone.toString();
    if (stoneString.length % 2 == 0) {
        const leftStone = parseInt(stoneString.substring(0, stoneString.length / 2));
        const rightStone = parseInt(stoneString.substring(stoneString.length / 2, stoneString.length));

        return [leftStone, rightStone];
    }

    return [stone * 2024];
};

function hashBlink(stone: number, toDepth: number): string {
    return Md5.hashStr(stone.toString() + "-" + toDepth.toString());
}

const testInput = `125 17`;
</script>
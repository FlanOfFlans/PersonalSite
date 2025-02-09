<template>
    <DayCard
        :day="13"
        :test-input="testInput"
        :puzzle-solution-1="solvePuzzle1"
        :puzzle-solution-2="solvePuzzle2"
    />
</template>
<script setup lang="ts">
import DayCard from "../DayCard.vue";
import { Coord, getAdjacentCells } from "@/utils";

type Machine = {
    aX: number,
    aY: number,
    bX: number,
    bY: number,
    prizeX: number,
    prizeY: number
};

function solvePuzzle1(input: string): number {
    const machineStrings = input.split("\n\n");
    const machines = machineStrings.map(m => parseMachine(m));

    let sum = 0;
    for(let machine of machines) {
        // Just a system of equations
        // Apply Cramer's law
        
        const det = machine.aX * machine.bY - machine.bX * machine.aY;
        const detA = machine.prizeX * machine.bY - machine.bX * machine.prizeY;
        const detB = machine.aX * machine.prizeY - machine.prizeX * machine.aY;

        const a = detA / det;
        const b = detB / det;

        if (a % 1 == 0 && b % 1 == 0) {
            sum += a * 3 + b;
        }
    }

    return sum;
}

function solvePuzzle2(input: string): number {
    const machineStrings = input.split("\n\n");
    const machines = machineStrings.map(m => parseMachine(m));
    const correctedMachines = machines.map(m => ({...m, prizeX: m.prizeX + 10000000000000, prizeY: m.prizeY + 10000000000000}));

    let sum = 0;
    for(let machine of correctedMachines) {
        const det = machine.aX * machine.bY - machine.bX * machine.aY;
        const detA = machine.prizeX * machine.bY - machine.bX * machine.prizeY;
        const detB = machine.aX * machine.prizeY - machine.prizeX * machine.aY;

        const a = detA / det;
        const b = detB / det;

        if (a % 1 == 0 && a > 0 && b % 1 == 0 && b > 0) {
            sum += a * 3 + b;
        }
    }

    return sum;
}

function parseMachine(input: string): Machine {
    input.trim();
    const re = /Button A: X\+(?<aX>\d+), Y\+(?<aY>\d+)\nButton B: X\+(?<bX>\d+), Y\+(?<bY>\d+)\nPrize: X=(?<prizeX>\d+), Y=(?<prizeY>\d+)/
    const strings = re.exec(input)?.groups;
    
    if (strings == undefined) { 
        throw new Error("Invalid machine format!");
    }

    const result = {
        aX: parseInt(strings.aX),
        aY: parseInt(strings.aY),
        bX: parseInt(strings.bX),
        bY: parseInt(strings.bY),
        prizeX: parseInt(strings.prizeX),
        prizeY: parseInt(strings.prizeY)
    };


    return result;
    
    
}

const testInput = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279 `;
</script>
<template>
    <DayCard
        :day="7"
        :test-input="testInput"
        :puzzle-solution-1="solvePuzzle1"
        :puzzle-solution-2="solvePuzzle2"
    />
    <v-row class="justify-center"> Heads up--this one is slow! (~30 second runtime) </v-row>
</template>
<script setup lang="ts">
import DayCard from "../DayCard.vue";

enum Operators {
    Add,
    Multiply,
    Concatenate,
}

const operatorFuncs = new Map([
    [Operators.Add, (a: number, b: number) => a + b],
    [Operators.Multiply, (a: number, b: number) => a * b],
    [Operators.Concatenate, (a: number, b: number) => parseInt("" + a + b)],
]);

function solvePuzzle1(input: string): number {
    const equations = input.split("\n");
    let sum = 0;
    for (let equation of equations) {
        const splitEquation = equation.split(":");
        const total = parseInt(splitEquation[0]);
        const terms = splitEquation[1]
            .split(" ")
            .map((i) => parseInt(i))
            .filter((i) => !Number.isNaN(i));

        if (hasSolution(total, terms, [Operators.Add, Operators.Multiply])) {
            sum += total;
        }
    }

    return sum;
}

function solvePuzzle2(input: string): number {
    const equations = input.split("\n");
    let sum = 0;
    for (let equation of equations) {
        const splitEquation = equation.split(":");
        const total = parseInt(splitEquation[0]);
        const terms = splitEquation[1]
            .split(" ")
            .map((i) => parseInt(i))
            .filter((i) => !Number.isNaN(i));

        if (hasSolution(total, terms, [Operators.Add, Operators.Multiply, Operators.Concatenate])) {
            sum += total;
        }
    }

    return sum;
}

function hasSolution(total: number, terms: number[], operators: Operators[]): boolean {
    const variations = operators.length ** (terms.length - 1);
    let solutionFound = false;
    let variation = 0;

    while (!solutionFound && variation < variations) {
        const binaryVariation = variation.toString(operators.length).split("").reverse().join("");
        let variationTerms = [...terms];
        let variationOperators: Operators[] = [];
        for (let i = 0; i < terms.length - 1; i++) {
            if (binaryVariation[i] == "2") {
                variationOperators.push(Operators.Concatenate);
            } else if (binaryVariation[i] == "1") {
                variationOperators.push(Operators.Add);
            } else {
                variationOperators.push(Operators.Multiply);
            }
        }

        while (variationTerms.length > 1) {
            variationTerms[0] = operatorFuncs.get(variationOperators[0])!(
                variationTerms[0],
                variationTerms[1]
            );
            variationTerms.splice(1, 1);
            variationOperators.splice(0, 1);

            if (variationTerms[0] > total) {
                break;
            }
        }

        if (variationTerms[0] == total) {
            solutionFound = true;
        } else {
            variation++;
        }
    }

    return solutionFound;
}

const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;
</script>

<template>
    <DayCard
        :day="5"
        :test-input="testInput"
        :puzzle-solution-1="solvePuzzle1"
        :puzzle-solution-2="solvePuzzle2"
    />
</template>
<script setup lang="ts">
import DayCard from "../DayCard.vue";
import { ref } from "vue";

type Rule = {
    before: number;
    after: number;
};

function solvePuzzle1(input: string): number {
    const [ruleStrings, updateStrings] = input.split("\n\n").map((i) => i.split("\n"));

    const rules: Rule[] = ruleStrings.map((rule) => {
        const [before, after] = rule.split("|");
        return { before: parseInt(before), after: parseInt(after) };
    });

    const updates = updateStrings.map((str) => str.split(",").map((i) => parseInt(i)));

    let sum = 0;
    for (let update of updates) {
        const relevantRules = rules.filter(
            (r) => update.includes(r.before) && update.includes(r.after)
        );

        if (getViolatedRules(update, relevantRules).length == 0) {
            const middleIndex = Math.floor(update.length / 2);
            sum += update[middleIndex];
        }
    }

    return sum;
}

function solvePuzzle2(input: string): number {
    const [ruleStrings, updateStrings] = input.split("\n\n").map((i) => i.split("\n"));

    const rules: Rule[] = ruleStrings.map((rule) => {
        const [before, after] = rule.split("|");
        return { before: parseInt(before), after: parseInt(after) };
    });

    const updates = updateStrings.map((str) => str.split(",").map((i) => parseInt(i)));

    let sum = 0;
    for (let update of updates) {
        const relevantRules = rules.filter(
            (r) => update.includes(r.before) && update.includes(r.after)
        );

        let violatedRules = getViolatedRules(update, relevantRules);
        if (violatedRules.length > 0) {
            while (violatedRules.length > 0) {
                const beforeIndex = update.findIndex((n) => n == violatedRules[0].before);
                const afterIndex = update.findIndex((n) => n == violatedRules[0].after);
                update.splice(afterIndex, 0, update[beforeIndex]);
                update.splice(beforeIndex + 1, 1);

                violatedRules = getViolatedRules(update, relevantRules);
            }

            const middleIndex = Math.floor(update.length / 2);
            sum += update[middleIndex];
        }
    }

    return sum;
}

function getViolatedRules(update: number[], rules: Rule[]): Rule[] {
    return rules.filter(
        (r) => update.findIndex((n) => n == r.before) > update.findIndex((n) => n == r.after)
    );
}

const testInput = ref(
    `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`
);
</script>

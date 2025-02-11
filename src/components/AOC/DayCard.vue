<template>
    <v-container min-width="400" max-width="600">
        <v-card height="100%">
            <template #title>
                <p class="mb-3">Day {{ day }}</p>
            </template>
            <template #text>
                <v-row>
                    <v-textarea
                        v-model="userInput"
                        :placeholder="testInput"
                        no-resize
                        spellcheck="false"
                        class="codeblock h-100"
                        rows="10"
                    />
                </v-row>
                <v-row v-visible="showResult(result1)">
                    {{ day }}-1 Result: {{ result1 }}
                    <v-spacer />
                    in {{ runtime1 }}ms
                </v-row>
                <v-row v-visible="showResult(result2)">
                    {{ day }}-2 Result: {{ result2 }}
                    <v-spacer />
                    in {{ runtime2 }}ms
                </v-row>
            </template>
            <template #actions>
                <v-spacer />
                <v-btn @click="solve">Solve!</v-btn>
            </template>
        </v-card>
    </v-container>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
    day: number;
    testInput: string;
    puzzleSolution1: (input: string) => number;
    puzzleSolution2?: (input: string) => number;
}>();

const result1 = ref<number>();
const runtime1 = ref<number>();
const result2 = ref<number>();
const runtime2 = ref<number>();
const userInput = ref<string>();
const puzzleInput = computed(() => (userInput.value ? userInput.value : props.testInput));

function solve() {
    const startTime1 = performance.now();
    result1.value = props.puzzleSolution1(puzzleInput.value);
    const endTime1 = performance.now();
    runtime1.value = Math.round(endTime1 - startTime1);
    if (props.puzzleSolution2) {
        const startTime2 = performance.now();
        result2.value = props.puzzleSolution2(puzzleInput.value);
        const endTime2 = performance.now();
        runtime2.value = Math.round(endTime2 - startTime2);
    }
}

function showResult(result: number | undefined) {
    return result !== undefined && !Number.isNaN(result);
}
</script>

<template>
    <v-container width="30%">
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
                        class="h-100"
                        rows="10"
                    />
                </v-row>
                <v-row v-visible="result1"> {{ day }}-1 Result: {{ result1 }} </v-row>
                <v-row v-visible="result2"> {{ day }}-2 Result: {{ result2 }} </v-row>
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

var props = defineProps<{
    day: number;
    testInput: string;
    puzzleSolution1: (input: string) => number;
    puzzleSolution2?: (input: string) => number;
}>();

const result1 = ref<number>();
const result2 = ref<number>();
const userInput = ref<string>();
const puzzleInput = computed(() => (userInput.value ? userInput.value : props.testInput));

function solve() {
    result1.value = props.puzzleSolution1(puzzleInput.value);
    if (props.puzzleSolution2) {
        result2.value = props.puzzleSolution2(puzzleInput.value);
    }
}
</script>

<template>
    <component :is="days[dayNum - 1]" />
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Day1 from "@/components/AOC/2024/Days/Day1.vue";
import Day2 from "@/components/AOC/2024/Days/Day2.vue";
import Day3 from "@/components/AOC/2024/Days/Day3.vue";
import Day4 from "@/components/AOC/2024/Days/Day4.vue";
import Day5 from "@/components/AOC/2024/Days/Day5.vue";
import Day6 from "@/components/AOC/2024/Days/Day6.vue";
import Day7 from "@/components/AOC/2024/Days/Day7.vue";
import Day8 from "@/components/AOC/2024/Days/Day8.vue";
import Day9 from "@/components/AOC/2024/Days/Day9.vue";
import Day10 from "@/components/AOC/2024/Days/Day10.vue";
import Day11 from "@/components/AOC/2024/Days/Day11.vue";
import Day12 from "@/components/AOC/2024/Days/Day12.vue";
import Day13 from "@/components/AOC/2024/Days/Day13.vue";

const route = useRoute();

var dayNum = computed(() =>
    parseInt(route.params.dayNum instanceof Array ? route.params.dayNum[0] : route.params.dayNum)
);

const days = [Day1, Day2, Day3, Day4, Day5, Day6, Day7, Day8, Day9, Day10, Day11, Day12, Day13];
</script>

<template>
    <component :is="days[dayNum - 1]" />
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Day1 from "@/components/Days/Day1.vue";
import Day2 from "@/components/Days/Day2.vue";
import Day3 from "@/components/Days/Day3.vue";
import Day4 from "@/components/Days/Day4.vue";
import Day5 from "@/components/Days/Day5.vue";
import Day6 from "@/components/Days/Day6.vue";
import Day7 from "@/components/Days/Day7.vue";
import Day8 from "@/components/Days/Day8.vue";

const route = useRoute();

var dayNum = computed(() =>
    parseInt(route.params.dayNum instanceof Array ? route.params.dayNum[0] : route.params.dayNum)
);

const days = [Day1, Day2, Day3, Day4, Day5, Day6, Day7, Day8];
</script>

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

const route = useRoute();

var dayNum = computed(() =>
    parseInt(route.params.dayNum instanceof Array ? route.params.dayNum[0] : route.params.dayNum)
);

const days = [Day1, Day2, Day3, Day4];
</script>

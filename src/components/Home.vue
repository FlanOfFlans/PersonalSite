<template>
    <v-row>
        <v-col class="">
            <Day1 />
            <Day2 />
            <Day3 />
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import Day1 from "./Days/Day1.vue";
import Day2 from "./Days/Day2.vue";
import Day3 from "./Days/Day3.vue";
const message = ref<string>();

onMounted(() => {
    message.value = "Hello, World";
});
</script>

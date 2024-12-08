<template>
    <v-row v-for="option in options">
        <v-col class="justify-center d-flex pa-0">
            <v-btn
                @click="linkTo(option.link)"
                :block="true"
                size="x-large"
            >
                <div class="text-h6">
                    {{ option.title }}
                </div>
            </v-btn>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const options = [
    {
        title: "About",
        link: "/aoc2024",
    },
    {
        title: "Day 1",
        link: "/aoc2024/days/1",
    },
    {
        title: "Day 2",
        link: "/aoc2024/days/2",
    },
    {
        title: "Day 3",
        link: "/aoc2024/days/3",
    },
    {
        title: "Day 4",
        link: "/aoc2024/days/4",
    },
];
function linkTo(link: string) {
    router.push(link);
}
</script>

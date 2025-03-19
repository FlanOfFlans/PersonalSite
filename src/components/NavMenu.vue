<template>
    <v-navigation-drawer v-model="model" name="nav-menu" temporary>
        <v-list nav>
            <NavGroup
                :items="options"
                :route="router.currentRoute.value"
            />
        </v-list>
    </v-navigation-drawer>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { NavItem, NavItemLink } from "@c/index.ts";
import NavGroup from "@c/NavGroup.vue";

const router = useRouter();
const options = [
    {
        id: "blog",
        title: "Blog",
        to: "/blog"
    },
    {
        id: "aoc",
        title: "Advent of Code",
        icon: "mdi-pine-tree",
        children: [
            {
                id: "aoc2024",
                title: "2024",
                children: [
                    {
                        id: "aoc2024About",
                        title: "About",
                        to: "/aoc2024",
                    },
                    {
                        id: "aoc2024Day1",
                        title: "Day 1",
                        to: "/aoc2024/days/1",
                    },
                    {
                        id: "aoc2024Day2",
                        title: "Day 2",
                        to: "/aoc2024/days/2",
                    },
                    {
                        id: "aoc2024Day3",
                        title: "Day 3",
                        to: "/aoc2024/days/3",
                    },
                    {
                        id: "aoc2024Day4",
                        title: "Day 4",
                        to: "/aoc2024/days/4",
                    },
                    {
                        id: "aoc2024Day5",
                        title: "Day 5",
                        to: "/aoc2024/days/5",
                    },
                    {
                        id: "aoc2024Day6",
                        title: "Day 6",
                        to: "/aoc2024/days/6",
                    },
                    {
                        id: "aoc2024Day7",
                        title: "Day 7",
                        to: "/aoc2024/days/7",
                    },
                    {
                        id: "aoc2024Day8",
                        title: "Day 8",
                        to: "/aoc2024/days/8",
                    },
                    {
                        id: "aoc2024Day9",
                        title: "Day 9",
                        to: "/aoc2024/days/9",
                    },
                    {
                        id: "aoc2024Day10",
                        title: "Day 10",
                        to: "/aoc2024/days/10"
                    },
                    {
                        id: "aoc2024Day11",
                        title: "Day 11",
                        to: "/aoc2024/days/11"
                    },
                    {
                        id: "aoc2024Day12",
                        title: "Day 12",
                        to: "/aoc2024/days/12"
                    },
                    {
                        id: "aoc2024Day13",
                        title: "Day 13",
                        to: "/aoc2024/days/13"
                    },
                    {
                        id: "aoc2024Day14",
                        title: "Day 14",
                        to: "/aoc2024/days/14"
                    },
                    {
                        id: "aoc2024day15",
                        title: "Day 15",
                        to: "/aoc2024/days/15"
                    }
                ]
            }
        ]
    }

];

const model = defineModel({ type: Boolean, default: false });

function linkTo(link: string) {
    router.push(link);
}

function isLink(item: NavItem): item is NavItemLink {
    return !("children" in item)
}
</script>

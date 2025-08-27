<template>
    <draggable>
        <PlayingCardComponent
            v-for="card in cards"
            :key="getKey(card)"
            :rank="card.rank"
            :suit="card.suit"
            :size="size"
            :unit="unit"
        >
        </PlayingCardComponent>
    </draggable>
</template>
<script setup lang="ts">
import draggable from "vuedraggable";
import { PlayingCard } from "@/types/PlayingCards";
import PlayingCardComponent from "@c/Solitaire/PlayingCard.vue";

const props = defineProps<{
    cards: PlayingCard[];
    size: number;
    unit?: string;
}>();

function getKey(card: PlayingCard) {
    return `${card.suit}${card.rank}`;
}
</script>
<style lang="scss"></style>

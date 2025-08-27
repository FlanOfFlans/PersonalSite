<template>
    <div class="d-flex">
        <CardPile
            v-for="(pile, i) in piles"
            :key="i"
            class="justify-space-evenly"
            :cards="pile"
            :size="200"
            unit="px"
        />
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import PlayingCardComponent from "@/components/Solitaire/PlayingCard.vue";
import CardPile from "@/components/Solitaire/CardPile.vue";
import { PlayingCard } from "@/types/PlayingCards";
import { Rank, Suit } from "@/types/PlayingCards";

const piles = ref<PlayingCard[][]>();

const invalidRanks = [Rank.Two, Rank.Three, Rank.Four, Rank.Five];

function makePiles() {
    let cards = getCards(invalidRanks);
    cards = shuffle(cards);

    piles.value = [[], [], [], [], [], []];

    let pileIndex = 0;
    while (cards.length > 0) {
        piles.value[pileIndex % piles.value.length].push(cards.pop()!);
    }
}

function getCards(skipRanks: Rank[] = [], skipSuits: Suit[] = []) {
    const ranks = (
        Object.keys(Rank)
            .map((x) => parseInt(x))
            .filter((x) => !isNaN(x)) as Rank[]
    ).filter((x) => !skipRanks.includes(x));

    const suits = (
        Object.keys(Suit)
            .map((x) => parseInt(x))
            .filter((x) => !isNaN(x)) as Suit[]
    ).filter((x) => !skipSuits.includes(x));

    let cards = ranks.flatMap((r) => suits.map((s) => ({ rank: r, suit: s })));

    return cards;
}

function shuffle(cards: PlayingCard[]) {
    let shuffled = cards
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    return shuffled;
}

onMounted(() => {
    makePiles();
});
</script>
<style lang="scss">
.card {
    margin-bottom: -215px;
}
</style>

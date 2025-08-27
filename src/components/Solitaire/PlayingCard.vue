<template>
    <v-container
        class="pa-0"
        :width="`${size}${unit ?? ''}`"
        :height="`${(7 / 5) * size}${unit ?? ''}`"
    >
        <img
            v-if="svg != null"
            :src="svg"
            width="100%"
            height="100%"
        />
        <div
            v-else
            class="d-flex justify-center"
        >
            <v-progress-circular indeterminate />
        </div>
    </v-container>
</template>
<script setup lang="ts">
import { Rank, Suit } from "@/types/PlayingCards";
import { onMounted, ref } from "vue";

const props = defineProps<{
    rank: Rank;
    suit: Suit;
    size: number;
    unit?: string;
}>();

const svg = ref<string>();

async function getSvg() {
    let rank = getRankCode(props.rank);
    let suit = getSuitCode(props.suit);

    return (await import(`@/assets/playingcards/${rank}${suit}.svg`)).default as string;
}

function getRankCode(rank: Rank) {
    switch (rank) {
        case Rank.Ace:
            return "A";
        case Rank.Two:
            return "2";
        case Rank.Three:
            return "3";
        case Rank.Four:
            return "4";
        case Rank.Five:
            return "5";
        case Rank.Six:
            return "6";
        case Rank.Seven:
            return "7";
        case Rank.Eight:
            return "8";
        case Rank.Nine:
            return "9";
        case Rank.Ten:
            return "T";
        case Rank.Jack:
            return "J";
        case Rank.Queen:
            return "Q";
        case Rank.King:
            return "K";
    }
}

function getSuitCode(suit: Suit) {
    switch (suit) {
        case Suit.Hearts:
            return "H";
        case Suit.Diamonds:
            return "D";
        case Suit.Clubs:
            return "C";
        case Suit.Spades:
            return "S";
    }
}

onMounted(async () => {
    svg.value = await getSvg();
});
</script>
<style lang="scss"></style>

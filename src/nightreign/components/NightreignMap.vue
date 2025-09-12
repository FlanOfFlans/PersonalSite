<template>
    <v-row>
        {{ locationIndex }}        
    </v-row>
    <v-row>
        {{ location.name }}
    </v-row>
    <v-row>
        <v-btn 
            icon="mdi-arrow-left-bold"
            :disabled="locationIndex <= 0"
            @click="locationIndex -= 1"
        />
        <v-btn
            icon="mdi-arrow-right-bold"
            :disabled="locationIndex >= locations.length - 1"
            @click="locationIndex += 1"
        />
    </v-row>
    <v-row>
        <div class="position-relative">
            <img :src="baseMap"/>
            <v-icon
                class="position-absolute"
                icon="mdi-bullseye"
                color="error"
                :style="iconPos"
                size="x-large"
            />
        </div>
    </v-row>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import baseMap from "/src/nightreign/assets/ERN_Map_Limveld_1.01.png";
import locations from "../assets/NightreignLocationData.json";

const locationIndex = ref(0);
const location = computed(() => locations[locationIndex.value]);
const iconPos = computed(() => ({
    left: location.value.xPercent + "%",
    top: location.value.yPercent + "%",
    transform: "translate(-50%,-50%)"
}));
</script>
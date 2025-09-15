<template>
    <v-text-field
        v-model="seed"
        label="Seed"
        :rules="seedRules"
    />
    <div class="map-container">
        <img :src="maps[map as keyof typeof maps]"/>
        <img
            class="poi"
            :src="camp.icon ?? ''"
            v-for="camp in camps"
            :style="camp.position"
        />
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import locations from "../assets/NightreignLocationData.json";
import seeds from "../assets/NightreignSeeds.json";
import shiftingEarthPoints from "../assets/ShiftingEarthPoints.json";
import { NightreignLocation, NightreignLocationType, ShiftingEarth } from "../nightreign";

import baseMap from "/src/nightreign/assets/maps/BaseMap.png";
import cityMap from "/src/nightreign/assets/maps/City.png";
import craterMap from "/src/nightreign/assets/maps/Crater.png";
import mountaintopsMap from "/src/nightreign/assets/maps/Mountaintops.png";
import woodsMap from "/src/nightreign/assets/maps/Woods.png";

import campIcon from "/src/nightreign/assets/icons/Camp.png";
import castleIcon from "/src/nightreign/assets/icons/Castle.png";
import cathedralIcon from "/src/nightreign/assets/icons/Cathedral.png";
import churchIcon from "/src/nightreign/assets/icons/Church.png";
import evergaolIcon from "/src/nightreign/assets/icons/Evergaol.png";
import fieldBossMinorIcon from "/src/nightreign/assets/icons/FieldBossMinor.png";
import fortIcon from "/src/nightreign/assets/icons/Fort.png";
import riseIcon from "/src/nightreign/assets/icons/Rise.png";
import townshipIcon from "/src/nightreign/assets/icons/Township.png";
import ruinsIcon from "/src/nightreign/assets/icons/Ruins.png";

const icons = {
    "Camp": campIcon,
    "Castle": castleIcon,
    "Great Church": cathedralIcon,
    "Church": churchIcon,
    "Evergaol": evergaolIcon,
    "Field Boss Minor": fieldBossMinorIcon,
    "Fort": fortIcon,
    "Sorcerer's Rise": riseIcon,
    "Township": townshipIcon,
    "Ruins": ruinsIcon,
};

const maps = {
    "Default": baseMap,
    "Crater": craterMap,
    "Mountaintop": mountaintopsMap,
    "Rotted Woods": woodsMap,
    "Noklateo": cityMap,
};

const seed = ref(1);
const seedData = computed(() => seeds[seed.value] ?? null)
const seedRules = [
    (value: string) => !!value || "Seed is required",
    (value: string) => !isNaN(parseInt(value)) || "Seed must be a number",
    (value: string) => parseInt(value) >= 0 && parseInt(value) <= 320 || "Seed must be between 0 and 319 inclusive"
];

const map = computed(() => seedData.value.ShiftingEarth);
const mapPoints = computed(() => shiftingEarthPoints[map.value as keyof typeof maps])

const styledLocations = computed(() => 
    locations.map(l => ({
        ...l,
        position: {
            left: l.xPercent + "%",
            top: l.yPercent + "%",
        },
        icon: getIcon(seed.value, l as NightreignLocation),
    })
));

const camps = computed(() => styledLocations.value.filter(l => mapPoints.value.includes(l.name)));

function getIcon(seed: number, location: NightreignLocation): string | null {
    if (seedData == null) { return null; }

    switch(location.type) {
        case ("Evergaol"):
            return icons.Evergaol;

        case ("Castle"):
            return icons.Castle;
        
        case ("FieldBoss"):
            // TODO Differentiate major and minor bosses
            return icons["Field Boss Minor"];
        
        case ("MajorCamp"):
        case ("MinorCamp"):
            const rawContents = seedData.value[location.name as keyof typeof seedData.value] as string | undefined;

            if (rawContents == undefined) {
                console.error(`Unknown location ${location.name}`);
                return null;
            }

            const [type, specifics] = rawContents.split(" - ");

            const icon = icons[type as keyof typeof icons];

            // TODO draw map events if appropriate
            if (icon == undefined && type != "Small Camp" && type != "Map Event") {
                console.error(`Unknown icon ${icon}`);
            }

            return icon ?? null;

        // TODO draw circles, frenzy towers, rot blessings
        default:
            return null; 
    }
}
</script>
<style lang="scss" scoped>
.poi {
    position: absolute;
    transform: translate(-50%, -50%);
}

.map-container {
    width: 1536px;
    height: 1536px;
    position: relative;
}
</style>
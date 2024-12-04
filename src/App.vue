<template>
    <main>
        <v-row>
            <v-col cols="1">
                <NavMenu />
            </v-col>
            <v-col cols="11">
                <RouterView />
            </v-col>
        </v-row>
    </main>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import NavMenu from "./components/NavMenu.vue";
</script>

<template>
    <main>
        <v-app>
            <v-app-bar-nav-icon @click="toggleNav" />
            <NavMenu v-model="nav"/>
            <RouterView />
        </v-app>
    </main>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import NavMenu from "./components/NavMenu.vue";
import { ref } from "vue";

const nav = ref(false);

function toggleNav() {
    nav.value = !nav.value;
}
</script>

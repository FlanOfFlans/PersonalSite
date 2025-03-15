<template>
</template>
<script setup lang="ts">
    import { Application } from 'pixi.js';
    import { useTheme } from 'vuetify';
    import { computed } from 'vue';

    const theme = useTheme();
    const backgroundColor = computed(() => theme.current.value.colors.background);

    const app = new Application();
    await app.init({ background: backgroundColor.value });

    
</script>
<template>
    <canvas ref="canvas"></canvas>
</template>
<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';

const canvas = useTemplateRef<HTMLCanvasElement>("canvas");

onMounted(() => {
    const ctx = canvas.value?.getContext("2d");
    ctx?.beginPath()
    ctx?.rect(20, 20, 150, 150);
    ctx?.stroke();
})
</script>
<style lang="scss" scoped>
</style>
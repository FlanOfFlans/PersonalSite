<template>
    <canvas ref="canvas" width="500px" height="500px"></canvas>
</template>
<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';

const TRAVEL_PER_FRAME = 80 * 0.03;
const RIPPLE_FRAME_MS = 80;
const RIPPLE_FREQUENCY_FRAMES = 12;
const COLOR1 = 'rgb(202, 53, 123)';
const COLOR2 = 'rgb(105, 72, 183)';

const canvas = useTemplateRef<HTMLCanvasElement>("canvas");

onMounted(() => {
    if (canvas.value == null) { return; }

    const ctx = canvas.value.getContext("2d");
    const begin_frame = Math.floor(performance.now() / RIPPLE_FRAME_MS);

    const draw = () => {

        const dpr = window.devicePixelRatio || 1;
        const w = canvas.value?.clientWidth ?? 0;
        const h = canvas.value?.clientHeight ?? 0;

        if (canvas.value == null || ctx == null || w == 0 || h == 0) {
            return;
        }

        const pxW = Math.round(w * dpr);
        const pxH = Math.round(h * dpr);

        if (canvas.value?.width !== pxW || canvas.value?.height !== pxH) {
            canvas.value.width = pxW;
            canvas.value.height = pxH;
        }

        const centerX = Math.round(pxW / 2)
        const centerY = Math.round(pxH / 2)

        const frame = Math.floor(performance.now() / RIPPLE_FRAME_MS) - begin_frame;
        const travel = frame * TRAVEL_PER_FRAME;

        ctx.clearRect(0, 0, pxW, pxH);
        ctx.arc(centerX, centerY, travel, 0, Math.PI * 2);
        const color = frame % Math.floor(RIPPLE_FREQUENCY_FRAMES * 2) < RIPPLE_FREQUENCY_FRAMES ? COLOR1 : COLOR2;
        ctx.fillStyle = color;
        ctx.fill();

        requestAnimationFrame(draw);
    }

    draw();
})
</script>
<style lang="scss" scoped>
</style>
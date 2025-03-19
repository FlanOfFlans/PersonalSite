<template>
<v-sheet
    rounded
    elevation="5"
    height="100%"
    width="65%"
    class="pa-2"
>
    <div v-if="post != null">
        <h3 class="test">{{ post.title }}</h3>
        <v-divider :thickness = "3" class="mb-1"/>
        <div v-html="renderedBody" class="markdown"></div>
    </div>
    <div v-else class="text-disabled">
        This post could not be loaded.
    </div>
</v-sheet>
</template>
<script setup lang="ts">
import { useBlogStore } from './blogStore';
import { computed, onMounted } from 'vue';
import markdownit from 'markdown-it';

const store = useBlogStore();
const md = markdownit();
const props = defineProps<{
    postName: string;
}>();

const post = computed(() => store.getPost(props.postName));
const renderedBody = computed(() => post.value != null ? md.render(post.value.body) : null);

onMounted(() => {
    store.loadPost(props.postName);
})
</script>
<style lang="scss" scoped>
.markdown ::v-deep p {
    margin-bottom: 8px;
}
</style>
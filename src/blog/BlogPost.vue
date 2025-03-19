<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github-dark-dimmed.css">
<v-sheet
    rounded
    elevation="5"
    height="100%"
    width="65%"
    class="pa-3"
>
    <div v-if="post != null">
        <h2 class="test">{{ post.title }}</h2>
        <v-divider :thickness = "3" class="mb-1 mt-n2"/>
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
// Highlight JS doesn't include type defs for CDN assets, and we don't need them
// @ts-ignore
import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/es/highlight.min.js';

const store = useBlogStore();
const md = new markdownit()
    .set({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(str, { language: lang }).value;
                } catch {}
            }

            return str;
    }});
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
    margin-bottom: 12px;
}

.markdown ::v-deep pre {
    margin-bottom: 12px;
    background-color: rgb(var(--v-theme-codeblock));
    padding: 8px;
    border-radius: 10px;
}

.markdown ::v-deep li {
    margin-left: 20px;
}
</style>
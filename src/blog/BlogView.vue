<template>
<div class="ga-4">
    <v-container v-for="postName in postNames" class="d-flex justify-center">
        <BlogPost :postName/> 
    </v-container>
</div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useBlogStore } from './blogStore';
import BlogPost from './BlogPost.vue';

const store = useBlogStore();
const postNames = computed(() => store.getPostNames());

store.loadPostNames();
console.log(store.getPostNames());
</script>
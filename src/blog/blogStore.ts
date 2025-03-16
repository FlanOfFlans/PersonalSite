import { defineStore } from 'pinia';
import { Post } from './blogApi';

interface BlogState {
    posts: Map<string, Post>;
    postNames: string;
}

export const useBlogStore = defineStore('blog', {
    state: (): BlogState => ({
        posts: new Map<string, Post>(),
        postNames: ""
    }),

    getters: {
        getPost(state) { }
    }
})
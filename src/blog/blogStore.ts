import { defineStore } from 'pinia';
import { Post } from './blogApi';
import { blogApi } from './blogApi';

interface BlogState {
    posts: Map<string, Post>;
    postNames: string[];
}

export const useBlogStore = defineStore('blog', {
    state: (): BlogState => ({
        posts: new Map<string, Post>(),
        postNames: []
    }),

    actions: {
        async loadPost(fileName: string, force = false) {
            if (this.posts.has(fileName) && !force) {
                return;
            }

            let post = await blogApi.getPost(fileName);
            if (post == undefined) { return; }
            this.posts.set(fileName, post);
        },

        async loadPostNames(force = false) {
            if (this.postNames.length > 0 && force == false) {
                return;
            }

            let postNames = await blogApi.getPostNames();
            this.postNames = postNames;
        }
    },

    getters: {
        getPost(state) { return (fileName: string) => {            
            return state.posts.get(fileName);
        }},

        getPostNames(state) { return () => {
            return state.postNames;
        }}
    }
})

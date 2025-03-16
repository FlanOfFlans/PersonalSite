import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import fs from "fs";

const postsPath = "/public/cms/posts";
const postManifestPath = "/public/cms/postManifest.json";

// https://vite.dev/config/
export default defineConfig(({ command }) => { return {
    plugins: [
        vue(), 
        vueDevTools(),
        {
            name: 'build-page-manifest',
            buildStart(options) {
                if (command === "build") {
                    const postNames = fs.readdirSync(postsPath);
                    // Default sort works because ISO-8601 is lexicographically ordered
                    // That said this has flaws with e.g. posting multiple posts in a day
                    // TODO Ideally we want to read this and sort by internal timestamp
                    // Also lets us skip over invalid posts
                    postNames.sort((a,b) => a < b ? 1 : -1); 
                    const json = JSON.stringify({ posts: postNames });
                    fs.writeFileSync(postManifestPath, json);
                }
            }
        }
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@c": fileURLToPath(new URL("./src/components", import.meta.url)),
        },
    },
    server: {
        port: 5000,
    },
}});

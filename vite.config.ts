import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import commonjs from 'vite-plugin-commonjs'
import fs from "fs";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => { return {
    plugins: [
        vue(), 
        vueDevTools(),
        commonjs(),
        {
            name: 'build-page-manifest',
            buildStart(options) {
                if (command === "build") {
                    console.log("Building post manifest...");
                    const startTime = Date.now(); 

                    const env = loadEnv(mode, process.cwd());
                    const postPath = path.join(__dirname, env.VITE_POST_PATH);
                    const manifestPath = path.join(__dirname, env.VITE_POST_MANIFEST_PATH);
                    const postNames = fs.readdirSync(postPath);
                    // Default sort works because ISO-8601 is lexicographically ordered
                    // That said this has flaws with e.g. posting multiple posts in a day
                    // TODO Ideally we want to read this and sort by internal timestamp
                    // Also lets us skip over invalid posts
                    postNames.sort((a,b) => a < b ? 1 : -1); 
                    const json = JSON.stringify({ posts: postNames });
                    fs.writeFileSync(manifestPath, json);

                    const endTime = Date.now();
                    console.log(`Built post manifest in ${endTime - startTime}ms`);
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

import axios from "axios";
import { safeLoadFront } from 'yaml-front-matter';

export interface Post {
    title: string,
    date: Date,
    body: string,
    tags: string[]
}

async function getPost(name: string) {
    const rawData = (await axios.get<string>(`cms/content/posts/${name}`)).data;
    if (rawData == null) { return; }

    const data = safeLoadFront(rawData);

    return {
        title: data.title,
        date: new Date(data.date),
        tags: data.tags,
        body: data.__content.trim(),
    };
}

async function getPostNames() {
    return (await axios.get<{posts: string[]}>(`cms/postManifest.json`))
        .data
        .posts;
}

export const blogApi = {
    getPost,
    getPostNames,
}
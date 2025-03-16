import axios from "axios";

const contentPrefix = 'public/cms/content/'

interface Post {

}

export async function getPost(name: string) {
    return (await axios.get<Post>(`${contentPrefix}/posts/${name}`)).data;
}

export async function getPostNames() {
    return (await axios.get<{posts: string[]}>(`${contentPrefix}/postManifest.json`))
        .data
        .posts;
}
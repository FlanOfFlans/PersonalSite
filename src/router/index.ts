import { createRouter, createWebHistory } from "vue-router";
import DayView from "../views/DayView.vue";
import AboutView from "@/views/AboutView.vue";
import BlogView from "@/blog/BlogView.vue";
import SolitaireView from "@/views/SolitaireView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/aoc2024",
        },
        {
            path: "/aoc2024",
            name: "About",
            component: AboutView,
        },
        {
            path: "/aoc2024/days/:dayNum",
            name: "Day",
            component: DayView,
        },
        {
            path: "/blog",
            name: "Blog Home",
            component: BlogView,
        },
        {
            path: "/solitaire",
            name: "Solitaire",
            component: SolitaireView,
        },
    ],
});

export default router;

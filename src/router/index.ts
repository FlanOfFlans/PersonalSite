import { createRouter, createWebHistory } from "vue-router";
import DayView from "../views/DayView.vue";
import AboutView from "@/views/AboutView.vue";

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
    ],
});

export default router;

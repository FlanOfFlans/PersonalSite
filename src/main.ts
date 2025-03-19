import "./assets/main.css";

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css"
import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vuetify/lib/styles/main.sass";
import { createPinia } from "pinia";

const app = createApp(App);

app.directive("visible", (element, binding) => {
    element.style.visibility = !!binding.value ? "visible" : "hidden";
});

const lightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: "#eeeeee",
        surface: "#ffffff",
        primary: "#6002EE",
        secondary: "#6C6C6C",
        error: "#ff1f1f",
        success: "#09af00",
        info: "#021aee",
        warning: "#ee6002",
    },
};

const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        background: "#121212",
        surface: "#222222",
        primary: "#976cde",
        secondary: "#949494",
        error: "#ff1f1f",
        success: "#c4f174",
        info: "#bfc7f9",
        warning: "#f78b3b",
    },
};

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: "darkTheme",
        themes: {
            lightTheme,
            darkTheme,
        },
        variations: {
            colors: ["primary", "surface", "secondary", "error", "success", "info", "warning"],
            lighten: 2,
            darken: 2,
        },
    },
});

const pinia = createPinia();

app
    .use(router)
    .use(vuetify)
    .use(pinia);

app.mount("#app");

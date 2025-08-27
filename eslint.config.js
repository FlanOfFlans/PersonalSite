//@ts-check
import eslintPluginVue from "eslint-plugin-vue";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/recommended"],
    {
        ignores: ["eslint.config.js"],
        rules: {
            // allow unused vars if they start with an underscore
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],

            "vue/block-lang": ["error", { script: { lang: "ts" }, style: { lang: "scss" } }],
            "vue/custom-event-name-casing": ["error", "kebab-case"],
            "vue/no-child-content": "error",
            "vue/no-duplicate-attr-inheritance": "error",
            "vue/component-api-style": "error",
            "vue/block-tag-newline": ["error", { singleline: "always", multiline: "always" }],
            "vue/no-useless-v-bind": 1,
            "vue/define-emits-declaration": 1,
            "vue/define-props-declaration": 1,
            // allow shadowing "props" because vuetify uses that name for some slots
            "vue/no-template-shadow": ["error", { allow: ["props"] }],

            // stylistic
            "newline-per-chained-call": ["warn"],
            "arrow-body-style": ["warn", "as-needed"],
            "func-style": ["error", "declaration"],
            "vue/component-tags-order": ["warn", { order: ["template", "script", "style"] }],
        },
        plugins: {
            "typescript-eslint": tseslint.plugin,
            "@stylistic": stylistic,
        },
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
                project: "./tsconfig.app.json",
                extraFileExtensions: [".vue"],
                sourceType: "module",
            },
        },
    },
    {
        ignores: ["eslint.config.js"],
        files: ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
        extends: [...eslintPluginVue.configs["flat/recommended"]],
        rules: {
            // rules that require type info for linting go here
            "@typescript-eslint/no-unnecessary-condition": "error",
            "@typescript-eslint/no-redundant-type-constituents": "warn",
            "@typescript-eslint/switch-exhaustiveness-check": "warn",
            "@typescript-eslint/no-confusing-void-expression": [
                "warn",
                { ignoreArrowShorthand: true },
            ],
            // already covered by no-base-to-string
            "@typescript-eslint/restrict-template-expressions": "off",
        },
    },
    eslintConfigPrettier
);

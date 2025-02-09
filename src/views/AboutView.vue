<template>
    <v-container width="30%">
        <v-card>

            <template #title> Hello! </template>
            <template #text>
                <div class="paragraph">
                    I am Rain Yohe (they/them), a freelance web developer since 2021. I've been
                    putting off making a portfolio site for ages, but with
                    <a href="https://adventofcode.com/2024">Advent of Code 2024</a> coming around, I
                    thought I'd take the chance to put one together and show off some of my work.
                    It's pretty bare-bones right now, but hopefully soon, it'll be a better showcase
                    of my abilities.
                </div>
                <br />
                <div class="paragraph">
                    I primarily work in Vue and .NET with EFCore, along with some grounding in
                    Angular and Flask.
                </div>
                <br />
                <div class="paragraph">
                    I can be reached at
                    <a href="mailto:rain.yohe@gmail.com">rain.yohe@gmail.com</a>, for business
                    inquiries, networking, or just to say hello!
                </div>
            </template>
        </v-card>
    </v-container>
</template>
<script setup lang="ts"></script>
<style>
.paragraph {
    text-indent: 25px;
    line-height: 1.6;
    font-size: 15px;
}
</style>

<template>
    <template v-for="item in items" :key="item.id">
        <v-list>
            <v-list-item
                v-if="isLink(item)"
                link
                rounded
                :to="item.to"
                :active="!!item.active"
                :title="item.title"
                :variant="(item.to as any).name == route ? 'tonal' : 'text'"
                @click="emit('close')"
            />
            <v-list-group
                v-else 
                :value="item.id"
            >
                
                <template #activator="{ props }">
                    <v-list-item v-bind="props" :title="item.title">
                        <template #prepend>
                        </template>
                    </v-list-item>
                </template>
                <div class="ml-5">                    
                    <NavGroup
                        :items="item.children"
                        :route="route"
                    />
                </div>
            </v-list-group>
        </v-list>
    </template>

</template>
<script setup lang="ts">
import { NavItem, NavItemLink, NavItemGroup } from "@c/index.ts";
import { RouteLocationRaw } from "vue-router";

const props = defineProps<{
    items: NavItem[];
    route: RouteLocationRaw;
}>();

const emit = defineEmits<{
    close: [];
}>();

function isLink(item: NavItem): item is NavItemLink {
    return !("children" in item)
}
</script>
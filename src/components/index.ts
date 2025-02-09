import { RouteLocationRaw } from "vue-router";

export type NavItemBase = {
    id: string;
    icon?: string;
    title: string;
    active?: boolean;
}

export type NavItemLink = NavItemBase & {
    to: RouteLocationRaw;
}

export type NavItemGroup = NavItemBase & {
    children: NavItem[];
}

export type NavItem = NavItemLink | NavItemGroup;
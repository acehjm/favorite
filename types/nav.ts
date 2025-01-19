import { Route } from 'next';

export type SidebarNavItem = {
    title: string;
    href: Route;
    icon?: string;
    label?: string;
    disabled?: boolean;
};

export type NavItemWithChildren = {
    title: string;
    href: Route;
    icon?: string;
    disabled?: boolean;
    external?: boolean;
    label?: string;
    description?: string;
};

export type MainNavItem = NavItemWithChildren;

export type SidebarNavItems = {
    data: SidebarNavItem[];
};

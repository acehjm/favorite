import type { SidebarNavItem } from '@/types/nav';

export const sidebarNavItems: SidebarNavItem[] = [
    {
        title: '全部书签',
        href: '/bookmarks',
        icon: 'BookmarkIcon',
    },
    {
        title: '置顶书签',
        href: '/bookmarks/pinned',
        icon: 'PinIcon',
    },
    {
        title: '未分类',
        href: '/bookmarks/untagged',
        icon: 'TagIcon',
    },
    {
        title: '标签管理',
        href: '/tags',
        icon: 'TagsIcon',
    },
    {
        title: '统计分析',
        href: '/analytics',
        icon: 'BarChartIcon',
    },
];

export const bottomNavItems: SidebarNavItem[] = [
    {
        title: '设置',
        href: '/settings',
        icon: 'GearIcon',
    },
    {
        title: '帮助',
        href: '/help',
        icon: 'QuestionMarkIcon',
    },
];

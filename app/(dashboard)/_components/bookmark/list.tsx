'use client';

import { useState } from 'react';
import {
    DrawingPinIcon,
    DotsHorizontalIcon,
    ExternalLinkIcon,
    TrashIcon,
    Pencil2Icon,
} from '@radix-ui/react-icons';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

import { cn } from '@/lib/utils';
import { useBookmarkStore } from '@/lib/store/bookmark-store';
import type { Bookmark } from '@/types/bookmark';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface BookmarkListItemProps {
    bookmark: Bookmark;
}

interface BookmarkListProps {
    bookmarks: Bookmark[];
}

function BookmarkListItem({ bookmark }: BookmarkListItemProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { togglePin, deleteBookmark } = useBookmarkStore();

    const handleTogglePin = async () => {
        setIsLoading(true);
        await togglePin(bookmark.id);
        setIsLoading(false);
    };

    const handleDelete = async () => {
        setIsLoading(true);
        await deleteBookmark(bookmark.id);
        setIsLoading(false);
    };

    return (
        <div className="group flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                    <h3 className="font-medium">
                        <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            {bookmark.title}
                        </a>
                    </h3>
                    {bookmark.isPinned && (
                        <DrawingPinIcon className="h-4 w-4 text-primary" />
                    )}
                </div>
                {bookmark.description && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                        {bookmark.description}
                    </p>
                )}
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>
                        {formatDistanceToNow(bookmark.createdAt, {
                            addSuffix: true,
                            locale: zhCN,
                        })}
                    </span>
                    {bookmark.tags.length > 0 && (
                        <>
                            <span>•</span>
                            <span>
                                {bookmark.tags
                                    .map((tag) => tag.name)
                                    .join(', ')}
                            </span>
                        </>
                    )}
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        'h-8 w-8',
                        !bookmark.isPinned &&
                        'opacity-0 group-hover:opacity-100'
                    )}
                    onClick={handleTogglePin}
                    disabled={isLoading}
                >
                    <DrawingPinIcon className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={isLoading}
                        >
                            <DotsHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">打开菜单</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <a
                                href={bookmark.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                            >
                                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                                <span>访问链接</span>
                            </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Pencil2Icon className="mr-2 h-4 w-4" />
                            <span>编辑</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={handleDelete}
                        >
                            <TrashIcon className="mr-2 h-4 w-4" />
                            <span>删除</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export function BookmarkList({ bookmarks }: BookmarkListProps) {
    const { isLoading } = useBookmarkStore();

    if (isLoading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, _i) => (
                    <div
                        className="h-[200px] rounded-lg border border-border bg-card p-4"
                    >
                        <div className="space-y-3">
                            <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
                            <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!bookmarks.length) {
        return (
            <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                    <h3 className="mt-4 text-lg font-semibold">暂无书签</h3>
                    <p className="mb-4 mt-2 text-sm text-muted-foreground">
                        添加一些书签，开始管理您的收藏吧
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {bookmarks.map((bookmark) => (
                <BookmarkListItem key={bookmark.id} bookmark={bookmark} />
            ))}
        </div>
    );
}

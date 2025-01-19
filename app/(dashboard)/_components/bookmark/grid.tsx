'use client';

import { useBookmarkStore } from '@/lib/store/bookmark-store';
import { BookmarkCard } from './card';

export function BookmarkGrid() {
    const { bookmarks, isLoading } = useBookmarkStore();

    if (isLoading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-[300px] rounded-lg border bg-muted/10 animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (bookmarks.length === 0) {
        return (
            <div className="flex h-[400px] items-center justify-center rounded-lg border bg-muted/10">
                <p className="text-center text-muted-foreground">
                    暂无书签，快去添加吧！
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {bookmarks.map((bookmark) => (
                <BookmarkCard key={bookmark.id} bookmark={bookmark} />
            ))}
        </div>
    );
}

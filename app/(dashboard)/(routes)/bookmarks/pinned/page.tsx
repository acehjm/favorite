'use client';

import { BookmarkList } from '@/app/(dashboard)/_components/bookmark/list';
import { useBookmarkStore } from '@/lib/store/bookmark-store';

export default function PinnedBookmarksPage() {
  const { bookmarks } = useBookmarkStore((state) => ({
    bookmarks: state.bookmarks.filter((bookmark) => bookmark.isPinned),
  }));

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">置顶书签</h1>
        <p className="text-sm text-muted-foreground">
          这里显示所有被置顶的书签
        </p>
      </div>
      <BookmarkList bookmarks={bookmarks} />
    </div>
  );
}

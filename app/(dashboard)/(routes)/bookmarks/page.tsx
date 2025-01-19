'use client';

import { useState } from 'react';
import { BookmarkList } from '@/app/(dashboard)/_components/bookmark/list';
import { EditDialog } from '@/app/(dashboard)/_components/bookmark/edit-dialog';
import { useBookmarkStore } from '@/lib/store/bookmark-store';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';

export default function BookmarksPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { bookmarks, sort } = useBookmarkStore((state) => ({
    bookmarks: state.bookmarks,
    sort: state.sort,
  }));

  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    switch (sort) {
      case 'created-desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'created-asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'updated-desc':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'updated-asc':
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">我的书签</h1>
          <p className="text-sm text-muted-foreground">
            管理和组织您的所有书签
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          添加书签
        </Button>
      </div>
      <BookmarkList bookmarks={sortedBookmarks} />
      <EditDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}

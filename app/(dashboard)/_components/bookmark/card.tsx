'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useBookmarkStore } from '@/lib/store/bookmark-store';
import type { Bookmark } from '@/types/bookmark';
import {
  DotsHorizontalIcon,
  DrawingPinIcon,
  Pencil2Icon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import Image from 'next/image';
import { useState } from 'react';

import { EditDialog } from './edit-dialog';

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const { deleteBookmark, togglePin } = useBookmarkStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteBookmark(bookmark.id);
    } catch (error) {
      console.error('Failed to delete bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePin = async () => {
    try {
      setIsLoading(true);
      await togglePin(bookmark.id);
    } catch (error) {
      console.error('Failed to toggle pin:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formattedDate = formatDistanceToNow(new Date(bookmark.createdAt), {
    addSuffix: true,
    locale: zhCN,
  });

  return (
    <>
      <div className="group relative flex flex-col space-y-2 rounded-lg border p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="relative h-16 w-16 overflow-hidden rounded">
              {(bookmark.image || bookmark.cover) ? (
                <Image
                  src={bookmark.image || bookmark.cover || ''}
                  alt={bookmark.title}
                  className="object-cover"
                  fill
                  sizes="64px"
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </div>
            <div className="space-y-1">
              <h3 className="font-medium leading-none">{bookmark.title}</h3>
              <p className="text-sm text-muted-foreground">{bookmark.url}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'h-8 w-8',
                !bookmark.isPinned && 'opacity-0 group-hover:opacity-100',
              )}
              onClick={handleTogglePin}
              disabled={isLoading}
            >
              <DrawingPinIcon
                className={cn(
                  'h-4 w-4',
                  bookmark.isPinned && 'text-primary',
                )}
              />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100"
                  disabled={isLoading}
                >
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => setShowEditDialog(true)}
                >
                  <Pencil2Icon className="mr-2 h-4 w-4" />
                  编辑
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center text-destructive"
                  onClick={handleDelete}
                >
                  <TrashIcon className="mr-2 h-4 w-4" />
                  删除
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {bookmark.description && (
          <p className="text-sm text-muted-foreground">
            {bookmark.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {bookmark.tags?.map((tag) => (
              <span
                key={tag.id}
                className={cn(
                  'rounded-full bg-secondary px-2 py-1 text-xs',
                  tag.color && `bg-${tag.color}-100 text-${tag.color}-900`,
                )}
              >
                {tag.name}
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
        >
          <span className="sr-only">在新标签页中打开</span>
        </a>
      </div>
      <EditDialog
        bookmark={bookmark}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  );
}

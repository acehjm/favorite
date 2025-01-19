'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useBookmarkStore } from '@/lib/store/bookmark-store';
import type { Bookmark } from '@/types/bookmark';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const bookmarkFormSchema = z.object({
    title: z.string().min(1, '标题不能为空'),
    url: z.string().url('请输入有效的 URL'),
    description: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.object({
        id: z.string(),
        name: z.string(),
        color: z.string().optional(),
        isPrivate: z.boolean().optional(),
    })).default([]),
});

type BookmarkFormValues = z.infer<typeof bookmarkFormSchema>;

interface EditDialogProps {
    bookmark?: Bookmark;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditDialog({ bookmark, open, onOpenChange }: EditDialogProps) {
    const { addBookmark, updateBookmark, tags: _tags } = useBookmarkStore();
    const [isLoading, setIsLoading] = React.useState(false);

    const form = useForm<BookmarkFormValues>({
        resolver: zodResolver(bookmarkFormSchema),
        defaultValues: {
            title: bookmark?.title || '',
            url: bookmark?.url || '',
            description: bookmark?.description || '',
            image: bookmark?.image || '',
            tags: bookmark?.tags || [],
        },
    });

    const onSubmit = async (values: BookmarkFormValues) => {
        try {
            setIsLoading(true);
            if (bookmark) {
                await updateBookmark(bookmark.id, values);
            } else {
                await addBookmark(values);
            }
            onOpenChange(false);
            form.reset();
        } catch (error) {
            console.error('Failed to save bookmark:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {bookmark ? '编辑书签' : '添加书签'}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>标题</FormLabel>
                                    <FormControl>
                                        <Input placeholder="输入书签标题" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>描述</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="输入书签描述（可选）"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>图片</FormLabel>
                                    <FormControl>
                                        <Input placeholder="输入图片 URL（可选）" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end space-x-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={isLoading}
                            >
                                取消
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? '保存中...' : '保存'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

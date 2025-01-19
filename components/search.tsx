'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import {
    CommandDialog,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/command-menu';
import { Button } from '@/components/ui/button';

export function Search() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <>
            <Button
                variant="outline"
                className="relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
                onClick={() => setOpen(true)}
            >
                <span className="hidden lg:inline-flex">搜索书签...</span>
                <span className="inline-flex lg:hidden">搜索...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="输入关键词搜索..." />
                <CommandList>
                    <CommandEmpty>未找到相关结果</CommandEmpty>
                    <CommandGroup heading="建议">
                        <CommandItem
                            onSelect={() =>
                                runCommand(() => router.push('/bookmarks'))
                            }
                        >
                            <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
                            <span>搜索全部书签</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() =>
                                runCommand(() =>
                                    router.push('/bookmarks/pinned')
                                )
                            }
                        >
                            <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
                            <span>搜索置顶书签</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="标签">
                        {/* 这里将来会动态加载标签列表 */}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}

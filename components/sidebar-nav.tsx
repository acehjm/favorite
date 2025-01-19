'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Icons from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import type { SidebarNavItem } from '@/types/nav';

interface SidebarNavProps {
    items: SidebarNavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
    const pathname = usePathname();

    return (
        <nav className="grid items-start gap-2">
            {items.map((item, index) => {
                const Icon = Icons[item.icon as keyof typeof Icons];
                return (
                    item.href && (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                buttonVariants({ variant: 'ghost' }),
                                pathname === item.href
                                    ? 'bg-muted hover:bg-muted'
                                    : 'hover:bg-transparent hover:underline',
                                'justify-start'
                            )}
                        >
                            {Icon && <Icon className="mr-2 h-4 w-4" />}
                            <span>{item.title}</span>
                            {item.label && (
                                <span className="ml-auto text-xs text-muted-foreground">
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    )
                );
            })}
        </nav>
    );
}

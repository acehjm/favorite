'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SidebarNavItem } from '@/types/nav';
import * as Icons from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MainNavProps {
  items: SidebarNavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        const Icon = Icons[item.icon as keyof typeof Icons];
        return (
          item.href && (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                pathname === item.href
                  ? 'bg-muted hover:bg-muted'
                  : 'hover:bg-transparent hover:underline',
                'justify-start',
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

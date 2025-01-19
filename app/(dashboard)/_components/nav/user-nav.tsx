'use client';

import { GearIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

export function UserNav() {
    return (
        <nav className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
                <GearIcon className="h-4 w-4" />
                <span className="sr-only">设置</span>
            </Button>
        </nav>
    );
}

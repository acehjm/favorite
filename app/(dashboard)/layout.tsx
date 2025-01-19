import { bottomNavItems, sidebarNavItems } from '@/config/nav';
import { type ReactNode } from 'react';
import { MainNav } from './_components/nav/main-nav';
import { UserNav } from './_components/nav/user-nav';
import { SearchBar } from './_components/search/search-bar';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">书签管理</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <SearchBar />
            </div>
            <UserNav />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* Sidebar */}
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="h-full py-6 pl-8 pr-6 lg:py-8">
            <div className="flex flex-col justify-between h-full">
              <MainNav items={sidebarNavItems} />
              <MainNav items={bottomNavItems} />
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
}

import { Search } from '@/components/search';

export default function Home() {
    return (
        <div className="flex flex-col">
            {/* Search Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <div className="mr-4 hidden md:flex">
                        <a
                            className="mr-6 flex items-center space-x-2"
                            href="/"
                        >
                            <span className="hidden font-bold sm:inline-block">
                                书签管理
                            </span>
                        </a>
                    </div>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <div className="w-full flex-1 md:w-auto md:flex-none">
                            <Search />
                        </div>
                        {/* User nav will be added here */}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container grid gap-12 py-8">
                <div className="flex flex-col items-start gap-4">
                    <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
                        欢迎使用 Favorite
                    </h1>
                    <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
                        高效的书签管理工具，帮助你更好地组织和管理网络收藏
                    </p>
                </div>
            </div>
        </div>
    );
}

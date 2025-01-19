import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '帮助 - Favorite',
    description: '查看帮助文档和使用指南',
};

export default async function HelpPage() {
    return (
        <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">帮助中心</h2>
            </div>
            <div className="prose prose-gray max-w-none">
                {/* 帮助文档将在这里实现 */}
            </div>
        </div>
    );
}

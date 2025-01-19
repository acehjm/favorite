import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '标签管理 - Favorite',
    description: '管理您的书签标签',
};

export default async function TagsPage() {
    return (
        <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">标签管理</h2>
            </div>
            <Suspense fallback={<div>加载中...</div>}>
                {/* 标签列表将在这里实现 */}
            </Suspense>
        </div>
    );
}

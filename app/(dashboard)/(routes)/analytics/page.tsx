import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '统计分析 - Favorite',
    description: '查看书签使用统计和分析',
};

export default async function AnalyticsPage() {
    return (
        <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">统计分析</h2>
            </div>
            <Suspense fallback={<div>加载中...</div>}>
                {/* 统计图表将在这里实现 */}
            </Suspense>
        </div>
    );
}

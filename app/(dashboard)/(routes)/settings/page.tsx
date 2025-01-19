import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '设置 - Favorite',
    description: '管理您的应用设置',
};

export default async function SettingsPage() {
    return (
        <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">设置</h2>
            </div>
            <div className="grid gap-4">{/* 设置选项将在这里实现 */}</div>
        </div>
    );
}

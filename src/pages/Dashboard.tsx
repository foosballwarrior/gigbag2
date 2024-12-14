import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-8">Welcome back, Musician</h1>
            <DashboardGrid />
          </div>
        </main>
      </div>
    </div>
  );
}
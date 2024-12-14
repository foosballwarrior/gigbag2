import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { dashboardNavItems } from '@/config/dashboard';

export function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hidden lg:flex h-screen w-64 flex-col fixed left-0 top-16 border-r bg-muted/10">
      <nav className="flex-1 space-y-1 p-4">
        {dashboardNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.title}
              variant="ghost"
              className={cn(
                'w-full justify-start gap-2',
                isActive && 'bg-primary/10 text-primary'
              )}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
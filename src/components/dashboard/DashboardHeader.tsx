import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserNav } from './UserNav';
import { SearchBar } from './SearchBar';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">GigBag</span>
          </a>
          <SearchBar />
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
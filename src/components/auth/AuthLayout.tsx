import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Auth Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>

      {/* Right: Hero Image */}
      <div className="hidden lg:block relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-background" />
      </div>
    </div>
  );
}
import { Music2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Music2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">GigBag</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</a>
            <a href="#support" className="text-sm hover:text-primary transition-colors">Support</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button onClick={handleDashboardClick}>
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={handleSignOut}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</a>
              <a href="#support" className="text-sm hover:text-primary transition-colors">Support</a>
              {user ? (
                <>
                  <Button onClick={handleDashboardClick}>
                    Dashboard
                  </Button>
                  <Button variant="ghost" onClick={handleSignOut}>
                    Sign out
                  </Button>
                </>
              ) : (
                <div className="pt-4 flex flex-col space-y-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
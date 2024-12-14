import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HeroFeatures } from './HeroFeatures';
import { useAuth } from '@/hooks/use-auth';

export function HeroContent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSongLibraryClick = () => {
    if (user) {
      navigate('/songs');
    } else {
      navigate('/login', { state: { from: '/songs' } });
    }
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        Your Complete Digital
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 animate-gradient">
          {' '}Music Toolbox
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground mb-8">
        Organize your music, create setlists, and collaborate with band members.
        Everything you need in one place.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg" 
          className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          onClick={handleSongLibraryClick}
        >
          Open Song Library
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="border-purple-500/20 hover:bg-purple-500/10"
          asChild
        >
          <Link to="/signup">Try GigBag Pro</Link>
        </Button>
      </div>

      <HeroFeatures />
    </div>
  );
}
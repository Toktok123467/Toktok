
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Headphones, Music, Award, Star, Share, Heart } from 'lucide-react';

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

const mainNavItems: NavItem[] = [
  { title: 'Home', icon: Home, path: '/' },
  { title: 'Popular Remixes', icon: Star, path: '/popular' },
  { title: 'Voice Battles', icon: Headphones, path: '/battles' },
  { title: 'Featured Battles', icon: Award, path: '/featured' },
  { title: 'NFT Marketplace', icon: Music, path: '/marketplace' },
];

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className="hidden md:flex h-[calc(100vh-64px)] w-64 flex-col border-r border-border/40 bg-sidebar">
      <div className="flex flex-col gap-1 p-4">
        <p className="text-xs font-medium text-muted-foreground px-2 mb-2">BROWSE</p>
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors
                ${isActive(item.path) 
                  ? 'bg-toktok-purple/20 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
                }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-4 flex flex-col gap-1 p-4 border-t border-border/40">
        <p className="text-xs font-medium text-muted-foreground px-2 mb-2">TRENDING TOPICS</p>
        <div className="flex flex-wrap gap-2 px-2">
          <Link to="/search?q=rap" className="text-xs bg-secondary/80 hover:bg-secondary px-2 py-1 rounded-full">#rap</Link>
          <Link to="/search?q=hiphop" className="text-xs bg-secondary/80 hover:bg-secondary px-2 py-1 rounded-full">#hiphop</Link>
          <Link to="/search?q=remix" className="text-xs bg-secondary/80 hover:bg-secondary px-2 py-1 rounded-full">#remix</Link>
          <Link to="/search?q=voiceclone" className="text-xs bg-secondary/80 hover:bg-secondary px-2 py-1 rounded-full">#voiceclone</Link>
          <Link to="/search?q=aibattle" className="text-xs bg-secondary/80 hover:bg-secondary px-2 py-1 rounded-full">#aibattle</Link>
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t border-border/40">
        <div className="rounded-lg bg-card p-4">
          <h4 className="font-medium text-sm mb-2">Create a Remix</h4>
          <p className="text-xs text-muted-foreground mb-3">
            Fork content and create your own remix narratives
          </p>
          <Link to="/create">
            <button className="w-full bg-gradient-to-r from-toktok-purple to-toktok-blue text-white text-sm py-2 rounded-md hover:opacity-90 transition">
              Start Creating
            </button>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

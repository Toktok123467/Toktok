
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold gradient-text">TokTok</span>
        </Link>
        
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <Input
            type="search"
            placeholder="Search clips, themes, battles..."
            className="pr-10 bg-muted/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            type="submit" 
            size="icon" 
            variant="ghost" 
            className="absolute right-0 top-0"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
        
        <div className="flex items-center gap-4">
          <Link to="/search" className="md:hidden">
            <Button size="icon" variant="ghost">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Creator Dashboard
            </Button>
          </Link>
          
          <Link to="/wallet">
            <Button className="bg-gradient-to-r from-toktok-purple to-toktok-pink hover:opacity-90">
              Connect Wallet
            </Button>
          </Link>
          
          <Link to="/profile">
            <Button size="icon" variant="ghost">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu, Home, Compass, Image, Play, Plus, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useSuiWallet } from '@/hooks/useSuiWallet';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();
  const { isConnected, address, connect, disconnect } = useSuiWallet();
  const [isConnecting, setIsConnecting] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const mobileNavItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Browse', path: '/popular' },
    { icon: Play, label: 'Battles', path: '/battles' },
    { icon: Image, label: 'NFT Market', path: '/marketplace' },
    { icon: User, label: 'Dashboard', path: '/dashboard' },
    { icon: Plus, label: 'Create Remix', path: '/create' },
  ];

  const handleWalletClick = async () => {
    if (isConnected) {
      disconnect();
      toast({
        title: "Wallet Disconnected",
        description: "You've been disconnected from your wallet"
      });
    } else {
      setIsConnecting(true);
      try {
        const success = await connect();
        if (success) {
          toast({
            title: "Wallet Connected",
            description: "Successfully connected to your wallet"
          });
        }
      } catch (error) {
        console.error("Wallet connection error:", error);
        toast({
          title: "Connection Failed",
          description: "Failed to connect to wallet. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsConnecting(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex flex-col gap-2 p-4">
                <h2 className="text-lg font-semibold mb-4">Menu</h2>
                {mobileNavItems.map((item) => (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    className="flex items-center gap-3 p-2 hover:bg-accent rounded-md"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text">TokTok</span>
          </Link>
        </div>
        
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
          <Link to="/create" className="hidden md:block">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Create Remix
            </Button>
          </Link>
          
          <Button 
            onClick={handleWalletClick} 
            className="bg-gradient-to-r from-toktok-purple to-toktok-pink hover:opacity-90"
            disabled={isConnecting}
          >
            <Wallet className="h-4 w-4 mr-2" />
            {isConnecting ? 'Connecting...' : isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
          </Button>
        </div>
      </div>

      <Dialog open={isConnecting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connecting Wallet</DialogTitle>
            <DialogDescription>
              Please check your wallet and approve the connection request...
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-toktok-purple"></div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;

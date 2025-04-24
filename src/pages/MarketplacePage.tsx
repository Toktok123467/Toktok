import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, Music, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import NftCard from '../components/common/NftCard';

const nfts = [
  {
    id: '1',
    name: 'Drake Voice Clone NFT',
    artistName: 'drake_official',
    image: 'https://images.unsplash.com/photo-1564758866811-c60f4f042818?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: 1250,
    rarity: 'legendary',
  },
  {
    id: '2',
    name: 'Kendrick Voice Clone NFT',
    artistName: 'kendrick_official',
    image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: 1100,
    rarity: 'legendary',
  },
  {
    id: '3',
    name: 'Cardi Voice Clone NFT',
    artistName: 'cardi_official',
    image: 'https://images.unsplash.com/photo-1617886322168-72b882169aae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: 950,
    rarity: 'rare',
  },
  {
    id: '4',
    name: 'Megan Voice Clone NFT',
    artistName: 'megan_official',
    image: 'https://images.unsplash.com/photo-1620456456327-a4b7b9a08601?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: 900,
    rarity: 'rare',
  },
  {
    id: '5',
    name: 'Travis Voice Clone NFT',
    artistName: 'travis_official',
    image: 'https://images.unsplash.com/photo-1579500341294-7ca6ccb84538?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: 850,
    rarity: 'rare',
  },
  {
    id: '6',
    name: 'Future Voice Clone NFT',
    artistName: 'future_official',
    image: 'https://images.unsplash.com/photo-1577084681692-7fabf20cd224?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: 750,
    rarity: 'uncommon',
  },
  {
    id: '7',
    name: 'Nicki Voice Clone NFT',
    artistName: 'nicki_official',
    image: 'https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: 950,
    rarity: 'rare',
  },
  {
    id: '8',
    name: 'Doja Voice Clone NFT',
    artistName: 'doja_official',
    image: 'https://images.unsplash.com/photo-1520706004462-266650c6fb37?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: 800,
    rarity: 'uncommon',
  }
];

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNfts, setFilteredNfts] = useState(nfts);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const filtered = nfts.filter(
        nft => 
          nft.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          nft.artistName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNfts(filtered);
    } else {
      setFilteredNfts(nfts);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredNfts(nfts);
  };

  const filterByRarity = (rarity: string) => {
    if (rarity === 'all') {
      setFilteredNfts(nfts);
    } else {
      const filtered = nfts.filter(nft => nft.rarity === rarity);
      setFilteredNfts(filtered);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">NFT Voice Marketplace</h1>
        <p className="text-muted-foreground">
          Discover, buy, and stake NFT voice clones of top rappers and earn passive income
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md w-full">
          <Input
            type="search"
            placeholder="Search NFTs, artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit">
            <Search className="h-4 w-4" />
          </Button>
          {searchQuery && (
            <Button type="button" variant="ghost" onClick={clearSearch}>
              Clear
            </Button>
          )}
        </form>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">Filter by:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => filterByRarity('all')}
          >
            All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => filterByRarity('legendary')}
            className="border-toktok-purple text-toktok-purple"
          >
            Legendary
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => filterByRarity('rare')}
            className="border-toktok-blue text-toktok-blue"
          >
            Rare
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => filterByRarity('uncommon')}
            className="border-green-500 text-green-500"
          >
            Uncommon
          </Button>
        </div>
      </div>

      <div className="mb-10">
        <div className="relative rounded-xl overflow-hidden">
          <div className="h-60 md:h-80 bg-gradient-to-r from-toktok-dark via-toktok-purple/30 to-toktok-dark">
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16">
              <div className="max-w-md">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Premium Voice NFT Collection
                </h2>
                <p className="text-muted-foreground mb-6">
                  Own legendary voice NFTs, stake them to earn passive income, and use them in rap battles.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-toktok-purple to-toktok-pink hover:opacity-90">
                    Connect Wallet
                  </Button>
                  <Button variant="outline" className="border-white/20 hover:bg-white/10">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>

            <div className="absolute right-0 bottom-0 opacity-30 md:opacity-70">
              <Music className="h-60 md:h-80 w-60 md:w-80 text-toktok-purple/20" />
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All NFTs</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="newest">Newest</TabsTrigger>
          <TabsTrigger value="staking">Staking Options</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nfts.map((nft) => (
              <NftCard 
                key={nft.id} 
                {...nft} 
                rarity={nft.rarity as "common" | "uncommon" | "rare" | "legendary"}
              />
            ))}
          </div>
          
          {filteredNfts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No NFTs match your search criteria.</p>
              <Button variant="link" onClick={clearSearch}>Clear filters</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="trending" className="space-y-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredNfts
              .filter((_, index) => [0, 1, 6, 2].includes(index))
              .map((nft) => (
                <NftCard 
                  key={nft.id} 
                  {...nft} 
                  rarity={nft.rarity as "common" | "uncommon" | "rare" | "legendary"}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="newest" className="space-y-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredNfts
              .filter((_, index) => [7, 4, 5, 3].includes(index))
              .map((nft) => (
                <NftCard 
                  key={nft.id} 
                  {...nft} 
                  rarity={nft.rarity as "common" | "uncommon" | "rare" | "legendary"}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="staking" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h3 className="text-xl font-bold mb-4">Voice NFT Staking</h3>
              <p className="text-muted-foreground mb-4">
                Stake your voice NFTs to earn passive income in TokTok tokens. Different rarities have different APY rates.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span>Legendary NFTs</span>
                  <span className="text-toktok-purple font-bold">25% APY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Rare NFTs</span>
                  <span className="text-toktok-blue font-bold">15% APY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Uncommon NFTs</span>
                  <span className="text-green-500 font-bold">10% APY</span>
                </div>
              </div>
              <Button className="w-full">Start Staking</Button>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h3 className="text-xl font-bold mb-4">Battle Royalties</h3>
              <p className="text-muted-foreground mb-4">
                NFT owners earn royalties when their voice clone participates in battles. 5% of all voting tokens are distributed to NFT holders.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span>Battle participation</span>
                  <span className="text-toktok-yellow font-bold">5% royalties</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Battle wins</span>
                  <span className="text-toktok-yellow font-bold">10% bonus</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Featured battles</span>
                  <span className="text-toktok-yellow font-bold">2x multiplier</span>
                </div>
              </div>
              <Button className="w-full">View My Royalties</Button>
            </div>
          </div>
          
          <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Top Staking Earners</h3>
              <p className="text-muted-foreground mb-4">
                Users earning the most from staking their voice NFT collections
              </p>
            </div>
            
            <div className="border-t border-border/50">
              <div className="grid grid-cols-4 py-3 px-6 border-b border-border/50 bg-muted/30">
                <div className="font-medium">Rank</div>
                <div className="font-medium">User</div>
                <div className="font-medium">NFTs Staked</div>
                <div className="font-medium text-right">Earnings (TT)</div>
              </div>
              
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="grid grid-cols-4 py-3 px-6 border-b border-border/50">
                  <div className="flex items-center">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                      i === 1 ? 'bg-toktok-yellow text-black' :
                      i === 2 ? 'bg-gray-300 text-black' :
                      i === 3 ? 'bg-amber-700 text-white' :
                      'bg-muted text-muted-foreground'
                    } text-xs font-bold`}>
                      {i}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="truncate">User{i * 123}</span>
                  </div>
                  <div>{Math.round(Math.random() * 10) + 3}</div>
                  <div className="text-right text-toktok-yellow font-medium">
                    {(Math.random() * 10000).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-xl border border-border/50">
          <div className="w-12 h-12 rounded-full bg-toktok-purple/20 flex items-center justify-center mb-4">
            <Music className="h-6 w-6 text-toktok-purple" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Buy Voice NFTs</h3>
          <p className="text-muted-foreground mb-4">
            Purchase authentic voice clone NFTs from verified artists. Each NFT gives you access to use the voice in battles.
          </p>
          <Button variant="outline" className="w-full">Browse Collection</Button>
        </div>
        
        <div className="bg-card p-6 rounded-xl border border-border/50">
          <div className="w-12 h-12 rounded-full bg-toktok-pink/20 flex items-center justify-center mb-4">
            <Star className="h-6 w-6 text-toktok-pink" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Stake & Earn</h3>
          <p className="text-muted-foreground mb-4">
            Stake your voice NFTs to earn passive income in TokTok tokens. Higher rarity NFTs earn more rewards.
          </p>
          <Button variant="outline" className="w-full">Start Staking</Button>
        </div>
        
        <div className="bg-card p-6 rounded-xl border border-border/50">
          <div className="w-12 h-12 rounded-full bg-toktok-blue/20 flex items-center justify-center mb-4">
            <Star className="h-6 w-6 text-toktok-blue" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Create Your NFT</h3>
          <p className="text-muted-foreground mb-4">
            Artists can create and mint their voice clone NFTs. Set royalties and earn from every battle your voice participates in.
          </p>
          <Button variant="outline" className="w-full">Create NFT</Button>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;

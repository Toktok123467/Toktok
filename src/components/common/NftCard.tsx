
import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NftCardProps {
  id: string;
  name: string;
  artistName: string;
  image: string;
  price: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
}

const NftCard = ({ id, name, artistName, image, price, rarity }: NftCardProps) => {
  const rarityColors = {
    common: 'bg-gray-500',
    uncommon: 'bg-green-500',
    rare: 'bg-toktok-blue',
    legendary: 'bg-gradient-to-r from-toktok-purple to-toktok-pink'
  };
  
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border/50 transition-transform hover:scale-[1.02]">
      <div className="relative">
        <div className="aspect-square overflow-hidden bg-black">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
        <span className={`absolute top-3 right-3 text-xs text-white font-medium px-2 py-0.5 rounded-full ${rarityColors[rarity]}`}>
          {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
        </span>
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm p-1 rounded-full">
          <Music className="h-4 w-4 text-toktok-yellow" />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{name}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-toktok-yellow text-toktok-yellow" />
            <span className="text-xs">4.8</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">@{artistName}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-muted-foreground">Price</span>
            <p className="font-semibold text-toktok-yellow">{price} TT</p>
          </div>
          
          <Link to={`/marketplace/${id}`}>
            <Button size="sm" variant="outline">
              View NFT
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NftCard;

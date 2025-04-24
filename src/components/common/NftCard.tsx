
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface NftCardProps {
  id: string;
  name: string;
  artistName: string;
  image: string;
  price: number;
  rarity: "common" | "uncommon" | "rare" | "legendary";
}

const NftCard = ({ id, name, artistName, image, price, rarity }: NftCardProps) => {
  return (
    <Card className="overflow-hidden">
      <img 
        src={image} 
        alt={name} 
        className="w-full aspect-square object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            rarity === 'legendary' ? 'bg-yellow-500/10 text-yellow-500' :
            rarity === 'rare' ? 'bg-purple-500/10 text-purple-500' :
            rarity === 'uncommon' ? 'bg-blue-500/10 text-blue-500' :
            'bg-gray-500/10 text-gray-500'
          }`}>
            {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">By {artistName}</p>
        
        <div className="flex justify-between items-center">
          <span className="font-medium">{price} TT</span>
          <Link to={`/marketplace/nft/${id}`}>
            <Button variant="outline" size="sm">
              View NFT
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import BattleCard from '../components/common/BattleCard';
import NftCard from '../components/common/NftCard';

interface SearchResults {
  battles: {
    id: string;
    title: string;
    participants: {
      id: string;
      name: string;
      image: string;
      votes: number;
    }[];
    status: string;
    date: string;
  }[];
  nfts: {
    id: string;
    name: string;
    artistName: string;
    image: string;
    price: number;
    rarity: string;
  }[];
}

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>({ battles: [], nfts: [] });

  const handleSearch = async () => {
    // Mock search results for demonstration
    const mockResults: SearchResults = {
      battles: [
        {
          id: '1',
          title: 'AI Kendrick vs AI Drake - Flow Battle',
          participants: [
            {
              id: '101',
              name: 'AI Kendrick',
              image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
              votes: 7852
            },
            {
              id: '102',
              name: 'AI Drake',
              image: 'https://images.unsplash.com/photo-1564758866811-c60f4f042818?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
              votes: 8123
            }
          ],
          status: 'live',
          date: 'Live Now'
        },
        {
          id: '2',
          title: 'AI Megan vs AI Cardi - Queens Battle',
          participants: [
            {
              id: '103',
              name: 'AI Megan',
              image: 'https://images.unsplash.com/photo-1620456456327-a4b7b9a08601?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
              votes: 5439
            },
            {
              id: '104',
              name: 'AI Cardi',
              image: 'https://images.unsplash.com/photo-1617886322168-72b882169aae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
              votes: 5782
            }
          ],
          status: 'upcoming',
          date: 'Tomorrow, 8PM EST'
        }
      ],
      nfts: [
        {
          id: '1',
          name: 'Legendary Voice #101',
          artistName: 'AI Kendrick',
          image: 'https://images.unsplash.com/photo-1570849721697-31eeeaaf6019?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          price: 120,
          rarity: 'legendary'
        },
        {
          id: '2',
          name: 'Rare Voice #202',
          artistName: 'AI Drake',
          image: 'https://images.unsplash.com/photo-1570849722697-31eeeaaf6029?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          price: 80,
          rarity: 'rare'
        }
      ]
    };
    setSearchResults(mockResults);
  };

  return (
    <div>
      <div className="flex items-center mb-8">
        <Input
          type="text"
          placeholder="Search for battles, artists, NFTs..."
          className="mr-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {searchResults.battles.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Battles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {searchResults.battles.map((battle) => (
              <BattleCard 
                key={battle.id} 
                {...battle} 
                status={battle.status as "live" | "upcoming" | "ended"}
              />
            ))}
          </div>
        </section>
      )}

      {searchResults.nfts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">NFTs</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {searchResults.nfts.map((nft) => (
              <NftCard 
                key={nft.id} 
                {...nft} 
                rarity={nft.rarity as "common" | "uncommon" | "rare" | "legendary"}
              />
            ))}
          </div>
        </section>
      )}

      {searchResults.battles.length === 0 && searchResults.nfts.length === 0 && searchTerm !== '' && (
        <Card>
          <CardHeader>
            <CardTitle>No results found</CardTitle>
            <CardDescription>
              We couldn't find any battles or NFTs matching your search criteria.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please try a different search term.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchPage;


import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, FileVideo, Music, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VideoCard from '../components/common/VideoCard';
import BattleCard from '../components/common/BattleCard';

const mockVideos = [
  {
    id: '1',
    title: 'Old Town Road Remix - Country Vibes',
    creator: 'westernbeats',
    thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    likes: 4523
  },
  {
    id: '2',
    title: 'Savage Remix - Hip Hop Edition',
    creator: 'remixqueen',
    thumbnail: 'https://images.unsplash.com/photo-1604104468460-042d29c0cda0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    likes: 3812
  },
  {
    id: '3',
    title: 'WAP - Electronic Dance Remix',
    creator: 'beatmaster',
    thumbnail: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    likes: 2938
  },
  {
    id: '4',
    title: 'Bad Guy - Rock Fusion Remix',
    creator: 'rockstar',
    thumbnail: 'https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    likes: 3245
  },
  {
    id: '5',
    title: 'Blinding Lights - Synthwave Remix',
    creator: 'synthmaster',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    likes: 2789
  },
  {
    id: '6',
    title: 'Levitating - EDM Party Remix',
    creator: 'djmixtape',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    likes: 3056
  }
];

const mockBattles = [
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
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState('videos');
  const [filteredVideos, setFilteredVideos] = useState(mockVideos);
  const [filteredBattles, setFilteredBattles] = useState(mockBattles);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
      filterResults(query);
    }
  };

  const filterResults = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setFilteredVideos(mockVideos);
      setFilteredBattles(mockBattles);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    
    // Filter videos
    const videos = mockVideos.filter(
      video => 
        video.title.toLowerCase().includes(lowerQuery) || 
        video.creator.toLowerCase().includes(lowerQuery)
    );
    setFilteredVideos(videos);
    
    // Filter battles
    const battles = mockBattles.filter(
      battle => 
        battle.title.toLowerCase().includes(lowerQuery) || 
        battle.participants.some(p => p.name.toLowerCase().includes(lowerQuery))
    );
    setFilteredBattles(battles);
  };

  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setQuery(queryParam);
      filterResults(queryParam);
    }
  }, [searchParams]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="search"
            placeholder="Search for clips, themes, battles..."
            className="max-w-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>

      {searchParams.get('q') && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Results for "{searchParams.get('q')}"</h2>
          <p className="text-muted-foreground">
            Found {filteredVideos.length} videos and {filteredBattles.length} battles
          </p>
        </div>
      )}

      <Tabs defaultValue="videos" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <FileVideo className="h-4 w-4" />
            <span>Videos</span>
          </TabsTrigger>
          <TabsTrigger value="battles" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            <span>Battles</span>
          </TabsTrigger>
          <TabsTrigger value="creators" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Creators</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos">
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No videos match your search.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="battles">
          {filteredBattles.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredBattles.map((battle) => (
                <BattleCard key={battle.id} {...battle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No battles match your search.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="creators">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Creator search will be available soon.</p>
          </div>
        </TabsContent>
      </Tabs>

      {searchParams.get('q') && (
        <div className="mt-12 p-6 rounded-xl bg-card border border-border/50">
          <h3 className="font-semibold mb-2">Popular searches</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => {
              setQuery('rap');
              setSearchParams({ q: 'rap' });
              filterResults('rap');
            }}>
              #rap
            </Button>
            <Button variant="outline" size="sm" onClick={() => {
              setQuery('remix');
              setSearchParams({ q: 'remix' });
              filterResults('remix');
            }}>
              #remix
            </Button>
            <Button variant="outline" size="sm" onClick={() => {
              setQuery('hiphop');
              setSearchParams({ q: 'hiphop' });
              filterResults('hiphop');
            }}>
              #hiphop
            </Button>
            <Button variant="outline" size="sm" onClick={() => {
              setQuery('beat');
              setSearchParams({ q: 'beat' });
              filterResults('beat');
            }}>
              #beat
            </Button>
            <Button variant="outline" size="sm" onClick={() => {
              setQuery('voice');
              setSearchParams({ q: 'voice' });
              filterResults('voice');
            }}>
              #voice
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

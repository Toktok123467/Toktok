
import React, { useState } from 'react';
import VideoCard from '../components/common/VideoCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, TrendingUp } from 'lucide-react';

const popularRemixes = [
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
  },
  {
    id: '7',
    title: 'Sicko Mode - Trap Remix',
    creator: 'trapbeats',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    likes: 2453
  },
  {
    id: '8',
    title: 'Uptown Funk - Jazz Remix',
    creator: 'jazzyfusion',
    thumbnail: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    likes: 3187
  }
];

const PopularPage = () => {
  const [videos, setVideos] = useState([...popularRemixes]);
  const [votedVideos, setVotedVideos] = useState<string[]>([]);
  
  const handleVote = (videoId: string) => {
    if (votedVideos.includes(videoId)) {
      // Remove vote
      setVotedVideos(votedVideos.filter(id => id !== videoId));
      setVideos(videos.map(video => 
        video.id === videoId ? { ...video, likes: video.likes - 1 } : video
      ));
    } else {
      // Add vote
      setVotedVideos([...votedVideos, videoId]);
      setVideos(videos.map(video => 
        video.id === videoId ? { ...video, likes: video.likes + 1 } : video
      ));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Popular Remixes</h1>
          <p className="text-muted-foreground">Discover and vote on the most popular remixes on TokTok</p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border/50">
          <TrendingUp className="h-5 w-5 text-toktok-yellow" />
          <span className="text-sm">Your TokTok Balance: <span className="font-semibold text-toktok-yellow">120 TT</span></span>
        </div>
      </div>
      
      <Tabs defaultValue="trending">
        <TabsList className="mb-6">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending" className="space-y-6">
          <div className="relative rounded-xl overflow-hidden mb-8 bg-card border border-border/50">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 aspect-video md:aspect-auto relative">
                <img 
                  src="https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Top trending remix" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-toktok-yellow text-black text-xs font-bold px-2 py-1 rounded-full">
                    #1 TRENDING
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <button 
                    className={`rounded-full p-2 ${votedVideos.includes('trending') 
                      ? 'bg-toktok-pink text-white' 
                      : 'bg-black/50 text-white hover:bg-black/70'}`}
                    onClick={() => handleVote('trending')}
                  >
                    <Heart className={`h-5 w-5 ${votedVideos.includes('trending') ? 'fill-current' : ''}`} />
                  </button>
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    9,872
                  </span>
                </div>
              </div>
              <div className="p-6 md:w-1/2 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">
                  "Industry Baby" - Epic Orchestra Remix
                </h3>
                <p className="text-muted-foreground mb-4">
                  @orchestrabeats transformed this hit into an epic orchestral masterpiece. The remix has gained over 2M plays across platforms.
                </p>
                <div className="flex gap-3 mb-6">
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">#orchestra</span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">#remix</span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">#viral</span>
                </div>
                <div className="flex gap-4">
                  <Button className="bg-toktok-purple hover:bg-toktok-purple/90">
                    Watch Now
                  </Button>
                  <Button variant="outline">
                    Fork Remix
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="relative">
                <VideoCard {...video} />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <button 
                    className={`rounded-full p-2 ${votedVideos.includes(video.id) 
                      ? 'bg-toktok-pink text-white' 
                      : 'bg-black/50 text-white hover:bg-black/70'}`}
                    onClick={() => handleVote(video.id)}
                  >
                    <Heart className={`h-4 w-4 ${votedVideos.includes(video.id) ? 'fill-current' : ''}`} />
                  </button>
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {video.likes}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="min-w-32">
              Load More
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="today">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.slice(2, 6).map((video) => (
              <div key={video.id} className="relative">
                <VideoCard {...video} />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <button 
                    className={`rounded-full p-2 ${votedVideos.includes(video.id) 
                      ? 'bg-toktok-pink text-white' 
                      : 'bg-black/50 text-white hover:bg-black/70'}`}
                    onClick={() => handleVote(video.id)}
                  >
                    <Heart className={`h-4 w-4 ${votedVideos.includes(video.id) ? 'fill-current' : ''}`} />
                  </button>
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {video.likes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="week">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.slice(4, 8).map((video) => (
              <div key={video.id} className="relative">
                <VideoCard {...video} />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <button 
                    className={`rounded-full p-2 ${votedVideos.includes(video.id) 
                      ? 'bg-toktok-pink text-white' 
                      : 'bg-black/50 text-white hover:bg-black/70'}`}
                    onClick={() => handleVote(video.id)}
                  >
                    <Heart className={`h-4 w-4 ${votedVideos.includes(video.id) ? 'fill-current' : ''}`} />
                  </button>
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {video.likes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="month">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.slice(0, 4).map((video) => (
              <div key={video.id} className="relative">
                <VideoCard {...video} />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <button 
                    className={`rounded-full p-2 ${votedVideos.includes(video.id) 
                      ? 'bg-toktok-pink text-white' 
                      : 'bg-black/50 text-white hover:bg-black/70'}`}
                    onClick={() => handleVote(video.id)}
                  >
                    <Heart className={`h-4 w-4 ${votedVideos.includes(video.id) ? 'fill-current' : ''}`} />
                  </button>
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {video.likes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 p-6 rounded-xl bg-card border border-border/50">
        <h3 className="font-semibold mb-4">How Voting Works</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium mb-2">For Voters</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Each vote costs 1 TokTok token</li>
              <li>You earn 2 tokens if your voted remix stays in top 10 for 24 hours</li>
              <li>Earn bonus tokens by discovering early trending content</li>
              <li>Claim extra tokens by voting on 5 different remixes daily</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">For Creators</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Earn 5 tokens for every 100 votes on your remix</li>
              <li>Top 10 remixes earn 50 bonus tokens daily</li>
              <li>Featured remixes earn additional token rewards</li>
              <li>Earn tokens when others fork and remix your content</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularPage;

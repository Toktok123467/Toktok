
import React from 'react';
import VideoCard from '../components/common/VideoCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const featuredRemixes = [
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
  }
];

const trendingBattles = [
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

const HomePage = () => {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden">
        <div className="h-80 bg-gradient-to-r from-toktok-purple via-toktok-pink to-toktok-blue p-8 flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-4">
              Remix, Create, Earn with TokTok
            </h1>
            <p className="text-white/90 mb-6">
              Fork and remix TikTok content as narrative, battle with AI-generated rapper voices, and earn TokTok tokens.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/create">
                <Button size="lg" className="bg-white text-toktok-purple hover:bg-white/90">
                  Start Creating
                </Button>
              </Link>
              <Link to="/battles">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Watch Battles
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1603049489988-53ebe4cd1c38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')] opacity-10 mix-blend-overlay"></div>
      </section>

      {/* Featured Remixes */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Remixes</h2>
          <Link to="/popular" className="text-toktok-purple hover:text-toktok-purple/90 text-sm font-medium">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredRemixes.map((remix) => (
            <VideoCard key={remix.id} {...remix} />
          ))}
        </div>
      </section>

      {/* Trending Battles */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Trending Voice Battles</h2>
          <Link to="/battles" className="text-toktok-purple hover:text-toktok-purple/90 text-sm font-medium">
            View All
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {trendingBattles.map((battle) => (
            <div key={battle.id} className="bg-card rounded-xl overflow-hidden border border-border/50">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    battle.status === 'live' ? 'bg-red-500' : 'bg-toktok-blue'
                  }`}>
                    {battle.status === 'live' ? 'LIVE NOW' : 'UPCOMING'}
                  </span>
                  <span className="text-xs text-muted-foreground">{battle.date}</span>
                </div>
                
                <h3 className="font-semibold mb-4 text-lg">{battle.title}</h3>
                
                <div className="flex items-center justify-between">
                  {battle.participants.map((participant, index) => (
                    <React.Fragment key={participant.id}>
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-muted">
                          <img src={participant.image} alt={participant.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-medium">{participant.name}</span>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-toktok-yellow">{participant.votes}</span>
                          <span className="text-xs text-muted-foreground">votes</span>
                        </div>
                      </div>
                      
                      {index === 0 && (
                        <div className="flex flex-col items-center mx-2">
                          <span className="font-bold text-xl mb-2">VS</span>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-toktok-purple to-toktok-pink flex items-center justify-center">
                            <Music className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-border/50 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Total votes:</span>
                  <span className="text-sm">
                    {battle.participants.reduce((sum, p) => sum + p.votes, 0)}
                  </span>
                </div>
                
                <Link to={`/battles/${battle.id}`}>
                  <Button 
                    size="sm"
                    className="bg-toktok-purple hover:bg-toktok-purple/90"
                  >
                    {battle.status === 'live' ? 'Watch & Vote' : 'View Details'}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NFT Collection Preview */}
      <section className="bg-gradient-to-b from-toktok-dark to-toktok-purple/20 p-6 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Exclusive Voice NFTs</h2>
            <p className="text-muted-foreground">Own, stake and earn with rapper voice clone NFTs</p>
          </div>
          <Link to="/marketplace">
            <Button variant="outline" className="border-white/20 hover:bg-white/10">
              Browse Marketplace
            </Button>
          </Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
          {[1, 2, 3, 4].map((id) => (
            <div key={id} className="min-w-[240px] bg-black/40 rounded-lg overflow-hidden backdrop-blur-sm">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-157084972${id}697-31eeeaaf60${id}9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`}
                  alt={`NFT ${id}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm">{`Legendary Voice #${id}0${id}`}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-toktok-yellow font-medium">{id * 120} TT</span>
                  <span className="text-xs text-white/70">Limited Edition</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* How It Works */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">How TokTok Works</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-xl border border-border/50">
            <div className="w-12 h-12 rounded-full bg-toktok-purple/20 flex items-center justify-center mb-4">
              <span className="font-bold text-xl text-toktok-purple">1</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Remix Content</h3>
            <p className="text-muted-foreground">
              Fork and remix TikTok content as narrative. Add your creative twist to existing videos.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl border border-border/50">
            <div className="w-12 h-12 rounded-full bg-toktok-pink/20 flex items-center justify-center mb-4">
              <span className="font-bold text-xl text-toktok-pink">2</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Battle with AI Voices</h3>
            <p className="text-muted-foreground">
              Create or participate in AI voice rap battles. Clone voices of top rappers and compete.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl border border-border/50">
            <div className="w-12 h-12 rounded-full bg-toktok-blue/20 flex items-center justify-center mb-4">
              <span className="font-bold text-xl text-toktok-blue">3</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Earn TokTok Tokens</h3>
            <p className="text-muted-foreground">
              Earn tokens by creating content, winning battles, or voting on popular remixes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


import React, { useState } from 'react';
import { Music, Calendar, Heart, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BattleCard from '../components/common/BattleCard';
import { Link } from 'react-router-dom';

const battles = [
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
  },
  {
    id: '3',
    title: 'AI Jay-Z vs AI Kanye - Legends Battle',
    participants: [
      {
        id: '105',
        name: 'AI Jay-Z',
        image: 'https://images.unsplash.com/photo-1567784177951-6fa58317e16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        votes: 9321
      },
      {
        id: '106',
        name: 'AI Kanye',
        image: 'https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        votes: 9104
      }
    ],
    status: 'ended',
    date: 'Yesterday'
  },
  {
    id: '4',
    title: 'AI Eminem vs AI J. Cole - Lyrical Mastery',
    participants: [
      {
        id: '107',
        name: 'AI Eminem',
        image: 'https://images.unsplash.com/photo-1493225458124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        votes: 6753
      },
      {
        id: '108',
        name: 'AI J. Cole',
        image: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        votes: 6241
      }
    ],
    status: 'upcoming',
    date: 'Friday, 9PM EST'
  },
  {
    id: '5',
    title: 'AI Travis vs AI Future - Autotune Showdown',
    participants: [
      {
        id: '109',
        name: 'AI Travis',
        image: 'https://images.unsplash.com/photo-1579500341294-7ca6ccb84538?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        votes: 4532
      },
      {
        id: '110',
        name: 'AI Future',
        image: 'https://images.unsplash.com/photo-1577084681692-7fabf20cd224?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        votes: 4321
      }
    ],
    status: 'upcoming',
    date: 'Saturday, 10PM EST'
  },
  {
    id: '6',
    title: 'AI Nicki vs AI Doja - Queens of Rap',
    participants: [
      {
        id: '111',
        name: 'AI Nicki',
        image: 'https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        votes: 8765
      },
      {
        id: '112',
        name: 'AI Doja',
        image: 'https://images.unsplash.com/photo-1520706004462-266650c6fb37?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        votes: 8432
      }
    ],
    status: 'ended',
    date: 'Last week'
  }
];

const upcomingEvents = [
  {
    id: '1',
    title: 'TokTok NFT Voice Legends Tournament',
    date: 'June 15-30, 2023',
    description: 'The biggest AI voice battle of the year with 16 legendary rapper clones competing for the championship title and 10,000 TokTok tokens.',
    prize: '10,000 TT',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '2',
    title: 'Remix Masters Challenge',
    date: 'July 5-12, 2023',
    description: 'Create the most innovative remix using AI voice technology and win exclusive NFT drops and token rewards.',
    prize: '5,000 TT',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
];

const BattlesPage = () => {
  const [votedBattle, setVotedBattle] = useState<string | null>(null);
  const [votedParticipant, setVotedParticipant] = useState<string | null>(null);

  const handleVote = (battleId: string, participantId: string) => {
    setVotedBattle(battleId);
    setVotedParticipant(participantId);
    
    // In a real app, this would call an API to record the vote
    console.log(`Voted for ${participantId} in battle ${battleId}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Voice Battles</h1>
          <p className="text-muted-foreground">AI rapper voice clone battles. Vote for your favorites and earn tokens.</p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border/50">
          <TrendingUp className="h-5 w-5 text-toktok-yellow" />
          <span className="text-sm">Your TokTok Balance: <span className="font-semibold text-toktok-yellow">120 TT</span></span>
        </div>
      </div>

      {/* Featured Battle */}
      <div className="mb-10 rounded-xl overflow-hidden border border-border/50">
        <div className="bg-gradient-to-r from-toktok-purple to-toktok-pink p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Music className="h-5 w-5 mr-2 text-white" />
            <span className="font-medium text-white">FEATURED BATTLE</span>
          </div>
          <span className="animate-pulse bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">LIVE NOW</span>
        </div>
        
        <div className="p-6 bg-card">
          <h2 className="text-2xl font-bold mb-4">AI Kendrick vs AI Drake - Ultimate Flow Battle</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
              <img 
                src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Battle preview" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="bg-toktok-purple hover:bg-toktok-purple/90">
                  Watch Battle
                </Button>
              </div>
            </div>
            
            <div>
              <p className="text-muted-foreground mb-6">
                The most anticipated AI voice battle of the year. Two AI-cloned rap legends go head-to-head in an epic showdown of flows, wordplay, and beats.
              </p>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-muted">
                    <img 
                      src="https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                      alt="AI Kendrick" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">AI Kendrick</span>
                  <span className="text-sm text-toktok-yellow">7,852 votes</span>
                </div>
                
                <div className="text-center">
                  <span className="text-3xl font-bold">VS</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-muted">
                    <img 
                      src="https://images.unsplash.com/photo-1564758866811-c60f4f042818?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                      alt="AI Drake" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">AI Drake</span>
                  <span className="text-sm text-toktok-yellow">8,123 votes</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  className={`relative ${votedParticipant === '101' 
                    ? 'bg-toktok-purple' 
                    : 'bg-secondary hover:bg-secondary/80'}`}
                  onClick={() => handleVote('1', '101')}
                >
                  <span className="relative z-10">Vote AI Kendrick</span>
                  {votedParticipant === '101' && (
                    <Heart className="h-4 w-4 ml-2 fill-current" />
                  )}
                </Button>
                
                <Button 
                  className={`relative ${votedParticipant === '102' 
                    ? 'bg-toktok-pink' 
                    : 'bg-secondary hover:bg-secondary/80'}`}
                  onClick={() => handleVote('1', '102')}
                >
                  <span className="relative z-10">Vote AI Drake</span>
                  {votedParticipant === '102' && (
                    <Heart className="h-4 w-4 ml-2 fill-current" />
                  )}
                </Button>
              </div>
              
              {votedParticipant && (
                <p className="text-center mt-4 text-sm text-muted-foreground">
                  You voted! Earn 2 TT tokens if your pick wins this battle.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Battles</TabsTrigger>
          <TabsTrigger value="live">Live Now</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Battles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {battles.map((battle) => (
              <BattleCard 
                key={battle.id} 
                {...battle} 
                status={battle.status as "live" | "upcoming" | "ended"} 
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="live" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {battles
              .filter(battle => battle.status === 'live')
              .map((battle) => (
                <BattleCard 
                  key={battle.id} 
                  {...battle} 
                  status={battle.status as "live" | "upcoming" | "ended"} 
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {battles
              .filter(battle => battle.status === 'upcoming')
              .map((battle) => (
                <BattleCard 
                  key={battle.id} 
                  {...battle} 
                  status={battle.status as "live" | "upcoming" | "ended"} 
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {battles
              .filter(battle => battle.status === 'ended')
              .map((battle) => (
                <BattleCard 
                  key={battle.id} 
                  {...battle} 
                  status={battle.status as "live" | "upcoming" | "ended"} 
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Upcoming Events & Challenges */}
      <section className="mt-12">
        <div className="flex items-center mb-6">
          <Calendar className="h-5 w-5 mr-2 text-toktok-blue" />
          <h2 className="text-2xl font-bold">Upcoming Events & Challenges</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="relative rounded-xl overflow-hidden border border-border/50">
              <div className="h-40 relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-bold text-lg">{event.title}</h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-toktok-yellow" />
                    <span className="text-white text-sm">{event.date}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-1 text-toktok-yellow" />
                    <span className="text-sm font-medium">Prize: <span className="text-toktok-yellow">{event.prize}</span></span>
                  </div>
                  <Button size="sm">Register</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/featured">
            <Button variant="outline">View All Events</Button>
          </Link>
        </div>
      </section>
      
      <div className="mt-12 p-6 rounded-xl bg-card border border-border/50">
        <h3 className="font-semibold mb-4">How Battles Work</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-toktok-purple/20 flex items-center justify-center mb-2">
              <Music className="h-5 w-5 text-toktok-purple" />
            </div>
            <h4 className="text-sm font-medium">Vote on Battles</h4>
            <p className="text-xs text-muted-foreground">
              Use 1 TokTok token to vote for your favorite AI rapper in each battle. Voting period lasts 24 hours.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-toktok-pink/20 flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-toktok-pink" />
            </div>
            <h4 className="text-sm font-medium">Earn Rewards</h4>
            <p className="text-xs text-muted-foreground">
              Earn 2 tokens if your voted rapper wins. Creators earn 10% of all tokens spent on voting for their AI clone.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-toktok-blue/20 flex items-center justify-center mb-2">
              <Award className="h-5 w-5 text-toktok-blue" />
            </div>
            <h4 className="text-sm font-medium">Enter Tournaments</h4>
            <p className="text-xs text-muted-foreground">
              Weekly and monthly tournaments feature the best AI rappers competing for large token prizes and NFT rewards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattlesPage;

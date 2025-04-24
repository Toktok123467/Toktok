
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BattleCardProps {
  id: string;
  title: string;
  participants: {
    id: string;
    name: string;
    image: string;
    votes: number;
  }[];
  status: 'live' | 'upcoming' | 'ended';
  date: string;
}

const BattleCard = ({ id, title, participants, status, date }: BattleCardProps) => {
  const statusColors = {
    live: 'bg-red-500',
    upcoming: 'bg-toktok-blue',
    ended: 'bg-gray-500'
  };

  const statusText = {
    live: 'LIVE NOW',
    upcoming: 'UPCOMING',
    ended: 'ENDED'
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border/50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[status]}`}>
            {statusText[status]}
          </span>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        
        <h3 className="font-semibold mb-4 text-lg">{title}</h3>
        
        <div className="flex items-center justify-between">
          {participants.map((participant, index) => (
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
            {participants.reduce((sum, p) => sum + p.votes, 0)}
          </span>
        </div>
        
        <Link to={`/battles/${id}`}>
          <Button 
            size="sm"
            className="bg-toktok-purple hover:bg-toktok-purple/90"
          >
            {status === 'live' ? 'Watch & Vote' : 'View Details'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BattleCard;


import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface BattleCardProps {
  id: string;
  title: string;
  participants: {
    id: string;
    name: string;
    image: string;
    votes: number;
  }[];
  status: "live" | "upcoming" | "ended";
  date: string;
}

const BattleCard = ({ id, title, participants, status, date }: BattleCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'live' ? 'bg-green-500/10 text-green-500' :
            status === 'upcoming' ? 'bg-blue-500/10 text-blue-500' :
            'bg-gray-500/10 text-gray-500'
          }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        
        <div className="flex gap-4 mb-4">
          {participants.map((participant, index) => (
            <div key={participant.id} className="flex-1">
              <img 
                src={participant.image} 
                alt={participant.name} 
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <p className="font-medium text-sm mb-1">{participant.name}</p>
              <p className="text-sm text-muted-foreground">{participant.votes.toLocaleString()} votes</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{date}</span>
          <Link to={`/battles/${id}`}>
            <Button variant="outline" size="sm">
              {status === 'live' ? 'Watch Battle' : 
               status === 'upcoming' ? 'View Details' : 'View Results'}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default BattleCard;

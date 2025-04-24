
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Heart, Share } from 'lucide-react';

interface VideoCardProps {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  likes: number;
  isNft?: boolean;
}

const VideoCard = ({ id, title, creator, thumbnail, likes, isNft = false }: VideoCardProps) => {
  return (
    <div className="video-card group">
      <Link to={`/video/${id}`} className="block relative aspect-[9/16] overflow-hidden rounded-lg">
        <img 
          src={thumbnail} 
          alt={title} 
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 flex items-end p-3">
          <div className="w-full">
            <h3 className="text-white font-medium text-sm line-clamp-2">{title}</h3>
            <p className="text-white/70 text-xs mt-1">@{creator}</p>
          </div>
        </div>
        <div className="absolute top-3 right-3 flex flex-col items-center gap-3">
          {isNft && (
            <span className="bg-toktok-purple/90 text-white text-[10px] px-2 py-1 rounded-full">
              NFT
            </span>
          )}
          <button className="bg-white/10 backdrop-blur-sm p-1 rounded-full">
            <Heart className="h-4 w-4 text-white" />
          </button>
          <span className="text-white text-xs">{likes}</span>
          <button className="bg-white/10 backdrop-blur-sm p-1 rounded-full">
            <Share className="h-4 w-4 text-white" />
          </button>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/30 transition-opacity group-hover:opacity-100">
          <button className="bg-toktok-purple/90 p-3 rounded-full">
            <Play className="h-6 w-6 text-white" fill="white" />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;

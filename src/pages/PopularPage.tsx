
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoCard from '../components/common/VideoCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, TrendingUp, Play, Pause, Volume2 } from 'lucide-react';
import { useSuiWallet } from '@/hooks/useSuiWallet';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

const popularRemixes = [
  {
    id: '1',
    title: 'Old Town Road Remix - Country Vibes',
    creator: 'westernbeats',
    thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    likes: 4523,
    audio: 'https://audio-previews.elements.envatousercontent.com/files/175433943/preview.mp3'
  },
  {
    id: '2',
    title: 'Savage Remix - Hip Hop Edition',
    creator: 'remixqueen',
    thumbnail: 'https://images.unsplash.com/photo-1604104468460-042d29c0cda0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    likes: 3812,
    audio: 'https://audio-previews.elements.envatousercontent.com/files/333125233/preview.mp3'
  },
  {
    id: '3',
    title: 'WAP - Electronic Dance Remix',
    creator: 'beatmaster',
    thumbnail: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    likes: 2938,
    audio: 'https://audio-previews.elements.envatousercontent.com/files/103768284/preview.mp3'
  },
  {
    id: '4',
    title: 'Bad Guy - Rock Fusion Remix',
    creator: 'rockstar',
    thumbnail: 'https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    likes: 3245,
    audio: 'https://audio-previews.elements.envatousercontent.com/files/270266495/preview.mp3'
  },
  {
    id: '5',
    title: 'Blinding Lights - Synthwave Remix',
    creator: 'synthmaster',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    likes: 2789,
    audio: 'https://audio-previews.elements.envatousercontent.com/files/206883446/preview.mp3'
  },
  {
    id: '6',
    title: 'Levitating - EDM Party Remix',
    creator: 'djmixtape',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    likes: 3056,
    audio: 'https://audio-previews.elements.envatousercontent.com/files/108719967/preview.mp3'
  },
  {
    id: '7',
    title: 'Sicko Mode - Trap Remix',
    creator: 'trapbeats',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    likes: 2453,
    audio: 'https://audio-previews.elements.envatousercontent.com/files/277382788/preview.mp3'
  },
  {
    id: '8',
    title: 'Uptown Funk - Jazz Remix',
    creator: 'jazzyfusion',
    thumbnail: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    likes: 3187,
    audio: 'https://audio-previews.elements.envatousercontent.com/files/182133411/preview.mp3'
  }
];

const PopularPage = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([...popularRemixes]);
  const [votedVideos, setVotedVideos] = useState<string[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [showVoteDialog, setShowVoteDialog] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [voteAmount, setVoteAmount] = useState<number>(1);
  const [detailsVideo, setDetailsVideo] = useState<any | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isConnected, connect } = useSuiWallet();
  
  const handleVideoClick = (video: any) => {
    setDetailsVideo(video);
  };

  const handlePlayPause = (videoId: string, audioSrc: string) => {
    if (currentlyPlaying === videoId) {
      // Same video - toggle play/pause
      if (audioRef.current?.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    } else {
      // Different video - switch and play
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setCurrentlyPlaying(videoId);
      
      // Need to create a new audio element for the new source
      const audio = new Audio(audioSrc);
      audio.play();
      audioRef.current = audio;
      setIsPlaying(true);
      
      // Handle when audio finishes playing
      audio.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  const initiateVote = (videoId: string) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to vote",
        variant: "destructive"
      });
      return;
    }

    setSelectedVideo(videoId);
    setShowVoteDialog(true);
  };
  
  const handleVote = () => {
    if (!selectedVideo) return;
    
    if (votedVideos.includes(selectedVideo)) {
      // Already voted - vote again (add more tokens)
      setVideos(videos.map(video => 
        video.id === selectedVideo ? { ...video, likes: video.likes + voteAmount } : video
      ));
    } else {
      // First vote
      setVotedVideos([...votedVideos, selectedVideo]);
      setVideos(videos.map(video => 
        video.id === selectedVideo ? { ...video, likes: video.likes + voteAmount } : video
      ));
    }
    
    toast({
      title: "Vote Successful",
      description: `You voted with ${voteAmount} TokTok tokens!`,
    });
    
    setShowVoteDialog(false);
    setVoteAmount(1);
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
      
      {detailsVideo ? (
        <div className="mb-8">
          <button 
            onClick={() => setDetailsVideo(null)}
            className="mb-4 text-sm flex items-center hover:underline"
          >
            ← Back to all remixes
          </button>
          
          <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 aspect-video md:aspect-square relative">
                <img 
                  src={detailsVideo.thumbnail} 
                  alt={detailsVideo.title}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-4">
                    <button 
                      onClick={() => handlePlayPause(detailsVideo.id, detailsVideo.audio)}
                      className="bg-toktok-purple hover:bg-toktok-purple/90 text-white rounded-full p-3 transition-all"
                    >
                      {currentlyPlaying === detailsVideo.id && isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" fill="white" />
                      )}
                    </button>
                    
                    <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-1/3 rounded-full"></div>
                    </div>
                    
                    <button className="text-white">
                      <Volume2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:w-1/2">
                <h2 className="text-2xl font-bold mb-2">{detailsVideo.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">By @{detailsVideo.creator}</p>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Heart className={`h-5 w-5 ${votedVideos.includes(detailsVideo.id) ? 'fill-toktok-pink text-toktok-pink' : ''}`} />
                    <span className="font-medium">{detailsVideo.likes} votes</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  This remix combines elements of traditional beats with contemporary electronic sounds,
                  creating a unique fusion that has captivated listeners worldwide. The creator has 
                  masterfully blended vocals and instrumentals for an immersive experience.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">#remix</span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">#popular</span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">#{detailsVideo.title.split(' ')[0].toLowerCase()}</span>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={() => initiateVote(detailsVideo.id)}
                    className="bg-toktok-pink hover:bg-toktok-pink/90"
                  >
                    <Heart className={`h-5 w-5 mr-2 ${votedVideos.includes(detailsVideo.id) ? 'fill-current' : ''}`} />
                    {votedVideos.includes(detailsVideo.id) ? 'Vote Again' : 'Vote'}
                  </Button>
                  <Button variant="outline">
                    Fork Remix
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                      onClick={() => initiateVote('trending')}
                    >
                      <Heart className={`h-5 w-5 ${votedVideos.includes('trending') ? 'fill-current' : ''}`} />
                    </button>
                    <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      9,872
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <button 
                      onClick={() => handlePlayPause('trending', 'https://audio-previews.elements.envatousercontent.com/files/151275961/preview.mp3')}
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                    >
                      {currentlyPlaying === 'trending' && isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" fill="white" />
                      )}
                    </button>
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
                    <Button 
                      className="bg-toktok-purple hover:bg-toktok-purple/90"
                      onClick={() => {
                        const trendingVideo = {
                          id: 'trending',
                          title: 'Industry Baby - Epic Orchestra Remix',
                          creator: 'orchestrabeats',
                          thumbnail: 'https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                          likes: 9872,
                          audio: 'https://audio-previews.elements.envatousercontent.com/files/151275961/preview.mp3'
                        };
                        setDetailsVideo(trendingVideo);
                      }}
                    >
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
                <Card key={video.id} className="relative overflow-hidden border-0 shadow-lg rounded-lg group hover:scale-[1.02] transition-all duration-200">
                  <div 
                    className="cursor-pointer w-full"
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="aspect-[9/16] relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h4 className="text-white font-medium line-clamp-2 text-sm mb-1">{video.title}</h4>
                        <p className="text-white/70 text-xs">@{video.creator}</p>
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/30 transition-opacity group-hover:opacity-100">
                        <button 
                          className="bg-toktok-purple/90 p-3 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayPause(video.id, video.audio);
                          }}
                        >
                          {currentlyPlaying === video.id && isPlaying ? (
                            <Pause className="h-6 w-6 text-white" />
                          ) : (
                            <Play className="h-6 w-6 text-white" fill="white" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-3 pt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => initiateVote(video.id)}
                          className={`rounded-full p-1 ${votedVideos.includes(video.id) 
                            ? 'text-toktok-pink' 
                            : 'text-muted-foreground hover:text-toktok-pink'}`}
                        >
                          <Heart className={`h-4 w-4 ${votedVideos.includes(video.id) ? 'fill-current' : ''}`} />
                        </button>
                        <span className="text-xs">{video.likes}</span>
                      </div>
                      
                      {currentlyPlaying === video.id && (
                        <span className="text-xs text-toktok-purple font-medium">Now Playing</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
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
                <Card key={video.id} className="relative overflow-hidden border-0 shadow-lg rounded-lg group hover:scale-[1.02] transition-all duration-200">
                  <div 
                    className="cursor-pointer w-full"
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="aspect-[9/16] relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h4 className="text-white font-medium line-clamp-2 text-sm mb-1">{video.title}</h4>
                        <p className="text-white/70 text-xs">@{video.creator}</p>
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/30 transition-opacity group-hover:opacity-100">
                        <button 
                          className="bg-toktok-purple/90 p-3 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayPause(video.id, video.audio);
                          }}
                        >
                          {currentlyPlaying === video.id && isPlaying ? (
                            <Pause className="h-6 w-6 text-white" />
                          ) : (
                            <Play className="h-6 w-6 text-white" fill="white" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-3 pt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => initiateVote(video.id)}
                          className={`rounded-full p-1 ${votedVideos.includes(video.id) 
                            ? 'text-toktok-pink' 
                            : 'text-muted-foreground hover:text-toktok-pink'}`}
                        >
                          <Heart className={`h-4 w-4 ${votedVideos.includes(video.id) ? 'fill-current' : ''}`} />
                        </button>
                        <span className="text-xs">{video.likes}</span>
                      </div>
                      
                      {currentlyPlaying === video.id && (
                        <span className="text-xs text-toktok-purple font-medium">Now Playing</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="week">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.slice(4, 8).map((video) => (
                <Card key={video.id} className="relative overflow-hidden border-0 shadow-lg rounded-lg group hover:scale-[1.02] transition-all duration-200">
                  <div 
                    className="cursor-pointer w-full"
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="aspect-[9/16] relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h4 className="text-white font-medium line-clamp-2 text-sm mb-1">{video.title}</h4>
                        <p className="text-white/70 text-xs">@{video.creator}</p>
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/30 transition-opacity group-hover:opacity-100">
                        <button 
                          className="bg-toktok-purple/90 p-3 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayPause(video.id, video.audio);
                          }}
                        >
                          {currentlyPlaying === video.id && isPlaying ? (
                            <Pause className="h-6 w-6 text-white" />
                          ) : (
                            <Play className="h-6 w-6 text-white" fill="white" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-3 pt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => initiateVote(video.id)}
                          className={`rounded-full p-1 ${votedVideos.includes(video.id) 
                            ? 'text-toktok-pink' 
                            : 'text-muted-foreground hover:text-toktok-pink'}`}
                        >
                          <Heart className={`h-4 w-4 ${votedVideos.includes(video.id) ? 'fill-current' : ''}`} />
                        </button>
                        <span className="text-xs">{video.likes}</span>
                      </div>
                      
                      {currentlyPlaying === video.id && (
                        <span className="text-xs text-toktok-purple font-medium">Now Playing</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="month">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.slice(0, 4).map((video) => (
                <Card key={video.id} className="relative overflow-hidden border-0 shadow-lg rounded-lg group hover:scale-[1.02] transition-all duration-200">
                  <div 
                    className="cursor-pointer w-full"
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="aspect-[9/16] relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h4 className="text-white font-medium line-clamp-2 text-sm mb-1">{video.title}</h4>
                        <p className="text-white/70 text-xs">@{video.creator}</p>
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/30 transition-opacity group-hover:opacity-100">
                        <button 
                          className="bg-toktok-purple/90 p-3 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayPause(video.id, video.audio);
                          }}
                        >
                          {currentlyPlaying === video.id && isPlaying ? (
                            <Pause className="h-6 w-6 text-white" />
                          ) : (
                            <Play className="h-6 w-6 text-white" fill="white" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-3 pt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => initiateVote(video.id)}
                          className={`rounded-full p-1 ${votedVideos.includes(video.id) 
                            ? 'text-toktok-pink' 
                            : 'text-muted-foreground hover:text-toktok-pink'}`}
                        >
                          <Heart className={`h-4 w-4 ${votedVideos.includes(video.id) ? 'fill-current' : ''}`} />
                        </button>
                        <span className="text-xs">{video.likes}</span>
                      </div>
                      
                      {currentlyPlaying === video.id && (
                        <span className="text-xs text-toktok-purple font-medium">Now Playing</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
      
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

      {/* Voting Dialog */}
      <Dialog open={showVoteDialog} onOpenChange={setShowVoteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Vote with TokTok Tokens</DialogTitle>
            <DialogDescription>
              Choose how many tokens you want to use for your vote. More tokens give your vote more weight.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <RadioGroup value={voteAmount.toString()} onValueChange={(value) => setVoteAmount(parseInt(value))}>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="1" id="r1" />
                <label htmlFor="r1" className="text-sm font-medium flex items-center justify-between w-full">
                  <span>1 Token (Basic Vote)</span>
                  <span className="text-toktok-yellow">1 TT</span>
                </label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="5" id="r2" />
                <label htmlFor="r2" className="text-sm font-medium flex items-center justify-between w-full">
                  <span>5 Tokens (Booster)</span>
                  <span className="text-toktok-yellow">5 TT</span>
                </label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="10" id="r3" />
                <label htmlFor="r3" className="text-sm font-medium flex items-center justify-between w-full">
                  <span>10 Tokens (Super Booster)</span>
                  <span className="text-toktok-yellow">10 TT</span>
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="25" id="r4" />
                <label htmlFor="r4" className="text-sm font-medium flex items-center justify-between w-full">
                  <span>25 Tokens (Mega Booster)</span>
                  <span className="text-toktok-yellow">25 TT</span>
                </label>
              </div>
            </RadioGroup>
            
            <div className="text-sm text-muted-foreground mt-4">
              <p>You currently have <span className="text-toktok-yellow font-medium">120 TT</span> tokens available.</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVoteDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleVote}
              className="bg-toktok-purple hover:bg-toktok-purple/90"
            >
              Confirm Vote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Hidden audio element */}
      <audio 
        ref={audioRef}
        style={{ display: 'none' }}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default PopularPage;

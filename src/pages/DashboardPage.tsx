import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp, Download, Upload, Music, Heart, Award, Star, Play } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const uploadedBattles = [
  {
    id: '1',
    title: 'Flow Battle - First Try',
    date: '2023-05-12',
    views: 1245,
    votes: 352,
    earnings: 125,
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '2',
    title: 'My Freestyle Demo',
    date: '2023-05-08',
    views: 873,
    votes: 214,
    earnings: 76,
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
];

const recentActivity = [
  { type: 'battle_win', text: 'Your AI clone won a battle', amount: '+50 TT', date: '2h ago' },
  { type: 'vote_reward', text: 'Voting reward received', amount: '+5 TT', date: '4h ago' },
  { type: 'nft_royalty', text: 'NFT royalty payment', amount: '+25 TT', date: '1d ago' },
  { type: 'remix_featured', text: 'Remix was featured', amount: '+30 TT', date: '2d ago' },
  { type: 'participation', text: 'Battle participation bonus', amount: '+10 TT', date: '3d ago' },
];

const DashboardPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  
  const startUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };
  
  const connectWallet = () => {
    setWalletConnected(true);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your AI voice battles, track performance and withdraw earnings
            </p>
          </div>
          
          {walletConnected ? (
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-card rounded-lg border border-border/50">
                <div className="text-xs text-muted-foreground">Available Balance</div>
                <div className="text-xl font-semibold text-toktok-yellow">325 TT</div>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
            </div>
          ) : (
            <Button onClick={connectWallet}>
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
              <h3 className="text-2xl font-bold text-toktok-yellow">325 TT</h3>
            </div>
            <div className="bg-toktok-yellow/20 p-2 rounded-full">
              <TrendingUp className="h-5 w-5 text-toktok-yellow" />
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-green-500">↑ 12.5%</span>
            <span className="text-xs text-muted-foreground ml-2">vs last week</span>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Votes Received</p>
              <h3 className="text-2xl font-bold">1,254</h3>
            </div>
            <div className="bg-purple-500/20 p-2 rounded-full">
              <Heart className="h-5 w-5 text-toktok-purple" />
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-green-500">↑ 8.3%</span>
            <span className="text-xs text-muted-foreground ml-2">vs last week</span>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Battles Won</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
            <div className="bg-toktok-blue/20 p-2 rounded-full">
              <Award className="h-5 w-5 text-toktok-blue" />
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-green-500">↑ 4 battles</span>
            <span className="text-xs text-muted-foreground ml-2">vs last month</span>
          </div>
        </Card>
      </div>
      
      <Tabs defaultValue="uploads" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="uploads">My Uploads</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="uploads">
          <div className="grid gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Upload New Battle</h3>
              
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="battle-title">Battle Title</Label>
                  <Input id="battle-title" placeholder="Enter a catchy title for your battle" />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="battle-description">Description</Label>
                  <Input id="battle-description" placeholder="Brief description of your voice battle" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label>Upload Audio File</Label>
                    <div className="border border-dashed border-border rounded-lg p-8 text-center">
                      <Music className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drop your audio file here or click to browse
                      </p>
                      <Button size="sm" variant="outline" className="mx-auto">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    <Label>Upload Thumbnail</Label>
                    <div className="border border-dashed border-border rounded-lg p-8 text-center">
                      <div className="h-8 w-8 mx-auto mb-2 rounded bg-muted-foreground/30"></div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Drop your thumbnail image here or click to browse
                      </p>
                      <Button size="sm" variant="outline" className="mx-auto">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Image
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="voice-type">Voice Type</Label>
                    <Input id="voice-type" placeholder="E.g., Drake, Kendrick, Original" />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="battle-tags">Tags</Label>
                    <Input id="battle-tags" placeholder="E.g., freestyle, hiphop, rap" />
                  </div>
                </div>
                
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Button onClick={startUpload} disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Upload Battle'}
                  </Button>
                </div>
              </div>
            </Card>
            
            <h3 className="text-xl font-semibold mt-6 mb-4">My Uploaded Battles</h3>
            
            <div className="grid gap-4">
              {uploadedBattles.map((battle) => (
                <Card key={battle.id} className="p-0 overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-56 aspect-video md:aspect-auto relative">
                      <img 
                        src={battle.thumbnail} 
                        alt={battle.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="ghost" className="text-white">
                          <Play className="h-8 w-8" fill="white" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 flex-1">
                      <h4 className="font-medium mb-1">{battle.title}</h4>
                      <p className="text-xs text-muted-foreground mb-4">
                        Uploaded on {battle.date}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Views</p>
                          <p className="font-medium">{battle.views}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Votes</p>
                          <p className="font-medium">{battle.votes}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Earnings</p>
                          <p className="font-medium text-toktok-yellow">{battle.earnings} TT</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline" className="text-muted-foreground">Stats</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Performance Overview</h3>
              
              <div className="h-72 flex items-center justify-center bg-card">
                <div className="text-center">
                  <Star className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">Analytics visualization will appear here</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div>
                  <p className="text-xs text-muted-foreground">Total Views</p>
                  <p className="text-xl font-semibold">2,418</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Votes</p>
                  <p className="text-xl font-semibold">854</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Engagement Rate</p>
                  <p className="text-xl font-semibold">35.3%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Win Rate</p>
                  <p className="text-xl font-semibold">65%</p>
                </div>
              </div>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Audience Demographics</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>18-24</span>
                      <span>32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>25-34</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>35-44</span>
                      <span>18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>45+</span>
                      <span>5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Top Performing Content</h3>
                
                <div className="space-y-4">
                  {uploadedBattles.map((battle, index) => (
                    <div key={battle.id} className="flex gap-3 items-center">
                      <div className="bg-secondary flex items-center justify-center w-8 h-8 rounded">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{battle.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {battle.views} views • {battle.votes} votes
                        </p>
                      </div>
                      <div className="text-toktok-yellow font-medium">
                        {battle.earnings} TT
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="earnings">
          <div className="grid gap-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Earnings Summary</h3>
                
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <p className="text-xs text-muted-foreground">Total Earned</p>
                  <p className="text-2xl font-semibold text-toktok-yellow">325 TT</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Available to Withdraw</p>
                  <p className="text-2xl font-semibold text-toktok-yellow">325 TT</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pending</p>
                  <p className="text-2xl font-semibold">45 TT</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Withdrawn</p>
                  <p className="text-2xl font-semibold">150 TT</p>
                </div>
              </div>
              
              <div className="flex justify-between mb-4">
                <h4 className="font-medium">Earning Sources</h4>
                <span className="text-sm text-muted-foreground">Last 30 Days</span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Battle Wins</span>
                    <span>160 TT (49%)</span>
                  </div>
                  <Progress value={49} className="h-2 bg-muted" indicatorClassName="bg-toktok-purple" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>NFT Royalties</span>
                    <span>90 TT (28%)</span>
                  </div>
                  <Progress value={28} className="h-2 bg-muted" indicatorClassName="bg-toktok-pink" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Participation Rewards</span>
                    <span>45 TT (14%)</span>
                  </div>
                  <Progress value={14} className="h-2 bg-muted" indicatorClassName="bg-toktok-blue" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Content Remixes</span>
                    <span>30 TT (9%)</span>
                  </div>
                  <Progress value={9} className="h-2 bg-muted" indicatorClassName="bg-toktok-yellow" />
                </div>
              </div>
              
              {walletConnected ? (
                <Button className="w-full md:w-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Withdraw 325 TT
                </Button>
              ) : (
                <Button onClick={connectWallet} className="w-full md:w-auto">
                  Connect Wallet to Withdraw
                </Button>
              )}
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type.includes('battle') ? 'bg-toktok-purple/20' :
                        activity.type.includes('vote') ? 'bg-toktok-pink/20' :
                        activity.type.includes('nft') ? 'bg-toktok-blue/20' :
                        'bg-toktok-yellow/20'
                      }`}>
                        {activity.type.includes('battle') && <Award className="h-4 w-4 text-toktok-purple" />}
                        {activity.type.includes('vote') && <Heart className="h-4 w-4 text-toktok-pink" />}
                        {activity.type.includes('nft') && <Music className="h-4 w-4 text-toktok-blue" />}
                        {activity.type.includes('remix') && <Star className="h-4 w-4 text-toktok-yellow" />}
                        {activity.type.includes('participation') && <Star className="h-4 w-4 text-toktok-yellow" />}
                      </div>
                      <div>
                        <p className="text-sm">{activity.text}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                    <div className="text-toktok-yellow font-medium">
                      {activity.amount}
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="text-center">
                <Button variant="link" size="sm" className="text-muted-foreground">
                  View All Activity
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;

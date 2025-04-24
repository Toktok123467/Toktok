import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Upload, TrendingUp, Star, Award, Heart, Music } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const transactionHistory = [
  { type: 'withdrawal', amount: '-100 TT', date: '2023-05-15', status: 'completed', address: '0x1a2...3b4c' },
  { type: 'battle_win', amount: '+50 TT', date: '2023-05-12', status: 'completed', address: 'System' },
  { type: 'nft_purchase', amount: '-500 TT', date: '2023-05-10', status: 'completed', address: '0xa7b...8c9d' },
  { type: 'deposit', amount: '+1000 TT', date: '2023-05-05', status: 'completed', address: '0x1a2...3b4c' },
  { type: 'vote_reward', amount: '+15 TT', date: '2023-05-03', status: 'completed', address: 'System' },
];

const WalletPage = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  const connectWallet = () => {
    setWalletConnected(true);
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">TokTok Wallet</h1>
        <p className="text-muted-foreground">
          Manage your TokTok tokens and transactions
        </p>
      </div>
      
      {!walletConnected ? (
        <Card className="p-8 mb-8">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-toktok-purple/20 flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-8 w-8 text-toktok-purple" />
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-6">
              Connect your wallet to manage your TokTok tokens, participate in battles, and purchase NFTs.
            </p>
            
            <div className="grid gap-4">
              <Button onClick={connectWallet} size="lg" className="w-full">
                Connect Metamask
              </Button>
              <Button onClick={connectWallet} size="lg" variant="outline" className="w-full">
                Connect WalletConnect
              </Button>
              <Button onClick={connectWallet} size="lg" variant="outline" className="w-full">
                Connect Coinbase Wallet
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid gap-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 md:col-span-2">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Current Balance</p>
                  <h2 className="text-3xl font-bold text-toktok-yellow">325 TT</h2>
                </div>
                <Button size="sm" variant="outline">
                  Refresh
                </Button>
              </div>
              
              <div className="rounded-lg bg-card border border-border/50 p-4 mb-6">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm">Wallet Address</p>
                  <Button size="sm" variant="ghost" className="h-6 p-1">
                    Copy
                  </Button>
                </div>
                <p className="text-xs md:text-sm font-mono bg-muted/50 p-2 rounded">0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Withdraw
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setShowQR(!showQR)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Deposit
                </Button>
              </div>
              
              {showQR && (
                <div className="mt-4 p-4 bg-white rounded-lg text-center">
                  <div className="w-40 h-40 mx-auto bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t')] bg-center bg-contain"></div>
                  <p className="mt-2 text-xs text-black">Scan to deposit TokTok tokens</p>
                </div>
              )}
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Token Distribution</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Available</span>
                    <span>325 TT</span>
                  </div>
                  <Progress value={65} className="h-2 bg-muted" indicatorClassName="bg-toktok-yellow" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Staked</span>
                    <span>120 TT</span>
                  </div>
                  <Progress value={24} className="h-2" indicatorClassName="bg-gradient-to-r from-toktok-purple to-toktok-pink" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Locked</span>
                    <span>55 TT</span>
                  </div>
                  <Progress value={11} className="h-2" indicatorClassName="bg-toktok-pink" />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total Balance</span>
                  <span className="font-medium">500 TT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">USD Value</span>
                  <span className="font-medium">$250.00</span>
                </div>
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                View Details
              </Button>
            </Card>
          </div>
          
          <div>
            <Tabs defaultValue="activity">
              <TabsList className="mb-6">
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="nfts">My NFTs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Transaction History</h3>
                  
                  <div className="rounded-lg border border-border/50 overflow-hidden">
                    <div className="grid grid-cols-4 py-2 px-4 bg-muted/30">
                      <div className="font-medium text-sm">Transaction</div>
                      <div className="font-medium text-sm">Amount</div>
                      <div className="font-medium text-sm">Date</div>
                      <div className="font-medium text-sm">Status</div>
                    </div>
                    
                    <div>
                      {transactionHistory.map((transaction, index) => (
                        <div 
                          key={index} 
                          className="grid grid-cols-4 py-3 px-4 border-t border-border/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              transaction.type === 'withdrawal' ? 'bg-red-500/20' :
                              transaction.type === 'deposit' ? 'bg-green-500/20' :
                              transaction.type === 'battle_win' ? 'bg-toktok-purple/20' :
                              transaction.type === 'nft_purchase' ? 'bg-toktok-blue/20' :
                              'bg-toktok-yellow/20'
                            }`}>
                              {transaction.type === 'withdrawal' && <Download className="h-4 w-4 text-red-500" />}
                              {transaction.type === 'deposit' && <Upload className="h-4 w-4 text-green-500" />}
                              {transaction.type === 'battle_win' && <Award className="h-4 w-4 text-toktok-purple" />}
                              {transaction.type === 'nft_purchase' && <Music className="h-4 w-4 text-toktok-blue" />}
                              {transaction.type === 'vote_reward' && <Heart className="h-4 w-4 text-toktok-yellow" />}
                            </div>
                            <div className="text-sm">
                              {transaction.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </div>
                          </div>
                          <div className={`text-sm ${
                            transaction.amount.startsWith('+') ? 'text-green-500' : 
                            transaction.amount.startsWith('-') ? 'text-red-500' : ''
                          }`}>
                            {transaction.amount}
                          </div>
                          <div className="text-sm">
                            {transaction.date}
                          </div>
                          <div className="text-sm">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                              transaction.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                              transaction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                              'bg-red-500/20 text-red-500'
                            }`}>
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button variant="outline" size="sm">
                      View All Transactions
                    </Button>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="rewards">
                <Card className="p-6">
                  <h3 className="font-semibold mb-6">Reward Center</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-card rounded-lg border border-border/50 p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-toktok-purple/20 flex items-center justify-center mx-auto mb-3">
                        <Award className="h-6 w-6 text-toktok-purple" />
                      </div>
                      <h4 className="font-medium mb-1">Battle Wins</h4>
                      <p className="text-2xl font-bold text-toktok-yellow">160 TT</p>
                      <p className="text-xs text-muted-foreground mt-2">12 battles won</p>
                    </div>
                    
                    <div className="bg-card rounded-lg border border-border/50 p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-toktok-pink/20 flex items-center justify-center mx-auto mb-3">
                        <Heart className="h-6 w-6 text-toktok-pink" />
                      </div>
                      <h4 className="font-medium mb-1">Voting Rewards</h4>
                      <p className="text-2xl font-bold text-toktok-yellow">45 TT</p>
                      <p className="text-xs text-muted-foreground mt-2">32 successful votes</p>
                    </div>
                    
                    <div className="bg-card rounded-lg border border-border/50 p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-toktok-blue/20 flex items-center justify-center mx-auto mb-3">
                        <Music className="h-6 w-6 text-toktok-blue" />
                      </div>
                      <h4 className="font-medium mb-1">NFT Royalties</h4>
                      <p className="text-2xl font-bold text-toktok-yellow">90 TT</p>
                      <p className="text-xs text-muted-foreground mt-2">3 NFTs generating income</p>
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg border border-border/50 p-6 mb-6">
                    <h4 className="font-semibold mb-4">Active Quests</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Daily Login Streak</span>
                          <span className="text-sm">4/7 days</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="h-2 flex-1 bg-toktok-purple rounded-full"></div>
                          <div className="h-2 flex-1 bg-toktok-purple rounded-full"></div>
                          <div className="h-2 flex-1 bg-toktok-purple rounded-full"></div>
                          <div className="h-2 flex-1 bg-toktok-purple rounded-full"></div>
                          <div className="h-2 flex-1 bg-muted rounded-full"></div>
                          <div className="h-2 flex-1 bg-muted rounded-full"></div>
                          <div className="h-2 flex-1 bg-muted rounded-full"></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Reward: 50 TT for 7-day streak</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Vote in 5 Battles</span>
                          <span className="text-sm">3/5 battles</span>
                        </div>
                        <Progress value={60} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">Reward: 25 TT on completion</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Upload First Battle</span>
                          <span className="text-sm">Completed!</span>
                        </div>
                        <Progress value={100} className="h-2" indicatorClassName="bg-green-500" />
                        <div className="flex justify-between mt-1">
                          <p className="text-xs text-muted-foreground">Reward: 100 TT</p>
                          <Button size="sm" variant="ghost" className="h-5 text-xs text-green-500">Claim</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center bg-card rounded-lg border border-border/50 p-4">
                    <div>
                      <h4 className="font-medium mb-1">Creator Referral Program</h4>
                      <p className="text-sm text-muted-foreground">Earn 10% of tokens earned by creators you refer</p>
                    </div>
                    <Button>Get Referral Link</Button>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="nfts">
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold">My NFT Collection</h3>
                    <Button>Browse Marketplace</Button>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-card rounded-lg border border-border/50 overflow-hidden">
                      <div className="aspect-square relative">
                        <img 
                          src="https://images.unsplash.com/photo-1564758866811-c60f4f042818?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                          alt="Drake Voice Clone NFT" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-toktok-purple/90 text-white text-xs px-2 py-0.5 rounded-full">
                          Legendary
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium">Drake Voice Clone NFT</h4>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-muted-foreground">ID #1254</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-toktok-yellow text-toktok-yellow mr-1" />
                            <span className="text-sm">4.9</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <Button size="sm" variant="outline">Use in Battle</Button>
                          <Button size="sm">Stake</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-card rounded-lg border border-border/50 overflow-hidden">
                      <div className="aspect-square relative">
                        <img 
                          src="https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                          alt="Kendrick Voice Clone NFT" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-toktok-purple/90 text-white text-xs px-2 py-0.5 rounded-full">
                          Legendary
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium">Kendrick Voice Clone NFT</h4>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-muted-foreground">ID #0823</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-toktok-yellow text-toktok-yellow mr-1" />
                            <span className="text-sm">4.8</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <Button size="sm" variant="outline">Use in Battle</Button>
                          <Button size="sm">Stake</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg border border-dashed border-border flex flex-col items-center justify-center p-8">
                      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                        <Music className="h-8 w-8 text-muted-foreground/70" />
                      </div>
                      <p className="text-center text-muted-foreground mb-4">
                        Add more NFTs to your collection
                      </p>
                      <Button variant="outline">Browse Marketplace</Button>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-semibold mb-4">NFT Staking Status</h3>
                    
                    <div className="rounded-lg border border-border/50 overflow-hidden">
                      <div className="grid grid-cols-5 py-2 px-4 bg-muted/30">
                        <div className="font-medium text-sm col-span-2">NFT</div>
                        <div className="font-medium text-sm">Staked Since</div>
                        <div className="font-medium text-sm">Earned</div>
                        <div className="font-medium text-sm"></div>
                      </div>
                      
                      <div className="border-t border-border/50 py-3 px-4">
                        <div className="grid grid-cols-5 items-center">
                          <div className="col-span-2 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md overflow-hidden">
                              <img 
                                src="https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                                alt="Kendrick Voice Clone NFT" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Kendrick Voice Clone NFT</p>
                              <p className="text-xs text-muted-foreground">ID #0823</p>
                            </div>
                          </div>
                          <div className="text-sm">
                            May 1, 2023
                          </div>
                          <div className="text-sm text-toktok-yellow font-medium">
                            45 TT
                          </div>
                          <div className="text-right">
                            <Button size="sm" variant="outline">Claim</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;
